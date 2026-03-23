pnpm i --prod --loglevel error

fmt_yellow "Building app.."
pnpm run build:remix
pnpm run build:server

fmt_yellow "Applying database migrations.."
pnpm run db
