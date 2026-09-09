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

function staticRoot() {
  const dir = path.resolve(process.env.SITE_STATIC_DIR || '_site');
  try {
    if (fs.statSync(dir).isDirectory()) return dir;
  } catch {
    return null;
  }
  return dir;
}

function createStaticMiddleware(rootDir = staticRoot()) {
  if (!rootDir) {
    return function skipStatic(_req, res, next) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
    };
  }

  const root = path.resolve(rootDir);

  return async function staticMiddleware(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    let urlPath = (req.url || '/').split('?')[0];
    try {
      urlPath = decodeURIComponent(urlPath);
    } catch {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }

    const relative =
      urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const candidates = [];
    const direct = path.resolve(root, relative);
    candidates.push(direct);
    if (!path.extname(direct)) {
      candidates.push(`${direct}.html`);
      candidates.push(path.join(direct, 'index.html'));
    }

    for (const file of candidates) {
      if (file !== root && !file.startsWith(root + path.sep)) {
        continue;
      }
      try {
        const stat = await fs.promises.stat(file);
        if (!stat.isFile()) continue;
        res.statusCode = 200;
        res.setHeader(
          'Content-Type',
          MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        );
        res.setHeader('Content-Length', String(stat.size));
        if (req.method === 'HEAD') {
          res.end();
          return;
        }
        fs.createReadStream(file).pipe(res);
        return;
      } catch {
        // try next candidate
      }
    }

    if (typeof next === 'function') return next();
    res.statusCode = 404;
    res.end('Not found');
  };
}

module.exports = {
  createStaticMiddleware,
  staticRoot,
};
