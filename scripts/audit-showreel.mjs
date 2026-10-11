import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const ledger = JSON.parse(readFileSync(`${projectRoot}/media/generated/motion-ledger.json`, 'utf8'));
const expected = ledger.webExport;
const filmPath = `${projectRoot}/public/assets/daman-showreel-web.mp4`;
const bytes = readFileSync(filmPath);
const sha256 = createHash('sha256').update(bytes).digest('hex').toUpperCase();
if (bytes.length !== expected.bytes || sha256 !== expected.sha256) throw new Error('Native web export bytes changed.');
if (bytes.length > 25 * 1024 * 1024) throw new Error('Film exceeds the Pages single-asset limit.');

function run(command, argumentsList) {
  const result = spawnSync(command, argumentsList, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return result;
}

const decoded = run(process.env.FFMPEG_PATH || 'ffmpeg', [
  '-hide_banner', '-xerror', '-i', filmPath, '-progress', 'pipe:1', '-nostats', '-f', 'null', '-',
]);
const frames = Number([...decoded.stdout.matchAll(/^frame=(\d+)/gm)].at(-1)?.[1]);
if (frames !== expected.frames || !decoded.stderr.includes('1280x720') || !decoded.stderr.includes('24 fps')) {
  throw new Error('Unexpected film dimensions, frame rate or decoded frame count.');
}
if (/Audio:/.test(decoded.stderr)) throw new Error('The web film must contain no audio track.');

const credentialTool = process.env.C2PATOOL_PATH || 'c2patool';
const credentialArguments = [filmPath];
if (process.argv.includes('--trust')) credentialArguments.push('trust', '--trust_anchors', 'https://raw.githubusercontent.com/c2pa-org/conformance-public/refs/heads/main/trust-list/C2PA-TRUST-LIST.pem');
const credentials = JSON.parse(run(credentialTool, credentialArguments).stdout.replace(/^\uFEFF/, ''));
const active = credentials.manifests?.[credentials.active_manifest];
const components = active?.ingredients?.filter(ingredient => ingredient.relationship === 'componentOf') ?? [];
if (!active || Object.keys(credentials.manifests).length !== expected.manifests || components.length !== 6) {
  throw new Error('Native Content Credentials or selected ingredient links are missing.');
}

const selectedFiles = [
  'flow-veo31fast-sheers-test-8s-watermarked.mp4', 'adobe-veo31fast-curtains-6s.mp4',
  'adobe-veo31fast-blinds-6s.mp4', 'adobe-veo31fast-shutters-6s.mp4',
  'adobe-veo31fast-security-6s.mp4', 'adobe-veo31fast-flyscreen-retake-4s.mp4',
];
for (const file of selectedFiles) {
  const source = JSON.parse(run(credentialTool, [`${projectRoot}/media/generated/${file}`]).stdout.replace(/^\uFEFF/, ''));
  if (!components.some(component => component.active_manifest === source.active_manifest)) {
    throw new Error(`Selected source absent from the edit: ${file}`);
  }
}

const issues = credentials.validation_status ?? [];
if (issues.some(issue => issue.code !== 'signingCredential.untrusted')) throw new Error(JSON.stringify(issues));
console.log(JSON.stringify({
  bytes: bytes.length, sha256, frames, audioTracks: 0, componentIngredients: components.length,
  signatureIssues: issues, trustAssessment: process.argv.includes('--trust') ? 'Official-list warning retained, not a clean trusted-identity result.' : 'Official-list trust not assessed in this run.',
}, null, 2));
