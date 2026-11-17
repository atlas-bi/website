# Production image for Coolify (prefer this over Railpack).
# Serves `_site` + same-origin proxies for Meilisearch / GlitchTip / analytics.

FROM node:26-bookworm-slim AS build
WORKDIR /app
# Eleventy `date: git Last Modified` needs git + a .git directory in the build context.
RUN apt-get update \
  && apt-get install -y --no-install-recommends git \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g --ignore-scripts corepack@0.36.0 && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# pnpm-workspace.yaml allowBuilds runs sharp/@parcel/watcher/esbuild and skips djlint (no pip).
# Avoid --ignore-scripts + rebuild: that path is fragile on Coolify (native install scripts skipped).
RUN pnpm install --frozen-lockfile

COPY . .
# Bake public client config into HTML at build time (set these in Coolify build env).
ARG SITE_URL=https://atlas.bi
ARG ANALYTICS_WEBSITE_ID
ARG ANALYTICS_SCRIPT_SRC=/analytics/script.js
ARG ANALYTICS_HOST_URL=/analytics
ARG GLITCHTIP_DSN
ARG GLITCHTIP_TUNNEL=/glitchtip
ARG GLITCHTIP_SECURITY_ENDPOINT=/glitchtip/security
ARG GLITCHTIP_TRACES_SAMPLE_RATE=0.01
ARG GLITCHTIP_ENVIRONMENT=production
ARG GLITCHTIP_RELEASE
ENV SITE_URL=$SITE_URL \
    ANALYTICS_WEBSITE_ID=$ANALYTICS_WEBSITE_ID \
    ANALYTICS_SCRIPT_SRC=$ANALYTICS_SCRIPT_SRC \
    ANALYTICS_HOST_URL=$ANALYTICS_HOST_URL \
    GLITCHTIP_DSN=$GLITCHTIP_DSN \
    GLITCHTIP_TUNNEL=$GLITCHTIP_TUNNEL \
    GLITCHTIP_SECURITY_ENDPOINT=$GLITCHTIP_SECURITY_ENDPOINT \
    GLITCHTIP_TRACES_SAMPLE_RATE=$GLITCHTIP_TRACES_SAMPLE_RATE \
    GLITCHTIP_ENVIRONMENT=$GLITCHTIP_ENVIRONMENT \
    GLITCHTIP_RELEASE=$GLITCHTIP_RELEASE \
    ELEVENTY_IMG_CI=1 \
    ELEVENTY_IMG_CONCURRENCY=1 \
    ELEVENTY_IMG_TIMEOUT_MS=90000 \
    ELEVENTY_FETCH_TIMEOUT_MS=20000 \
    ELEVENTY_SKIP_REMOTE_IMAGES=1 \
    SHARP_CONCURRENCY=1 \
    UV_THREADPOOL_SIZE=4
# Static build only; index Meilisearch after deploy (or set MEILI_* and change to `pnpm run build`).
RUN mkdir -p .cache/eleventy-img \
  && pnpm run build:ci

FROM node:26-bookworm-slim AS runtime
WORKDIR /app
# Coolify healthchecks require curl/wget inside the image.
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
ENV SITE_STATIC_DIR=/app/_site
# Non-root cannot bind privileged port 80.
ENV PORT=8080

COPY --from=build --chown=node:node /app/_site /app/_site
COPY --from=build --chown=node:node /app/scripts /app/scripts
COPY --from=build --chown=node:node /app/src/search/update-meili-index.js /app/src/search/update-meili-index.js
COPY --from=build --chown=node:node /app/node_modules/meilisearch /app/node_modules/meilisearch

USER node
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s --start-period=45s --retries=5 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/health" || exit 1
CMD ["node", "./scripts/docker-entrypoint.js"]
