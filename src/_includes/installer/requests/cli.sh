set -Eeuo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

configure(){
    check_file .env

    fmt_yellow "Update .env file in site.."
    pm2 list | grep -oP "$PM2_PREFIX-((quirrel|meili)-)?\d+" | uniq | grep -oP "\d+" | uniq  | while IFS=$'\n' read DIRECTORY; do
      if [ -d "$DIRECTORY" ]; then
        cp .env $DIRECTORY
        cat .env.local >> .env 2>&1 >/dev/null
      fi
    done

    fmt_yellow "Restarting processes.."
    pm2 list | grep -oP "$PM2_PREFIX-((quirrel|meili)-)?\d+" | uniq | while IFS=$'\n' read process; do
      pm2 restart $process
    done
}

usage() {
  cat << EOF

${BOLD}Usage: $(basename "${BASH_SOURCE[0]}") [-h, -b, -c, -u]

${BLUE}Atlas Requests Installer.${RESET}

Available options:

    -h, --help               Print this help and exit
    -c, --configure          Reconfigure Atlas Requests
    -i, --install [DEFAULT]  Install or Upgrade Atlas Requests

Additional Altas Requests Help at https://atlas.bi/docs/requests

EOF
  exit
}

install() {
  {% include "src/_includes/installer/requests/install.sh" %}
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
