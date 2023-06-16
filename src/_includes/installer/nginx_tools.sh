# from https://dev.to/justincy/blue-green-node-js-deploys-with-nginx-bkc
nginx_workers() {
  echo $(ps -ef | grep "nginx: worker process" | grep -v grep | wc -l)
}

nginx_reload() {
  numWorkerProcesses=$(nginx_workers)
  nginx -s reload

  # Wait for the old nginx workers to be retired before we kill the old server.
  while [ $(nginx_workers) -ne $numWorkerProcesses ]
  do
    sleep 1;
  done;
}