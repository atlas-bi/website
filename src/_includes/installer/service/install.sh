
# Check if commands and files exist.
check_command node
check_command npm
check_command curl
check_command pm2
check_command nginx
check_command lsof
check_command dotenv
check_command grep
check_file .env
check_file "/etc/nginx/**/$APP.conf"


# Get free internal ports.
fmt_yellow "Finding a free port.."

PORT=$(get_port)
QUIRREL_PORT=$(get_port)
MEILI_PORT=$(get_port)

fmt_blue "Using web port $PORT"
fmt_blue "Using quirrel port $QUIRREL_PORT"
fmt_blue "Using meilsearch port $MEILI_PORT"

# Download the latest release.
fmt_yellow "Downloading latest version into $(pwd)/$PORT.."

mkdir "$PORT"
curl -sL "$SOURCE" | tar zxf - -C "$PORT" --strip-components=1
cd "$PORT"

fmt_blue "Downloaded version $(npm pkg get version | tr -d '"')"

# Copy in the .env file.
fmt_yellow "Setting up website.."
cp ../.env .

# Install dependencies.
npm i --omit=dev --loglevel silent --no-fund --no-audit

# Apply database migrations.
fmt_yellow "Applying database migrations.."
npx prisma migrate deploy


# Set a few process names.
APP_PROCESS="$APP-$PORT"
QUIRREL_PROCESS="$APP-quirrel-$QUIRREL_PORT"
MEILI_PROCESS="$APP-meili-$MEILI_PORT"

# Download meilisearch.
fmt_yellow "Installing meilisearch.."
curl -L https://install.meilisearch.com | sh


fmt_yellow "Starting new services.."

export PASSPHRASES=$QUIRREL_PROCESS
export DISABLE_TELEMETRY=1
export SESSION_SECRET=$APP_PROCESS

# Start quirrel and get a token.
PORT=$QUIRREL_PORT pm2 start node --name="$QUIRREL_PROCESS" -- node_modules/quirrel/dist/cjs/src/api/main.js

# Set quirrel env vars.
export QUIRREL_TOKEN=$(curl --retry 5 --retry-delay 3 --retry-all-errors --connect-timeout 10 --user ignored:$QUIRREL_PROCESS -X PUT "localhost:$QUIRREL_PORT/tokens/prod")
export QUIRREL_API_URL=http://localhost:$QUIRREL_PORT

# Load quirrel cron jobs.
npm run quirrel:ci

# Add a few env vars to get meilisearch running
export MEILI_DB_PAT=$pwd/$PORT/data.ms/
export MEILI_ENV=production
export MEILI_MASTER_KEY=$MEILI_PROCESS
export MEILISEARCH_URL=http://localhost:$MEILI_PORT
export MEILI_HTTP_ADDR=localhost:$MEILI_PORT

# Start web process.
PORT=$PORT pm2 start npm -i -1 --name="$APP_PROCESS" -- run start

# Start meili process.
pm2 start meilisearch --name="$MEILI_PROCESS"

fmt_blue "Done setting up."
cd ..

fmt_yellow "Updating nginx.."
sed -i "s/localhost:3[0-9]*/localhost:${PORT}/" `find -L /etc/nginx -name "$APP.conf"`

fmt_yellow "Gracefully reloading nginx..."
nginx_reload

fmt_yellow "Removing old pm2 processes.."

# gnu grep
pm2 list | grep -oP "$APP-((quirrel|meili)-)?\d+" | uniq | while IFS=$'\n' read process; do
  if [[ $process != $APP_PROCESS && $process != $QUIRREL_PROCESS && $process != $MEILI_PROCESS ]];
  then
    fmt_yellow "Removing $process"
    pm2 delete $process
  fi
done

pm2 save

fmt_yellow "Archiving old installs.."

for olddir in $(ls -d 3*); do
  if [[ $olddir != $PORT ]];
  then
    fmt_yellow "Moving $olddir"
    mv -f $olddir "backup-$olddir"
  fi
done;

fmt_blue "Finished cleaning up."
echo ""
echo ${YELLOW}Back folders can be manually removed. ${BLUE}rm -r $pwd/backup-*
echo ""
fmt_green "Thanks for installing Atlas Service!"
echo ""
fmt_green "Read the full install guide at https://atlas.bi/docs/service/"
echo ""
fmt_blue "Next Steps"

cat <<EOF
${CYAN}Updating App Settings

${YELLOW}1. Update user configuration file ${BLUE}nano $pwd/.env
${YELLOW}2. Copy config into app ${BLUE}cp $pwd/.env $pwd/$PORT/.env
${YELLOW}3. Restart the apps:
${BLUE}   pm2 restart $APP_PROCESS
${BLUE}   pm2 restart $MEILI_PROCESS
${BLUE}   pm2 restart $QUIRREL_PROCESS

${CYAN}Updating Nginx Settings

${YELLOW}1. Update configuration file ${BLUE}nano $(find -L /etc/nginx -name "$APP.conf")
${YELLOW}2. Reload nginx ${BLUE}nginx -s reload


${CYAN}Monitoring and Viewing Logs

${YELLOW}Live Logging ${BLUE}pm2 monit

${RESET}
EOF

warn_command ufw "Recommendation: secure your server with ufw."
echo ""