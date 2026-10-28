import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = process.env.CLIENT_MEDIA_SOURCE || 'C:/Users/gawar/Downloads/DAMANGROUP_ASSETS_28_Oct';
const encoder = process.env.FFMPEG_PATH || 'C:/Users/gawar/AppData/Roaming/Python/Python314/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const contactSheet = 'docs/client-media-review/film-contact-sheet.jpg';
const commonArgs = ['-hide_banner', '-nostdin', '-threads', '2', '-filter_threads', '1'];
const films = [
  { name: 'sheers', source: 'WhatsApp Video 2026-10-25 at 6.04.41 PM.mp4', posterFrame: 0 },
  { name: 'blockout', source: 'WhatsApp Video 2026-10-25 at 6.03.34 PM.mp4' },
];

function run(args, binary = false) {
  const result = spawnSync(encoder, [...commonArgs, ...args], {
    encoding: binary ? undefined : 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg failed (${result.status}): ${result.stderr}`);
  return result;
}

function boxes(bytes, start = 0, end = bytes.length) {
  const result = [];
  for (let offset = start; offset + 8 <= end;) {
    const size32 = bytes.readUInt32BE(offset);
    const size = size32 === 1 ? Number(bytes.readBigUInt64BE(offset + 8)) : size32 || end - offset;
    const header = size32 === 1 ? 16 : 8;
    if (size < header || offset + size > end) throw new Error('Invalid MP4 box boundary');
    result.push({ type: bytes.toString('latin1', offset + 4, offset + 8), offset, start: offset + header, end: offset + size });
    offset += size;
  }
  return result;
}

function inspectMp4(bytes) {
  const top = boxes(bytes);
  const movie = top.find(box => box.type === 'moov');
  const media = top.find(box => box.type === 'mdat');
  if (!movie || !media) throw new Error('Missing MP4 movie/media box');
  const children = boxes(bytes, movie.start, movie.end);
  const header = children.find(box => box.type === 'mvhd');
  if (!header) throw new Error('Missing MP4 movie header');
  const version = bytes[header.start];
  const timescale = bytes.readUInt32BE(header.start + (version === 1 ? 20 : 12));
  const duration = version === 1 ? Number(bytes.readBigUInt64BE(header.start + 24)) : bytes.readUInt32BE(header.start + 16);
  const handlers = children.filter(box => box.type === 'trak').map(track => {
    const mediaBox = boxes(bytes, track.start, track.end).find(box => box.type === 'mdia');
    if (!mediaBox) throw new Error('Missing track media');
    const handler = boxes(bytes, mediaBox.start, mediaBox.end).find(box => box.type === 'hdlr');
    if (!handler) throw new Error('Missing track handler');
    return bytes.toString('latin1', handler.start + 8, handler.start + 12);
  });
  const metadataEntries = [];
  function inspectMetadata(parent) {
    for (const box of boxes(bytes, parent.start + (parent.type === 'meta' ? 4 : 0), parent.end)) {
      if (box.type === 'ilst') metadataEntries.push(...boxes(bytes, box.start, box.end).map(item => item.type));
      if (['udta', 'meta'].includes(box.type)) inspectMetadata(box);
    }
  }
  inspectMetadata(movie);
  return {
    durationSeconds: duration / timescale,
    audioStreams: handlers.filter(handler => handler === 'soun').length,
    videoStreams: handlers.filter(handler => handler === 'vide').length,
    trackCount: handlers.length,
    faststart: movie.offset < media.offset,
    userMetadataBoxes: children.filter(box => ['udta', 'meta'].includes(box.type)).map(box => box.type),
    metadataEntries,
  };
}

function decode(input) {
  const args = ['-v', 'info', '-xerror', '-i', input, '-map', '0:v:0', '-an', '-fps_mode', 'passthrough', '-progress', 'pipe:1', '-nostats', '-f', 'null', '-'];
  const result = run(args);
  const stream = result.stderr.split(/\r?\n/).find(line => /Stream #0:.*Video:/.test(line));
  if (!stream) throw new Error('Missing video stream');
  const dimensions = stream.match(/\b(\d{2,5})x(\d{2,5})\b/);
  const fps = stream.match(/([\d.]+) fps/);
  const frames = [...result.stdout.matchAll(/^frame=(\d+)/gm)].at(-1);
  if (!dimensions || !fps || !frames) throw new Error('Incomplete decode evidence');
  return {
    width: Number(dimensions[1]), height: Number(dimensions[2]),
    fps: Number(fps[1]), frames: Number(frames[1]),
    codec: stream.match(/Video: (\w+)/)?.[1],
    pixelFormat: stream.match(/\b(yuv\w+)/)?.[1],
    inputAudioStreams: (result.stderr.split('Stream mapping:')[0].match(/Audio:/g) || []).length,
    fullDecodeXerror: 'passed',
    command: [encoder, ...commonArgs, ...args],
  };
}

function frameAt(input, frame) {
  return run(['-v', 'error', '-xerror', '-i', input, '-vf', `select=eq(n\\,${frame})`, '-frames:v', '1', '-fps_mode', 'vfr', '-f', 'image2pipe', '-c:v', 'mjpeg', '-q:v', '2', '-'], true).stdout;
}

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const records = [];
const composites = [];
await fs.mkdir(path.join(root, 'public/assets/projects'), { recursive: true });
await fs.mkdir(path.join(root, 'docs/client-media-review'), { recursive: true });

for (const [row, film] of films.entries()) {
  const input = path.join(sourceRoot, film.source);
  const output = `public/assets/projects/${film.name}-project-silent-v1.mp4`;
  const poster = `public/assets/projects/${film.name}-project-poster-v1.jpg`;
  const outputPath = path.join(root, output);
  const sourceBytes = await fs.readFile(input);
  const sourceContainer = inspectMp4(sourceBytes);
  const sourceDecode = decode(input);
  if (sourceDecode.width !== 478 || sourceDecode.height !== 850) throw new Error(`${film.name}: unexpected source resolution`);
  process.stderr.write(`Encoding ${film.name}: full ${sourceContainer.durationSeconds}s, 478x850\n`);
  const encodeArgs = [
    '-y', '-v', 'error', '-xerror', '-i', input,
    '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-map_metadata:s:v', '-1', '-map_chapters', '-1',
    '-c:v', 'libx264', '-threads:v', '2', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p',
    '-vf', 'fps=30', '-fps_mode', 'cfr', '-fflags', '+bitexact', '-flags:v', '+bitexact',
    '-metadata', 'encoder=', '-metadata:s:v', 'encoder=', '-movflags', '+faststart', outputPath,
  ];
  run(encodeArgs);
  const outputBytes = await fs.readFile(outputPath);
  const container = inspectMp4(outputBytes);
  const verification = decode(outputPath);
  if (verification.width !== 478 || verification.height !== 850 || verification.fps !== 30 || verification.codec !== 'h264' || verification.pixelFormat !== 'yuv420p') throw new Error(`${film.name}: output format mismatch`);
  if (container.audioStreams !== 0 || verification.inputAudioStreams !== 0 || container.trackCount !== 1 || container.videoStreams !== 1) throw new Error(`${film.name}: unexpected output tracks`);
  if (!container.faststart || container.metadataEntries.length !== 0) throw new Error(`${film.name}: faststart/metadata verification failed`);
  if (Math.abs(container.durationSeconds - sourceContainer.durationSeconds) > 1 / 30 + 0.01) throw new Error(`${film.name}: duration changed by more than one CFR frame`);
  if (Math.abs(verification.frames / 30 - container.durationSeconds) > 0.002) throw new Error(`${film.name}: CFR duration mismatch`);
  const samples = [0, Math.floor(verification.frames / 2), verification.frames - 1];
  const posterFrame = film.posterFrame ?? samples[1];
  const posterBytes = await sharp(frameAt(outputPath, posterFrame)).jpeg({ quality: 90 }).toBuffer();
  await fs.writeFile(path.join(root, poster), posterBytes);
  const posterMetadata = await sharp(posterBytes).metadata();
  if (posterMetadata.width !== 478 || posterMetadata.height !== 850 || posterMetadata.exif || posterMetadata.xmp || posterMetadata.iptc) throw new Error('Poster dimensions/metadata mismatch');
  for (const [column, frame] of samples.entries()) {
    const image = await sharp(frameAt(outputPath, frame)).resize(239, 425, { withoutEnlargement: true }).jpeg({ quality: 90 }).toBuffer();
    const label = `${film.name} | ${['first', 'middle', 'last'][column]} | ${(frame / 30).toFixed(3)}s`;
    const caption = Buffer.from(`<svg width="239" height="30"><rect width="239" height="30" fill="#201f1c"/><text x="8" y="20" fill="white" font-family="Arial" font-size="12">${label}</text></svg>`);
    composites.push({ input: image, left: column * 239, top: row * 455 }, { input: caption, left: column * 239, top: row * 455 + 425 });
  }
  if (sha256(await fs.readFile(input)) !== sha256(sourceBytes)) throw new Error('Source changed during encoding');
  records.push({
    name: film.name,
    source: { path: input, sha256: sha256(sourceBytes), bytes: sourceBytes.length, ...sourceContainer, ...sourceDecode },
    output: { path: output, url: output.replace('public', ''), sha256: sha256(outputBytes), bytes: outputBytes.length, ...container, ...verification },
    treatment: 'Full original timeline retained; no trim, crop, upscale, stabilization, retouching, invented detail, or interpolation. CFR conversion only drops/duplicates original frames. Audio, chapters, and source metadata removed.',
    sourceResolutionBoundary: '478x850 source and export. Encoding cannot recover detail absent from the supplied WhatsApp video; these are not HD masters.',
    durationDeltaSeconds: Number((container.durationSeconds - sourceContainer.durationSeconds).toFixed(6)),
    poster: { path: poster, url: poster.replace('public', ''), bytes: posterBytes.length, sha256: sha256(posterBytes), width: 478, height: 850, frame: posterFrame, timeSeconds: posterFrame / 30, metadataRemoved: true },
    contactSheet: { row: row + 1, frames: samples, timesSeconds: samples.map(frame => frame / 30) },
    encodeCommand: [encoder, ...commonArgs, ...encodeArgs],
  });
}

await sharp({ create: { width: 717, height: 910, channels: 3, background: '#201f1c' } }).composite(composites).jpeg({ quality: 90 }).toFile(path.join(root, contactSheet));
const sheetBytes = await fs.readFile(path.join(root, contactSheet));
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  encoder: { path: encoder, version: run(['-version']).stdout.split(/\r?\n/)[0] },
  recipe: { codec: 'libx264', pixelFormat: 'yuv420p', crf: 21, preset: 'slow', fps: 30, width: 478, height: 850, audioStreams: 0, faststart: true, trim: 'none' },
  metadataBoundary: 'Source/global/stream metadata and chapters stripped; MP4 ilst has no entries. FFmpeg retains an empty udta/meta/ilst wrapper. MP4 brands, track handler, codec/compressor identification, H264 encoder SEI, color description and timing remain technical codec/container data, not source descriptive metadata.',
  contactSheet: { path: contactSheet, width: 717, height: 910, bytes: sheetBytes.length, sha256: sha256(sheetBytes), layout: 'Top: sheers; bottom: blockout. Left to right: exact first, middle, last decoded output frames.', visualInspection: 'pending' },
  films: records,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
