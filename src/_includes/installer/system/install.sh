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

fmt_blue "Using web port $PORT"
fmt_blue "Using quirrel port $QUIRREL_PORT"

# Download the latest release.
fmt_yellow "Downloading latest version into $(pwd)/$PORT.."

mkdir "$PORT"
curl -sSL $(curl -sSL "$SOURCE" | grep browser_download_url | cut -d : -f 2,3 | tr -d \") | tar zxf - -C "$PORT"
cd "$PORT"

fmt_blue "Downloaded version $(npm pkg get version | tr -d '"')"

# Copy in the .env file.
fmt_yellow "Setting up website.."
cp ../.env .

# Install dependencies.
npm i --omit=dev --loglevel error --no-fund --no-audit --legacy-peer-deps

# Apply database migrations.
fmt_yellow "Applying database migrations.."
npm run db


# Set a few process names.
APP_PROCESS="$APP-$PORT"
QUIRREL_PROCESS="$APP-quirrel-$QUIRREL_PORT"

exporter NODE_ENV=production
exporter WEB_PORT=$PORT
exporter QUIRREL_PORT=$QUIRREL_PORT

exporter APP_PROCESS=$APP_PROCESS
exporter QUIRREL_PROCESS=$QUIRREL_PROCESS

fmt_yellow "Starting new services.."

exporter PASSPHRASES=$QUIRREL_PROCESS
exporter DISABLE_TELEMETRY=1
exporter SESSION_SECRET=$APP_PROCESS

# Start quirrel and get a token.
# Start quirrel and get a token.
# this is now down in the app's server.js file
# so that the correct token can be used on a restart.
# dotenv -v PORT=$QUIRREL_PORT -- pm2 start node --name="$QUIRREL_PROCESS" -- node_modules/quirrel/dist/cjs/src/api/main.js

# Set quirrel env vars.
exporter QUIRREL_TOKEN=$(curl --retry 5 --retry-delay 3 --retry-all-errors --connect-timeout 10 --user ignored:$QUIRREL_PROCESS -X PUT "localhost:$QUIRREL_PORT/tokens/prod")
exporter QUIRREL_API_URL=http://localhost:$QUIRREL_PORT
exporter QUIRREL_BASE_URL=http://localhost:$PORT

# Load quirrel cron jobs.
# now done in server.js
# npm run quirrel:ci

# Start web process.
dotenv -v PORT=$PORT -- pm2 start node --name="$APP_PROCESS" --merge-logs -- ./build/server.js

fmt_blue "Done setting up."
cd ..

fmt_yellow "Updating nginx.."
sed -i "s/localhost:3[0-9]*/localhost:${PORT}/" `find -L /etc/nginx -name "$APP.conf"`

fmt_yellow "Gracefully reloading nginx..."
nginx_reload

fmt_yellow "Removing old pm2 processes.."

# gnu grep
pm2 list | grep -oP "$APP-((quirrel|meili)-)?\d+" | uniq | while IFS=$'\n' read process; do
  if [[ $process != $APP_PROCESS && $process != $QUIRREL_PROCESS ]];
  then
    fmt_yellow "Removing $process"
    pm2 delete $process || true
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
echo ${YELLOW}Back folders can be manually removed. ${BLUE}rm -r $(pwd)/backup-*
echo ""
fmt_green "Thanks for installing Atlas System!"
echo ""
fmt_green "Read the full install guide at https://atlas.bi/docs/system/"
echo ""
fmt_blue "Next Steps"

cat <<EOF
${CYAN}Current Configuration

${YELLOW}$(cat $PORT/.env.local)

${YELLOW}Web process was started with ${BLUE}dotenv -v PORT=$PORT -- pm2 start node --name="$APP_PROCESS" --merge-logs -- ./build/server.js
${YELLOW}Quirrel process was started with ${BLUE}dotenv -v PORT=$QUIRREL_PORT -- pm2 start node --name="$QUIRREL_PROCESS" -- node_modules/quirrel/dist/cjs/src/api/main.js

${CYAN}Updating App Settings

${YELLOW}1. Update user configuration file ${BLUE}nano $(pwd)/.env
${YELLOW}2. Copy config into app ${BLUE}cp $(pwd)/.env $(pwd)/$PORT/.env
${YELLOW}3. Restart the apps:
${BLUE}   pm2 restart $APP_PROCESS
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
