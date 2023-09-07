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
check_file "/etc/nginx/**/$NGINX_FILE"


# Get free internal ports.
fmt_yellow "Finding a free port.."

PORT=$(get_port)
QUIRREL_PORT=$(get_port)
MEILI_PORT=$(get_port)

fmt_blue "Using web port $PORT"
fmt_blue "Using quirrel port $QUIRREL_PORT"
fmt_blue "Using meili port $MEILI_PORT"

# Download the latest release.
fmt_yellow "Downloading latest version into $(pwd)/$PORT.."

mkdir "$PORT"
curl -sSL $(curl -sSL "$SOURCE" | grep browser_download_url | cut -d : -f 2,3 | tr -d \") | tar zxf - -C "$PORT"
cd "$PORT"

fmt_blue "Downloaded version $(npm pkg get version | tr -d '"')"

fmt_yellow "Installing meilisearch.."
mkdir etc; cd etc;
curl -L https://install.meilisearch.com | sh
cd ..

# Copy in the .env file.
fmt_yellow "Setting up website.."
cp ../.env .

{% include "src/_includes/installer/system/build.sh" %}

# Set a few process names.
APP_PROCESS="$APP-$PORT"


exporter NODE_ENV=production
exporter WEB_PORT=$PORT
exporter QUIRREL_PORT=$QUIRREL_PORT
exporter MEILI_PORT=$MEILI_PORT

fmt_yellow "Starting new services.."

# Start web process.
pm2 start node --name="$APP_PROCESS" --merge-logs -- ./build/server.js

fmt_blue "Done setting up."
cd ..

fmt_yellow "Updating nginx.."
sed -i "s/localhost:3[0-9]*/localhost:${PORT}/" `find -L /etc/nginx -name "$NGINX_FILE"`

fmt_yellow "Gracefully reloading nginx..."
nginx_reload

fmt_yellow "Removing old pm2 processes.."

# gnu grep
pm2 list | grep -oP "$APP-((quirrel|meili)-)?\d+" | uniq | while IFS=$'\n' read process; do
  if [[ $process != $APP_PROCESS ]];
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
${CYAN}View Current Configuration

${BLUE}cat $PORT/.env

${YELLOW}Web process was started with ${BLUE}dotenv -v PORT=$PORT -- pm2 start node --name="$APP_PROCESS" --merge-logs -- ./build/server.js

${CYAN}Updating App Settings

${YELLOW}1. Update user configuration file ${BLUE}nano $(pwd)/.env
${YELLOW}2. Reconfigure the app
${BLUE}   curl -sSL https://atlas.bi/installers/system.sh | bash -s -- --configure

${CYAN}Updating Nginx Settings

${YELLOW}1. Update configuration file ${BLUE}nano $(find -L /etc/nginx -name "$NGINX_FILE")
${YELLOW}2. Test nginx config ${BLUE}nginx -t
${YELLOW}2. Reload nginx ${BLUE}nginx -s reload


${CYAN}Monitoring and Viewing Logs

${YELLOW}Live Logging ${BLUE}pm2 monit

${RESET}
EOF

warn_command ufw "Recommendation: secure your server with ufw."
echo ""
