
check_command() {
  if ! [ -x "$(command -v $1)" ]; then
    fmt_red "Error: $1 is not installed. ${GREEN}See https://atlas.bi/docs/service/install" >&2
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
    fmt_red "File $1 must be created before running this script. ${GREEN}See https://atlas.bi/docs/service/install" >&2
    exit 1
  fi
}

exporter() {
  echo $1 | tee -a .env .env.local >/dev/null
}