/**
 * Shared GlitchTip / Sentry envelope + security report proxy.
 * Browser posts to same-origin /glitchtip; this host forwards to the private GlitchTip server.
 */
const { URL } = require('node:url');

function parseDsn(dsn) {
  if (!dsn) return null;
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\/+/, '').split('/')[0];
    if (!url.username || !url.hostname || !projectId) return null;
    return {
      host: url.hostname,
      port: url.port,
      protocol: url.protocol,
      publicKey: url.username,
      projectId,
      envelopeUrl: `${url.protocol}//${url.host}/api/${projectId}/envelope/`,
      securityUrl: `${url.protocol}//${url.host}/api/${projectId}/security/?glitchtip_key=${url.username}`,
    };
  } catch {
    return null;
  }
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function forward(url, body, contentType) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType || 'application/x-sentry-envelope',
    },
    body,
  });
  const text = await response.text();
  return {
    status: response.status,
    text,
    contentType: response.headers.get('content-type'),
  };
}

/**
 * Connect-style middleware for Eleventy / local static servers.
 */
function createGlitchtipMiddleware(dsn = process.env.GLITCHTIP_DSN) {
  const parsed = parseDsn(dsn);

  return async function glitchtipMiddleware(req, res, next) {
    const path = (req.url || '').split('?')[0];
    if (
      path !== '/glitchtip' &&
      path !== '/glitchtip/' &&
      path !== '/glitchtip/security'
    ) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end('Method not allowed');
      return;
    }

    if (!parsed) {
      res.statusCode = 503;
      res.end('GLITCHTIP_DSN is not configured');
      return;
    }

    try {
      const body = await readRequestBody(req);
      const target =
        path === '/glitchtip/security'
          ? parsed.securityUrl
          : parsed.envelopeUrl;
      const upstream = await forward(
        target,
        body,
        req.headers['content-type'] || 'application/x-sentry-envelope',
      );
      res.statusCode = upstream.status;
      if (upstream.contentType) {
        res.setHeader('Content-Type', upstream.contentType);
      }
      res.end(upstream.text);
    } catch (error) {
      console.error('GlitchTip proxy failed', error);
      res.statusCode = 502;
      res.end('Bad gateway');
    }
  };
}

module.exports = {
  parseDsn,
  createGlitchtipMiddleware,
  forward,
};
