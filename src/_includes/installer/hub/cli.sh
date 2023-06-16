#!/usr/bin/env bash

set -Eeuo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

configure(){
    check_file config_cust.py

    fmt_yellow "Update config_cust.py file in site.."

    pm2 list | grep -oP "atlas-hub-((runner|scheduler)-)?\d+" | uniq | grep -oP "\d+" | uniq  | while IFS=$'\n' read DIRECTORY; do
      if [ -d "$DIRECTORY" ]; then

        # get old ports
        SCHEDULER=$(cat "$DIRECTORY/config_cust.py" | grep -oE "SCHEDULER_HOST.*?" | sed 's/\//\\\//g')
        RUNNER=$(cat "$DIRECTORY/config_cust.py" | grep -oE "RUNNER_HOST.*?" | sed 's/\//\\\//g')

        cp config_cust.py $DIRECTORY
        sed -i "s/SCHEDULER_HOST.*/${SCHEDULER}/g" "$DIRECTORY/config_cust.py"
        sed -i "s/RUNNER_HOST.*/${RUNNER}/g" "$DIRECTORY/config_cust.py"
      fi
    done

    fmt_yellow "Restarting processes.."
    pm2 list | grep -oP "atlas-hub-((runner|scheduler)-)?\d+" | uniq | while IFS=$'\n' read process; do
      pm2 restart $process
    done
}

usage() {
  cat << EOF

${BOLD}Usage: $(basename "${BASH_SOURCE[0]}") [-h, -b, -c, -u]

${BLUE}Atlas Hub Installer.${RESET}

Available options:

    -h, --help               Print this help and exit
    -c, --configure          Reconfigure Atlas Hub
    -i, --install [DEFAULT]  Install or Upgrade Atlas Hub

Additional Altas Hub Help at https://atlas.bi/docs/hub

EOF
  exit
}

install() {
  {% include "src/_includes/installer/hub/install.sh" %}
}

cleanup() {
  trap - SIGINT SIGTERM ERR EXIT
}

die() {
  echo >&2 -e "${1-}"
  exit 1
}

# https://betterdev.blog/minimal-safe-bash-script-template/
parse_params() {
  while :; do
    case "${1-}" in
    -h | --help) usage;break ;;

    -c | --configure) configure;break ;;
    -i | --install) install;break ;;
    -?*) die "${RED}Unknown option: $1. Run $(basename "${BASH_SOURCE[0]}") -h for help.${RESET}";break ;;
    *)  install;break ;;
    esac
    shift
  done

  return 0
}

parse_params "$@"
