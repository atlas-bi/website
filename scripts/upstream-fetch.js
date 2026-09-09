/**
 * Optional insecure TLS for intranet upstreams that present Coolify/self-signed certs.
 * Prefer http:// Docker-network URLs instead of setting UPSTREAM_TLS_INSECURE=true.
 *
 * When enabled, Node's TLS verification is relaxed for this process (needed because
 * undici's Agent is not a reliable built-in require across Node versions).
 */
if (process.env.UPSTREAM_TLS_INSECURE === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

function upstreamFetch(url, options = {}) {
  return fetch(url, options);
}

module.exports = {
  upstreamFetch,
};
