module.exports = {
  // Public client key (safe in the browser). Ingest host stays private; SDK uses `tunnel`.
  // Only emit the SDK when set at build time (Coolify build env).
  dsn: process.env.GLITCHTIP_DSN || '',
  tunnel: process.env.GLITCHTIP_TUNNEL || '/glitchtip',
  securityEndpoint:
    process.env.GLITCHTIP_SECURITY_ENDPOINT || '/glitchtip/security',
  tracesSampleRate: Number(process.env.GLITCHTIP_TRACES_SAMPLE_RATE || 0.01),
  environment:
    process.env.GLITCHTIP_ENVIRONMENT || process.env.NODE_ENV || 'development',
  release: process.env.GLITCHTIP_RELEASE || '',
};
