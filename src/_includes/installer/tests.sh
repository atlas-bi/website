wait_for_url() {
  local url="$1"
  local timeout="${2:-30}"
  local interval="${3:-2}"
  local elapsed=0
  local status=""

  fmt_yellow "Checking $url (timeout: ${timeout}s)..."

  while [ "$elapsed" -lt "$timeout" ]; do
    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "$url" 2>/dev/null || true)

    if [[ "$status" =~ ^[23] ]]; then
      fmt_green "Got $status after ${elapsed}s"
      return 0
    fi

    fmt_yellow "  ${elapsed}s - got ${status:-no response}, retrying..."
    sleep "$interval"
    elapsed=$((elapsed + interval))
  done

  fmt_red "Timed out after ${timeout}s (last status: ${status:-no response})"
  return 1
}
