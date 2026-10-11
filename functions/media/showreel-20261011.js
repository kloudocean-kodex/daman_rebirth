import motionLedger from '../../media/generated/motion-ledger.json';

export function parseRange(value, length) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return null;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix === 0) return false;
    start = Math.max(0, length - suffix);
    end = length - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Math.min(Number(match[2]), length - 1) : length - 1;
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || start > end) return false;
  return { start, end };
}

export function sliceStream(body, start, end) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream({
    async pull(controller) {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) {
          controller.error(new Error('Unexpected end of movie asset.'));
          return;
        }
        const chunkStart = offset;
        offset += chunk.value.byteLength;
        if (offset <= start) continue;
        const selected = chunk.value.subarray(Math.max(0, start - chunkStart), Math.min(chunk.value.byteLength, end - chunkStart + 1));
        controller.enqueue(selected);
        if (offset > end) {
          controller.close();
          await reader.cancel();
        }
        return;
      }
    },
    cancel(reason) { return reader.cancel(reason); },
  });
}

export async function onRequest(context) {
  const request = context.request;
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const assetURL = new URL('/assets/daman-showreel-web.mp4', request.url);
  const asset = await context.env.ASSETS.fetch(assetURL);
  if (asset.status !== 200 || !asset.body) {
    await asset.body?.cancel();
    return new Response(null, { status: 502 });
  }
  const length = motionLedger.webExport.bytes;
  const declaredLength = asset.headers.get('Content-Length');
  if (!Number.isSafeInteger(length) || length <= 0 || length > 25 * 1024 * 1024 || (declaredLength && Number(declaredLength) !== length)) {
    await asset.body.cancel();
    return new Response(null, { status: 502 });
  }
  const headers = new Headers(asset.headers);
  headers.set('Content-Type', 'video/mp4');
  headers.set('Content-Length', String(length));
  if (!headers.has('ETag')) headers.set('ETag', `"${motionLedger.webExport.sha256}"`);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'public, max-age=86400, no-transform');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.delete('Content-Encoding');
  headers.delete('Transfer-Encoding');
  headers.delete('Connection');
  headers.delete('Keep-Alive');
  const etag = headers.get('ETag');
  const validators = request.headers.get('If-None-Match')?.split(',').map(value => value.trim());
  if (validators?.some(value => value === '*' || value.replace(/^W\//, '') === etag.replace(/^W\//, ''))) {
    await asset.body.cancel();
    headers.delete('Content-Length');
    return new Response(null, { status: 304, headers });
  }
  if (request.method === 'HEAD') {
    await asset.body.cancel();
    return new Response(null, { headers });
  }
  const ifRange = request.headers.get('If-Range');
  const range = !ifRange || ifRange === etag ? parseRange(request.headers.get('Range'), length) : null;
  if (range === false) {
    await asset.body.cancel();
    headers.set('Content-Range', `bytes */${length}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }
  const selectedLength = range ? range.end - range.start + 1 : length;
  const output = new FixedLengthStream(selectedLength);
  context.waitUntil((range ? sliceStream(asset.body, range.start, range.end) : asset.body).pipeTo(output.writable));
  if (range) headers.set('Content-Range', `bytes ${range.start}-${range.end}/${length}`);
  headers.set('Content-Length', String(selectedLength));
  return new Response(output.readable, { status: range ? 206 : 200, headers });
}
