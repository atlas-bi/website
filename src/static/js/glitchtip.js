import * as Sentry from '@sentry/browser';

const configEl = document.getElementById('glitchtip-config');
const config = configEl ? JSON.parse(configEl.textContent) : {};

if (config.dsn) {
  const botUa =
    /bot|crawler|spider|slurp|bingbot|googlebot|yandex|baidu|duckduck|facebookexternalhit|semrush|ahrefs|petalbot|bytespider/i;

  Sentry.init({
    dsn: config.dsn,
    // Same-origin tunnel — public origin → private GlitchTip
    tunnel: config.tunnel || '/glitchtip',
    tracesSampleRate:
      typeof config.tracesSampleRate === 'number'
        ? config.tracesSampleRate
        : 0.01,
    environment: config.environment || 'production',
    release: config.release || undefined,
    ignoreErrors: [
      'Script error.',
      'Script error',
      /^Unexpected token/,
      /cdn-cgi\/rum/i,
      /searchResults\.njk/i,
    ],
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
    beforeSend(event) {
      const ua = navigator.userAgent || '';
      if (botUa.test(ua)) {
        return null;
      }
      return event;
    },
  });
}
