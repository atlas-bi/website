/**
 * Same-origin Umami proxy.
 * Browser loads /analytics/script.js and POSTs /analytics/api/send;
 * the host forwards to the private analytics server.
 */
async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function analyticsUpstream() {
  return (process.env.ANALYTICS_HOST || '').replace(/\/$/, '');
}

function analyticsPath(req) {
  return (req.url || '').split('?')[0];
}

function upstreamPath(path) {
  if (path === '/analytics/script.js' || path === '/analytics/script.js/') {
    return '/script.js';
  }
  if (path === '/analytics/api/send' || path === '/analytics/api/send/') {
    return '/api/send';
  }
  return null;
}

function allowedMethodFor(targetPath, method) {
  if (targetPath === '/script.js') return method === 'GET';
  return method === 'POST';
}

function allowHeaderFor(targetPath) {
  return targetPath === '/script.js' ? 'GET, OPTIONS' : 'POST, OPTIONS';
}

function buildUpstreamHeaders(req) {
  const headers = {
    'User-Agent': req.headers['user-agent'] || 'atlas-bi-analytics-proxy',
    'X-Forwarded-For':
      req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    'X-Forwarded-Proto':
      req.headers['x-forwarded-proto'] ||
      (req.socket?.encrypted ? 'https' : 'http'),
  };
  if (req.headers['content-type']) {
    headers['Content-Type'] = req.headers['content-type'];
  }
  return headers;
}

async function proxyUpstream(upstreamHost, targetPath, req, res) {
  const body = req.method === 'POST' ? await readRequestBody(req) : undefined;
  const upstream = await fetch(`${upstreamHost}${targetPath}`, {
    method: req.method,
    headers: buildUpstreamHeaders(req),
    body,
  });
  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.statusCode = upstream.status;
  const contentType = upstream.headers.get('content-type');
  if (contentType) {
    res.setHeader('Content-Type', contentType);
  }
  const cacheControl = upstream.headers.get('cache-control');
  if (cacheControl && targetPath === '/script.js') {
    res.setHeader('Cache-Control', cacheControl);
  }
  res.end(buffer);
}

function createAnalyticsMiddleware(host = analyticsUpstream()) {
  const upstreamHost = host.replace(/\/$/, '');
  let upstreamOrigin;
  try {
    upstreamOrigin = new URL(upstreamHost);
  } catch {
    upstreamOrigin = null;
  }

  return async function analyticsMiddleware(req, res, next) {
    const path = analyticsPath(req);
    const targetPath = upstreamPath(path);
    if (!targetPath) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
      res.end();
      return;
    }

    if (!upstreamOrigin) {
      res.statusCode = 503;
      res.end('ANALYTICS_HOST is not configured');
      return;
    }

    if (!allowedMethodFor(targetPath, req.method)) {
      res.statusCode = 405;
      res.setHeader('Allow', allowHeaderFor(targetPath));
      res.end('Method not allowed');
      return;
    }

    try {
      await proxyUpstream(upstreamHost, targetPath, req, res);
    } catch (error) {
      console.error('Analytics proxy failed', error);
      res.statusCode = 502;
      res.end('Bad gateway');
    }
  };
}

module.exports = {
  createAnalyticsMiddleware,
  analyticsUpstream,
};
