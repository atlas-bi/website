/**
 * Serve the Eleventy `_site` directory so Cloudflare Tunnel can
 * point at site-proxy with no nginx in front.
 */
const fs = require('node:fs');
const path = require('node:path');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

/** Origin Cache-Control so Cloudflare / browsers can cache static docs. */
function cacheControlFor(ext) {
  switch (ext) {
    case '.html':
      // Short browser TTL; longer edge TTL (purge or wait after deploys).
      return 'public, max-age=300, s-maxage=86400';
    case '.css':
    case '.js':
    case '.mjs':
    case '.map':
      // Not content-hashed; CSS is busted via ?v= build stamp.
      return 'public, max-age=86400, s-maxage=604800';
    case '.woff':
    case '.woff2':
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
    case '.webp':
    case '.svg':
    case '.ico':
      return 'public, max-age=2592000, s-maxage=2592000';
    default:
      return 'public, max-age=3600, s-maxage=86400';
  }
}

function staticRoot() {
  const dir = path.resolve(process.env.SITE_STATIC_DIR || '_site');
  try {
    if (fs.statSync(dir).isDirectory()) return dir;
  } catch {
    return null;
  }
  return dir;
}

function notFound(res, next) {
  if (typeof next === 'function') return next();
  res.statusCode = 404;
  res.end('Not found');
}

function decodeUrlPath(req) {
  const urlPath = (req.url || '/').split('?')[0];
  try {
    return decodeURIComponent(urlPath);
  } catch {
    return null;
  }
}

function candidateFiles(root, urlPath) {
  const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const direct = path.resolve(root, relative);
  if (path.extname(direct)) {
    return [direct];
  }
  return [direct, `${direct}.html`, path.join(direct, 'index.html')];
}

function isInsideRoot(file, root) {
  return file === root || file.startsWith(root + path.sep);
}

async function trySendFile(file, req, res) {
  const stat = await fs.promises.stat(file);
  if (!stat.isFile()) return false;
  const ext = path.extname(file).toLowerCase();
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  res.setHeader('Content-Length', String(stat.size));
  res.setHeader('Cache-Control', cacheControlFor(ext));
  res.setHeader('Last-Modified', stat.mtime.toUTCString());
  if (req.method === 'HEAD') {
    res.end();
    return true;
  }
  fs.createReadStream(file).pipe(res);
  return true;
}

function createStaticMiddleware(rootDir = staticRoot()) {
  if (!rootDir) {
    return function skipStatic(_req, res, next) {
      return notFound(res, next);
    };
  }

  const root = path.resolve(rootDir);

  return async function staticMiddleware(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return notFound(res, next);
    }

    const urlPath = decodeUrlPath(req);
    if (urlPath === null) {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }

    for (const file of candidateFiles(root, urlPath)) {
      if (!isInsideRoot(file, root)) continue;
      try {
        if (await trySendFile(file, req, res)) return;
      } catch {
        // try next candidate
      }
    }

    return notFound(res, next);
  };
}

module.exports = {
  cacheControlFor,
  createStaticMiddleware,
  staticRoot,
};
