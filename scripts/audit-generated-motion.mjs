import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const mediaRoot = join(projectRoot, 'media', 'generated');
const ledger = JSON.parse(readFileSync(join(mediaRoot, 'motion-ledger.json'), 'utf8'));
const encoder = process.env.FFMPEG_PATH || 'ffmpeg';
const credentialTool = process.env.C2PATOOL_PATH || 'c2patool';
const verifyTrust = process.argv.includes('--trust');
const trustAnchors = 'https://raw.githubusercontent.com/c2pa-org/conformance-public/refs/heads/main/trust-list/C2PA-TRUST-LIST.pem';
const originalHashes = ledger.clips.map(clip => clip.sha256);
const adobeUsage = ledger.clips.filter(clip => clip.provider.startsWith('Adobe')).reduce((total, clip) => total + clip.reconciledCredits, 0);

if (new Set(originalHashes).size !== originalHashes.length) throw new Error('Duplicate canonical motion files in the ledger.');
if (adobeUsage !== ledger.adobeIncludedCreditsUsed || ledger.adobeStartingCredits - adobeUsage !== ledger.lastVerifiedAdobeBalance) {
  throw new Error('Adobe included-credit reconciliation does not match the ledger.');
}

function run(command, argumentsList) {
  const result = spawnSync(command, argumentsList, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr.trim() || result.stdout.trim()}`);
  return result;
}

for (const clip of ledger.clips) {
  const source = join(mediaRoot, clip.file);
  const bytes = readFileSync(source);
  const hash = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  if (bytes.length !== clip.bytes || hash !== clip.sha256) {
    throw new Error(`Original bytes changed: ${clip.file}`);
  }
  if (!existsSync(join(projectRoot, 'public', 'assets', clip.reference))) {
    throw new Error(`Missing original first-frame reference: ${clip.reference}`);
  }
  if (clip.lastReference && !existsSync(join(projectRoot, 'public', 'assets', clip.lastReference))) {
    throw new Error(`Missing original last-frame reference: ${clip.lastReference}`);
  }
  const decode = run(encoder, [
    '-hide_banner', '-xerror', '-i', source, '-map', '0:v:0', '-an',
    '-progress', 'pipe:1', '-nostats', '-f', 'null', '-',
  ]);
  const decodedFrames = Number([...decode.stdout.matchAll(/^frame=(\d+)/gm)].at(-1)?.[1]);
  if (decodedFrames !== clip.frames) throw new Error(`Unexpected decoded frame count: ${clip.file}`);
  const finalFrameTimestamp = Number([...decode.stdout.matchAll(/^out_time_us=(\d+)/gm)].at(-1)?.[1]) / 1000000;
  const decodedDuration = Number((finalFrameTimestamp + 1 / clip.fps).toFixed(6));
  if (!Number.isFinite(decodedDuration) || Math.abs(decodedDuration - clip.duration) > 1 / clip.fps) {
    throw new Error(`Unexpected decoded duration: ${clip.file}`);
  }
  if (!decode.stderr.includes(`${clip.width}x${clip.height}`) || !decode.stderr.includes(`${clip.fps} fps`)) {
    throw new Error(`Unexpected video format: ${clip.file}`);
  }
  if (/Audio:/.test(decode.stderr) !== clip.hasAudio) throw new Error(`Unexpected audio presence: ${clip.file}`);
  const credentialArguments = verifyTrust ? [source, 'trust', '--trust_anchors', trustAnchors] : [source];
  const credentials = JSON.parse(run(credentialTool, credentialArguments).stdout.replace(/^\uFEFF/, ''));
  const manifests = Object.keys(credentials.manifests || {});
  if (clip.contentCredentials && (!credentials.active_manifest || manifests.length === 0)) {
    throw new Error(`Missing original Content Credentials: ${clip.file}`);
  }
  if (verifyTrust && credentials.validation_status?.length) {
    throw new Error(`Content Credentials validation issues: ${clip.file}: ${JSON.stringify(credentials.validation_status)}`);
  }
  console.log(JSON.stringify({
    file: clip.file,
    originalBytes: 'verified',
    decodedFrames,
    decodedDuration,
    manifests: manifests.length,
    trust: verifyTrust ? 'No validation issues with the official C2PA trust list.' : 'Not assessed by this offline audit; run with --trust to check the official C2PA trust list.',
    publication: ledger.publicationStatus,
  }));
}
