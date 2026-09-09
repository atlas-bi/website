#!/usr/bin/env node
/**
 * Same-origin origin for Cloudflare Tunnel (no nginx, no Docker):
 *   POST /api/search          → private Meilisearch
 *   POST /glitchtip           → private GlitchTip
 *   GET  /analytics/script.js → private Umami
 *   POST /analytics/api/send  → private Umami
 *   GET  *                    → Eleventy `_site` when SITE_STATIC_DIR is set
 */
const http = require('node:http');
const { createGlitchtipMiddleware, parseDsn } = require('./glitchtip-proxy');
const { createMeiliSearchMiddleware, meiliConfig } = require('./meili-proxy');
const {
  createAnalyticsMiddleware,
  analyticsUpstream,
} = require('./analytics-proxy');
const { createStaticMiddleware, staticRoot } = require('./static-middleware');
const { createWwwRedirectMiddleware } = require('./www-redirect');

const port = Number(process.env.PORT || process.env.SITE_PROXY_PORT || 80);
const glitchtipDsn = process.env.GLITCHTIP_DSN || '';
const glitchtip = createGlitchtipMiddleware(glitchtipDsn);
const meili = createMeiliSearchMiddleware();
const analytics = createAnalyticsMiddleware();
const wwwRedirect = createWwwRedirectMiddleware();
const staticFiles = createStaticMiddleware();
const meiliInfo = meiliConfig();
const glitchtipInfo = parseDsn(glitchtipDsn);
const analyticsHost = analyticsUpstream();
const siteDir = staticRoot();

const server = http.createServer((req, res) => {
  const path = (req.url || '').split('?')[0];

  if (path === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        status: 'ok',
        meili: meiliInfo.host,
        glitchtip: glitchtipInfo ? glitchtipInfo.host : null,
        analytics: analyticsHost,
        static: siteDir,
      }),
    );
    return;
  }

  wwwRedirect(req, res, () => {
    meili(req, res, () => {
      glitchtip(req, res, () => {
        analytics(req, res, () => {
          staticFiles(req, res, () => {
            res.statusCode = 404;
            res.end('Not found');
          });
        });
      });
    });
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Site proxy listening on :${port}`);
  console.log(
    `  /api/search           → ${meiliInfo.host} (index ${meiliInfo.indexUid})`,
  );
  console.log(`  /analytics/script.js  → ${analyticsHost}/script.js`);
  console.log(`  /analytics/api/send   → ${analyticsHost}/api/send`);
  if (glitchtipInfo) {
    console.log(`  /glitchtip            → ${glitchtipInfo.host}`);
  } else {
    console.log('  /glitchtip            → disabled (set GLITCHTIP_DSN)');
  }
  if (siteDir) {
    console.log(`  GET *                 → ${siteDir}`);
  } else {
    console.log(
      '  GET *                 → 404 (set SITE_STATIC_DIR to serve the built site)',
    );
  }
});
