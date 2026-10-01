/**
 * Shared security response headers for site-proxy and Eleventy --serve.
 * HSTS is only set when the request is (or was terminated as) HTTPS.
 */
const { requestProto } = require('./www-redirect');

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self'",
  'frame-src https://www.youtube.com https://www.youtube-nocookie.com',
  'upgrade-insecure-requests',
].join('; ');

const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  // credentialless keeps YouTube embeds working; require-corp would break them.
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

const HSTS = 'max-age=31536000; includeSubDomains; preload';

function applySecurityHeaders(req, res) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!res.getHeader(name)) {
      res.setHeader(name, value);
    }
  }
  if (requestProto(req) === 'https' && !res.getHeader('Strict-Transport-Security')) {
    res.setHeader('Strict-Transport-Security', HSTS);
  }
}

function createSecurityHeadersMiddleware() {
  return function securityHeadersMiddleware(req, res, next) {
    applySecurityHeaders(req, res);
    if (typeof next === 'function') return next();
  };
}

module.exports = {
  CONTENT_SECURITY_POLICY,
  HSTS,
  SECURITY_HEADERS,
  applySecurityHeaders,
  createSecurityHeadersMiddleware,
};
