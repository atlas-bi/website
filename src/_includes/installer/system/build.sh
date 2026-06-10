pnpm i --prod --loglevel error

fmt_yellow "Building app.."
pnpm run build:remix
pnpm run build:server

fmt_yellow "Applying database migrations.."
pnpm run db

fmt_yellow "Cleaning package manager caches.."
pnpm store prune || true
rm -rf "$HOME/.cache/Cypress" || true
