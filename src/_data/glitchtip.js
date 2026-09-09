module.exports = {
  // Public client key (safe in the browser). Ingest host stays private; SDK uses `tunnel`.
  dsn:
    process.env.GLITCHTIP_DSN ||
    'https://4454dcba6e7f4c8790eae6ab2b8ec230@bugs.landandsea.dev/5',
  tunnel: process.env.GLITCHTIP_TUNNEL || '/glitchtip',
  securityEndpoint:
    process.env.GLITCHTIP_SECURITY_ENDPOINT || '/glitchtip/security',
  tracesSampleRate: Number(process.env.GLITCHTIP_TRACES_SAMPLE_RATE || 0.01),
  environment:
    process.env.GLITCHTIP_ENVIRONMENT || process.env.NODE_ENV || 'development',
  release: process.env.GLITCHTIP_RELEASE || '',
};
