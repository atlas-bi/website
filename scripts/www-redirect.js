/**
 * Permanent redirect www.example.com → example.com.
 * Uses X-Forwarded-Host / X-Forwarded-Proto when present (Cloudflare Tunnel).
 */
function forwardedHostHeader(req) {
  const forwarded = req.headers['x-forwarded-host'];
  return (forwarded || req.headers.host || '').split(',')[0].trim();
}

function requestHost(req) {
  return forwardedHostHeader(req).split(':')[0];
}

function requestProto(req) {
  const forwarded = req.headers['x-forwarded-proto'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.encrypted ? 'https' : 'http';
}

function apexLocation(req) {
  const raw = forwardedHostHeader(req);
  const [hostname, port] = raw.split(':');
  const proto = requestProto(req);
  const apex = hostname.replace(/^www\./i, '');
  const dropPort =
    !port ||
    (proto === 'https' && port === '443') ||
    (proto === 'http' && port === '80');
  const host = dropPort ? apex : `${apex}:${port}`;
  return `${proto}://${host}${req.url || '/'}`;
}

function createWwwRedirectMiddleware() {
  return function wwwRedirectMiddleware(req, res, next) {
    const host = requestHost(req);
    if (!/^www\./i.test(host)) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.statusCode = 301;
    res.setHeader('Location', apexLocation(req));
    res.end();
  };
}

module.exports = {
  createWwwRedirectMiddleware,
  requestHost,
  requestProto,
  apexLocation,
};
