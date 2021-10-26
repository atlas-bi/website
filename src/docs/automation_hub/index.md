---
title: Welcome
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: Automation Hub
  parent: Docs
  order: 1
---

# About the App

Atlas Automation Hub is a three part server:

- web app
- scheduler
- job runner

Atlas Automation Hub runs with Nginx + Gunicorn. Three individual web services are created, the web app is the public web site and the other two (scheduler and runner) are internal API's running on the web server.

## Prerequisites

- Currently Atlas Automation Hub is setup to install on an Ubuntu server, however with a few tweaks to the install script it will work well on most Linux.
- curl or wget should be installed
- Ideally, you will have your own git repository, holding updated config files, and will publish from there.


## Data Flow

Project name and schedule are created > tasks can be added to the project.

Task are completely independent, the order of tasks is not respected and tasks may run in parallel. The purpose of allowing multiple tasks is to keep a clean grouping of tasks that belong to the same data project.

The tasks in a job can individually be started or stopped.

## Webserver Info

Atlas Automation Hub uses three web services for a few reasons -

- Splitting the UI from the running tasks improves the user experience
- The scheduler must run on only 1 web worker, while we would like as many workers as possible for the runner.
- API's are cool.

In the Atlas Automation Hub admin screen there is an option to retart the web services. For this option to work you may need to give you webapp user sudo permission, or:

``` bash

sudo visudo

# add this line to the end.. assuming the webapp usergroup is "webapp"
%webapp ALL=NOPASSWD: /bin/systemctl daemon-reload
%webapp ALL=NOPASSWD: /bin/systemctl restart *
```

If you will have "long running" tasks, it may be wise to increase the nginx timeout. (Gunicorn timeouts are already increased in the app install files.)

``` bash
# open nginx config
sudo nano /etc/nginx/nginx.conf

# add these in the http secion. all for good luck...
fastcgi_connect_timeout 999s;
proxy_connect_timeout 999s;
proxy_read_timeout 999s;
```

## How the Runner works



### Data Source

The output of "Data Source" is a list of tempfiles containing the source data. If a database query source is uses, there will be only one file.

After the data source is collected, the files are converted into the final output type.
