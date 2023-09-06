npm i --omit=dev --loglevel error --no-fund --no-audit --legacy-peer-deps

fmt_yellow "Building app.."
npm run build:remix
npm run build:server

fmt_yellow "Applying database migrations.."
npm run db
