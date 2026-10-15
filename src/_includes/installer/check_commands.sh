check_command() {
  if ! [ -x "$(command -v $1)" ]; then
    fmt_red "Error: $1 is not installed. ${GREEN}See {{ site.url }}/docs/" >&2
    exit 1
  fi
}

warn_command() {
  if ! [ -x "$(command -v $1)" ]; then
    fmt_cyan "$2" >&2
  fi
}

check_file() {
  if ! [[ -n $(compgen -G $1) ]]; then
    fmt_red "File $1 must be created before running this script. ${GREEN}See {{ site.url }}/docs/" >&2
    exit 1
  fi
}

exporter() {
  echo $1 | tee -a .env .env.local >/dev/null
}

# Log paths stay the same across deploys (process names include the port).
pm2_prepare_logs() {
  PM2_LOG_DIR="${PM2_HOME:-$HOME/.pm2}/logs"
  mkdir -p "$PM2_LOG_DIR"
}

pm2_out() {
  echo "$PM2_LOG_DIR/${1}-out.log"
}

pm2_err() {
  echo "$PM2_LOG_DIR/${1}-error.log"
}
