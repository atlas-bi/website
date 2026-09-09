/**
 * Same-origin Meilisearch proxy.
 * Browser posts to /api/search; host forwards to private/intranet Meilisearch.
 */
const { upstreamFetch } = require('./upstream-fetch');

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function meiliConfig() {
  return {
    host: (process.env.MEILI_HOST || 'http://127.0.0.1:7700').replace(
      /\/$/,
      '',
    ),
    apiKey:
      process.env.MEILI_SEARCH_KEY ||
      process.env.MEILI_MASTER_KEY ||
      'atlas-dev-master-key',
    indexUid: process.env.MEILI_INDEX || 'atlas',
  };
}

function buildSearchPayload(query) {
  return {
    q: query,
    limit: 10,
    attributesToRetrieve: ['title', 'url', '_tags'],
    attributesToCrop: ['content'],
    cropLength: 32,
    attributesToHighlight: ['title', 'content'],
    highlightPreTag: '<em>',
    highlightPostTag: '</em>',
  };
}

async function searchMeili(query) {
  const { host, apiKey, indexUid } = meiliConfig();
  const response = await upstreamFetch(
    `${host}/indexes/${encodeURIComponent(indexUid)}/search`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildSearchPayload(query)),
    },
  );
  const text = await response.text();
  return {
    status: response.status,
    text,
    contentType: response.headers.get('content-type') || 'application/json',
  };
}

function createMeiliSearchMiddleware() {
  return async function meiliSearchMiddleware(req, res, next) {
    const path = (req.url || '').split('?')[0];
    if (path !== '/api/search' && path !== '/api/search/') {
      if (typeof next === 'function') return next();
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST, OPTIONS');
      res.end('Method not allowed');
      return;
    }

    try {
      const raw = await readRequestBody(req);
      let query = '';
      try {
        const parsed = JSON.parse(raw.toString('utf8') || '{}');
        query = typeof parsed.q === 'string' ? parsed.q.trim() : '';
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        return;
      }

      if (!query) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(JSON.stringify({ hits: [] }));
        return;
      }

      if (query.length > 200) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(JSON.stringify({ message: 'Query too long' }));
        return;
      }

      const upstream = await searchMeili(query);
      let payload;
      try {
        payload = JSON.parse(upstream.text);
      } catch {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(JSON.stringify({ message: 'Search unavailable' }));
        return;
      }
      res.statusCode = upstream.status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(JSON.stringify(payload));
    } catch (error) {
      console.error('Meilisearch proxy failed', error);
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(JSON.stringify({ message: 'Search unavailable' }));
    }
  };
}

module.exports = {
  createMeiliSearchMiddleware,
  searchMeili,
  meiliConfig,
};
