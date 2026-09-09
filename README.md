# Atlas Website

Copy `.env.example` to `.env` and set:

| Variable | Required | Notes |
| --- | --- | --- |
| `SITE_URL` | Yes (build) | Public apex origin, no `www`. Used for canonical URLs, sitemap, and installer links. |
| `SITE_EMAIL_DAN` | No | Help / contact mailto. |
| `SITE_EMAIL_CHRISTOPHER` | No | Help / contact mailto. |
| `MEILI_HOST` | Yes (search) | Private Meilisearch URL. Do not expose it publicly. |
| `MEILI_PORT` | No | Local Meilisearch listen port. Default `7700`. |
| `MEILI_INDEX` | No | Index name. Default `atlas`. |
| `MEILI_MASTER_KEY` | Yes (index) | Used by `updateSearch`. |
| `MEILI_SEARCH_KEY` | No | Used by `/api/search`. Falls back to `MEILI_MASTER_KEY`. |
| `GLITCHTIP_DSN` | No | Enables the browser SDK and `/glitchtip` proxy. |
| `GLITCHTIP_TUNNEL` | No | Browser tunnel path. Default `/glitchtip`. |
| `GLITCHTIP_SECURITY_ENDPOINT` | No | Default `/glitchtip/security`. |
| `GLITCHTIP_TRACES_SAMPLE_RATE` | No | Default `0.01`. |
| `GLITCHTIP_ENVIRONMENT` | No | Default `NODE_ENV` or `development`. Set at **build** time. |
| `GLITCHTIP_RELEASE` | No | Optional release id. Set at **build** time. |
| `ANALYTICS_HOST` | Yes (analytics) | Private Umami origin. Browser uses `/analytics/*` on this site. |
| `ANALYTICS_WEBSITE_ID` | No | Umami website id. |
| `ANALYTICS_SCRIPT_SRC` | No | Default `/analytics/script.js`. |
| `ANALYTICS_HOST_URL` | No | Default `/analytics`. |
| `PORT` | No | Origin listen port. Default `80`. |
| `SITE_STATIC_DIR` | No | Directory of built HTML. Default `_site`. |

## Coolify

Prefer a **Dockerfile** (not Railpack). Railpack’s Node image has no Python/`pip`, so `djlint`’s postinstall fails — and `pnpm start` is for local dev, not production.

1. Coolify → Build Pack → **Dockerfile**
2. Port **80**
3. Set the env vars above (Meili / GlitchTip / analytics)
4. After deploy, run `pnpm run updateSearch` against intranet Meilisearch

If you stay on Railpack temporarily: `djlint` is listed in `pnpm-workspace.yaml` `neverBuiltDependencies`, and set start command to `pnpm run start:prod` (not `pnpm start`).
