/**
 * Permanent redirect www.example.com → example.com.
 * Redirect Location is built only from SITE_URL (trusted) plus a sanitized path.
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

function configuredApex() {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) return null;
  try {
    return new URL(siteUrl);
  } catch {
    return null;
  }
}

/** Relative path only; drops query/hash and rejects absolute / protocol-relative URLs. */
function safeRequestPath(url) {
  const pathOnly = (url || '/').split('?')[0].split('#')[0];
  if (
    !pathOnly.startsWith('/') ||
    pathOnly.startsWith('//') ||
    pathOnly.includes('\\') ||
    /[^a-zA-Z0-9._~!$&'()*+,;=:@/%-]/.test(pathOnly)
  ) {
    return '/';
  }
  return pathOnly;
}

function apexLocation(req) {
  const apex = configuredApex();
  if (!apex) return null;
  return new URL(safeRequestPath(req.url), apex.origin).toString();
}

function createWwwRedirectMiddleware() {
  return function wwwRedirectMiddleware(req, res, next) {
    const host = requestHost(req);
    const apex = configuredApex();

    if (!apex || !/^www\./i.test(host)) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const expectedWww = `www.${apex.hostname}`;
    if (host.toLowerCase() !== expectedWww.toLowerCase()) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const location = apexLocation(req);
    if (!location || !location.startsWith(apex.origin)) {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.statusCode = 301;
    res.setHeader('Location', location);
    res.end();
  };
}

module.exports = {
  createWwwRedirectMiddleware,
  requestHost,
  requestProto,
  apexLocation,
};
