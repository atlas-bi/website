# Setup basic colors
color() {
  YELLOW=$(printf '\033[1m\033[33m')
  BLUE=$(printf '\033[1m\033[34m')
  RED=$(printf '\033[1m\033[31m')
  RESET=$(printf '\033[0m') # No Color
  GREEN=$(printf '\033[1m\033[32m')
  CYAN=$(printf '\033[1m\033[36m')
  BOLD=$(printf '\033[1m')
}

color

fmt_yellow() {
  echo "${YELLOW}$1${RESET}"
}
fmt_red() {
  echo "${RED}$1${RESET}"
}
fmt_blue() {
  echo "${BLUE}$1${RESET}"
}
fmt_green() {
  echo "${GREEN}$1${RESET}"
}
fmt_cyan() {
  echo "${BLUE}$1${RESET}"
}