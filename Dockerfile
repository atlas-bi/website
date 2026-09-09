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
