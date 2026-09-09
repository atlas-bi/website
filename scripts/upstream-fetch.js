/**
 * Optional insecure TLS for intranet upstreams that present Coolify/self-signed certs.
 * Prefer http:// Docker-network URLs instead of setting UPSTREAM_TLS_INSECURE=true.
 */
const { Agent } = require('undici');

let insecureAgent;

function upstreamFetchOptions(extra = {}) {
  if (process.env.UPSTREAM_TLS_INSECURE !== 'true') {
    return extra;
  }
  if (!insecureAgent) {
    insecureAgent = new Agent({
      connect: { rejectUnauthorized: false },
    });
  }
  return { ...extra, dispatcher: insecureAgent };
}

function upstreamFetch(url, options = {}) {
  return fetch(url, upstreamFetchOptions(options));
}

module.exports = {
  upstreamFetch,
  upstreamFetchOptions,
};
