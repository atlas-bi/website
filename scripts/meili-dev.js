#!/usr/bin/env node
/**
 * Start a local Meilisearch binary for development.
 */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const HOST = process.env.MEILI_HOST || 'http://127.0.0.1:7700';
const PORT = process.env.MEILI_PORT || '7700';
const MASTER_KEY = process.env.MEILI_MASTER_KEY || 'atlas-dev-master-key';
// Fixed directories only (no process.env.PATH).
const MEILI_BIN_DIRS = [
  '/opt/homebrew/bin',
  '/usr/local/bin',
  '/usr/bin',
  '/bin',
];

function healthCheck() {
  return new Promise((resolve) => {
    const url = new URL('/health', HOST);
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForHealthy(timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await healthCheck()) {
      console.log(`Meilisearch ready at ${HOST}`);
      return;
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Meilisearch did not become healthy at ${HOST}`);
}

function resolveMeiliBinary() {
  for (const dir of MEILI_BIN_DIRS) {
    const candidate = path.join(dir, 'meilisearch');
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch {
      // try next
    }
  }
  return null;
}

(async () => {
  if (await healthCheck()) {
    console.log(`Meilisearch already running at ${HOST}`);
    // Keep the npm script process alive so run-p does not tear down siblings.
    setInterval(() => {}, 1 << 30);
    return;
  }

  const meiliBin = resolveMeiliBinary();
  if (!meiliBin) {
    console.error(
      'meilisearch binary not found. Install it (`brew install meilisearch`) and retry.',
    );
    process.exit(1);
  }

  console.log('Starting Meilisearch…');
  const args = [
    '--db-path',
    path.join(ROOT, '.meilisearch'),
    '--env',
    'development',
    '--http-addr',
    `127.0.0.1:${PORT}`,
    '--no-analytics',
  ];
  if (MASTER_KEY) {
    args.push('--master-key', MASTER_KEY);
  }

  const child = spawn(meiliBin, args, {
    cwd: ROOT,
    env: { MEILI_MASTER_KEY: MASTER_KEY },
    stdio: 'inherit',
  });
  child.on('spawn', async () => {
    try {
      await waitForHealthy();
    } catch (error) {
      console.error(error.message);
    }
  });
  child.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 1);
  });
})();
