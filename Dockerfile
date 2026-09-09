# Production image for Coolify (prefer this over Railpack).
# Serves `_site` + same-origin proxies for Meilisearch / GlitchTip / analytics.

FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
# Skip lifecycle scripts so djlint does not need pip; rebuild native packages used at build time.
RUN pnpm install --frozen-lockfile --ignore-scripts \
  && pnpm rebuild sharp @parcel/watcher esbuild

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
    GLITCHTIP_RELEASE=$GLITCHTIP_RELEASE
# Static build only; index Meilisearch after deploy (or set MEILI_* and change to `pnpm run build`)
RUN pnpm run build:ci

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV SITE_STATIC_DIR=/app/_site
ENV PORT=80

COPY --from=build /app/_site /app/_site
COPY --from=build /app/scripts /app/scripts

EXPOSE 80
CMD ["node", "./scripts/site-proxy.js"]
