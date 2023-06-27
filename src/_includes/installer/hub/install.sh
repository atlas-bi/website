# Check if commands and files exist.
check_command node
check_command npm
check_command curl
check_command pm2
check_command nginx
check_command lsof
check_command grep
check_command poetry
check_file config_cust.py
check_file "/etc/nginx/**/$NGINX_FILE"

# Get free internal ports.
fmt_yellow "Finding free ports.."

PORT=$(get_port)
RUNNER_PORT=$(get_port)
SCHEDULER_PORT=$(get_port)

fmt_blue "Using web port $PORT"
fmt_blue "Using runner port $RUNNER_PORT"
fmt_blue "Using scheduler port $SCHEDULER_PORT"

# Download the latest release.
fmt_yellow "Downloading latest version into $(pwd)/$PORT.."

mkdir "$PORT"
curl -sSL "$SOURCE" | tar zxf - -C "$PORT" --strip-components=1
cd "$PORT"

fmt_blue "Downloaded version $(npm pkg get version | tr -d '"')"

# Copy in the .env file.
fmt_yellow "Setting up configuration.."
cp ../config_cust.py .

# update ports
sed -i "s/SCHEDULER_HOST.*/SCHEDULER_HOST = \"http:\/\/127.0.0.1:${SCHEDULER_PORT}\/api\"/g" config_cust.py
sed -i "s/RUNNER_HOST.*/RUNNER_HOST = \"http:\/\/127.0.0.1:${RUNNER_PORT}\/api\"/g" config_cust.py

# make log dirs
mkdir -p logs


fmt_yellow "Installing python packages.."
poetry config --local virtualenvs.in-project true
poetry config --local virtualenvs.create true
poetry install --only main

export FLASK_ENV=production
export FLASK_DEBUG=0

fmt_yellow "Installing node packages and building static resources.."
npm install --loglevel error --no-fund --no-audit
.venv/bin/flask --app=web assets build


# Apply database migrations.
fmt_yellow "Applying database migrations.."
cp web/model.py runner/model.py
cp web/model.py scheduler/model.py

.venv/bin/flask --app=web db upgrade
.venv/bin/flask --app=web cli seed

# Set a few process names.
APP_PROCESS="$PM2_PREFIX-$PORT"
RUNNER_PROCESS="$PM2_PREFIX-runner-$RUNNER_PORT"
SCHEDULER_PROCESS="$PM2_PREFIX-scheduler-$SCHEDULER_PORT"


fmt_yellow "Starting new services.."

APP_CMD=".venv/bin/gunicorn --worker-class=gevent --workers 3 --threads 30 --timeout 999999999 --access-logfile $(pwd)/logs/access.log --error-logfile $(pwd)/logs/error.log --capture-output --bind 0.0.0.0:$PORT --umask 007 web:app"
SCHEDULER_CMD=".venv/bin/gunicorn --worker-class=gevent --workers 1 --threads 30 --timeout 999999999 --access-logfile $(pwd)/logs/access.log --error-logfile $(pwd)/logs/error.log --capture-output --bind  0.0.0.0:$SCHEDULER_PORT --umask 007 scheduler:app"
RUNNER_CMD=".venv/bin/gunicorn --worker-class=gevent --worker-connections=1000 --workers $(nproc --all) --threads 30 --timeout 999999999 --access-logfile $(pwd)/logs/access.log --error-logfile $(pwd)/logs/error.log --capture-output --bind 0.0.0.0:$RUNNER_PORT --umask 007 runner:app"

echo $APP_CMD

pm2 start "$APP_CMD" --name="$APP_PROCESS"
pm2 start "$SCHEDULER_CMD" --name="$SCHEDULER_PROCESS"
pm2 start "$RUNNER_CMD" --name="$RUNNER_PROCESS"

fmt_blue "Done setting up."

cd ..

fmt_yellow "Updating nginx.."
sed -i "s/localhost:3[0-9]*/localhost:${PORT}/" `find -L /etc/nginx -name "$NGINX_FILE"`

fmt_yellow "Gracefully reloading nginx..."
nginx_reload

fmt_yellow "Removing old pm2 processes.."

# gnu grep
pm2 list | grep -oP "$PM2_PREFIX-((runner|scheduler)-)?\d+" | uniq | while IFS=$'\n' read process; do
  if [[ $process != $APP_PROCESS && $process != $RUNNER_PROCESS && $process != $SCHEDULER_PROCESS ]];
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

fmt_green "Thanks for installing Atlas Hub!"
echo ""
fmt_green "Read the full install guide at https://atlas.bi/docs/hub/"
echo ""
fmt_blue "Next Steps"
echo ""
fmt_cyan "Remove Backups"
echo ""
echo ${YELLOW}Back folders can be manually removed. ${BLUE}rm -r $(pwd)/backup-*
echo ""

cat <<EOF
${CYAN}Current Configuration

${YELLOW}Web process was started with ${BLUE}pm2 start "$APP_CMD" --name="$APP_PROCESS"
${YELLOW}Scheduler process was started with ${BLUE}pm2 start "$SCHEDULER_CMD" --name="$SCHEDULER_PROCESS"
${YELLOW}Runner process was started with ${BLUE}pm2 start "$RUNNER_CMD" --name="$RUNNER_PROCESS"

${CYAN}Updating App Settings

${YELLOW}1. Update user configuration file ${BLUE}nano $(pwd)/config_cust.py
${YELLOW}2. Reconfigure with ${BLUE}curl -sSL https://atlas.bi/installers/hub.sh | bash -s -- --configure

${CYAN}Updating Nginx Settings

${YELLOW}1. Update configuration file ${BLUE}nano $(find -L /etc/nginx -name "$NGINX_FILE")
${YELLOW}2. Reload nginx ${BLUE}nginx -s reload

${CYAN}Monitoring and Viewing Logs

${YELLOW}Live Logging ${BLUE}pm2 monit
${YELLOW}Log files can be viewed in the $(pwd)/$PORT/logs folder.

${RESET}
EOF

warn_command ufw "Recommendation: secure your server with ufw!"
echo ""
