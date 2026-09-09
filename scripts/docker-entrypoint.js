#!/usr/bin/env node
/**
 * Production entrypoint: load Meilisearch index (if configured), then serve.
 * Index failures are logged but do not block the site from starting.
 */
const { spawn } = require('node:child_process');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function runIndexer() {
  if (!process.env.MEILI_HOST) {
    console.log('MEILI_HOST unset; skipping search index load');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [path.join(ROOT, 'src/search/update-meili-index.js')],
      {
        cwd: ROOT,
        env: process.env,
        stdio: 'inherit',
      },
    );
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      console.error(
        `Search index update exited with code ${code}; continuing startup`,
      );
      resolve();
    });
    child.on('error', (error) => {
      console.error('Search index update failed; continuing startup', error);
      resolve();
    });
  });
}

(async () => {
  await runIndexer();
  require('./site-proxy.js');
})();
