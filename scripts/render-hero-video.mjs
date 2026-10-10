import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';
import { mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const encoder = process.env.FFMPEG_PATH || 'ffmpeg';
const assetPath = join(projectRoot, 'public', 'assets');
const temporaryRoot = realpathSync(tmpdir());
const scratchPath = mkdtempSync(join(temporaryRoot, 'daman-film-'));
const shots = [
  { source: 'daman-hero-original.png', duration: 5, focus: 0.58 },
  { source: 'daman-blinds-original.png', duration: 5, focus: 0.48 },
  { source: 'daman-shutters-original.png', duration: 5, focus: 0.6 },
  { source: 'daman-curtains-original.png', duration: 5, focus: 0.58 },
  { source: 'daman-security-original.png', duration: 5, focus: 0.54 },
  { source: 'daman-flyscreen-original.png', duration: 5, focus: 0.5 },
  { source: 'daman-hero-original.png', duration: 2, focus: 0.58 },
];

function encode(argumentsList) {
  const result = spawnSync(encoder, ['-hide_banner', '-loglevel', 'warning', '-y', ...argumentsList], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with code ${result.status}`);
}

function cleanupScratch() {
  if (dirname(realpathSync(scratchPath)) !== temporaryRoot || !basename(scratchPath).startsWith('daman-film-')) {
    throw new Error('Refusing cleanup outside the allocated film scratch directory');
  }
  rmSync(scratchPath, { recursive: true, force: true });
}

try {
  for (const variant of [
    { name: 'desktop', width: 1600, height: 900, quality: '22' },
    { name: 'mobile', width: 720, height: 1280, quality: '23' },
  ]) {
    const clips = shots.map((shot, index) => {
      const frames = shot.duration * 24;
      const zoom = index === 6 ? '1.02' : `1.02+0.04*(1-cos(2*PI*on/${frames - 1}))/2`;
      const crop = `scale=${variant.width * 2}:${variant.height * 2}:force_original_aspect_ratio=increase:flags=lanczos,crop=${variant.width * 2}:${variant.height * 2}:(iw-ow)*${shot.focus}:(ih-oh)*0.4`;
      const filter = `${crop},zoompan=z='${zoom}':x='(iw-iw/zoom)*0.58':y='(ih-ih/zoom)*0.5':d=${frames}:s=${variant.width}x${variant.height}:fps=24,setsar=1,format=yuv420p`;
      const output = join(scratchPath, `${variant.name}-${index}.mp4`);
      encode(['-i', join(assetPath, shot.source), '-vf', filter, '-frames:v', String(frames), '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', output]);
      return output;
    });
    const transitions = shots.slice(1).map((_, index) => {
      const previous = index === 0 ? '[0:v]' : `[blend${index - 1}]`;
      return `${previous}[${index + 1}:v]xfade=transition=fade:duration=1:offset=${(index + 1) * 4}[blend${index}]`;
    });
    const output = join(assetPath, `daman-hero-${variant.name}.mp4`);
    encode([
      ...clips.flatMap(clip => ['-i', clip]), '-filter_complex_threads', '1',
      '-filter_complex', transitions.join(';'), '-map', '[blend5]', '-an',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', variant.quality,
      '-profile:v', 'high', '-level:v', '4.0', '-movflags', '+faststart', '-map_metadata', '-1', output,
    ]);
    encode(['-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', join(assetPath, `daman-hero-${variant.name}-poster.jpg`)]);
    console.log(`Rendered ${variant.name}: 26 seconds, ${variant.width}x${variant.height}, 24 fps, silent H.264, six service chapters.`);
  }
} finally {
  cleanupScratch();
}
