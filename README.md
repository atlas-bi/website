# Atlas Website

Copy `.env.example` to `.env` and set:

| Variable | Required | Notes |
| --- | --- | --- |
| `SITE_URL` | Yes (build) | Public apex origin, no `www`. Used for canonical URLs, sitemap, and installer links. |
| `SITE_EMAIL_DAN` | No | Help / contact mailto. |
| `SITE_EMAIL_CHRISTOPHER` | No | Help / contact mailto. |
| `MEILI_HOST` | Yes (search) | **Internal** Meilisearch URL on the Coolify network (prefer `http://…`, not public HTTPS). |
| `MEILI_PORT` | No | Local Meilisearch listen port. Default `7700`. |
| `MEILI_INDEX` | No | Index name. Default `atlas`. |
| `MEILI_MASTER_KEY` | Yes (index) | Used by `updateSearch` / startup indexing. |
| `MEILI_SEARCH_KEY` | No | Used by `/api/search`. Falls back to `MEILI_MASTER_KEY`. |
| `GLITCHTIP_DSN` | No | Build-time: enables the browser SDK. Runtime: `/glitchtip` proxy. |
| `GLITCHTIP_TUNNEL` | No | Browser tunnel path. Default `/glitchtip`. |
| `GLITCHTIP_SECURITY_ENDPOINT` | No | Default `/glitchtip/security`. |
| `GLITCHTIP_TRACES_SAMPLE_RATE` | No | Default `0.01`. |
| `GLITCHTIP_ENVIRONMENT` | No | Default `NODE_ENV` or `development`. Set at **build** time. |
| `GLITCHTIP_RELEASE` | No | Optional release id. Set at **build** time. |
| `ANALYTICS_HOST` | Yes (analytics) | **Internal** Umami origin (`http://…` on Coolify network). |
| `ANALYTICS_WEBSITE_ID` | No | Build-time: emits the Umami script tag. |
| `ANALYTICS_SCRIPT_SRC` | No | Default `/analytics/script.js`. |
| `ANALYTICS_HOST_URL` | No | Default `/analytics`. |
| `UPSTREAM_TLS_INSECURE` | No | Set `true` only if Meili/Umami must be reached over HTTPS with a self-signed cert. |
| `PORT` | No | Origin listen port. Default `8080` in Docker. |
| `SITE_STATIC_DIR` | No | Directory of built HTML. Default `_site`. |

## Coolify

Prefer a **Dockerfile** (not Railpack). Railpack’s Node image has no Python/`pip`, so `djlint`’s postinstall fails — and `pnpm start` is for local dev, not production.

1. Coolify → Build Pack → **Dockerfile**
2. Ports / healthcheck → **8080** (path `/health`)
3. Set the env vars above (Meili / GlitchTip / analytics). Keep `MEILI_*` keys as **runtime** only, not build args.
4. On container start the entrypoint loads `_site/search/all.json` into Meilisearch (`MEILI_HOST` + `MEILI_MASTER_KEY` required). Search still works if indexing fails; check logs for `Indexed N documents`.

If you stay on Railpack temporarily: `djlint` is listed in `pnpm-workspace.yaml` `neverBuiltDependencies`, and set start command to `pnpm run start:prod` (not `pnpm start`).
