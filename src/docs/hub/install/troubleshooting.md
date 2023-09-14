---
title: Troubleshooting | Troubleshoot an Atlas Hub installation
tags: Hub
description: How to troublshoot Atlas Hub. Find logs, restart services and debug.
keywords: atlas, atlas hub, extract scheduler, etl, install, guide, ubuntu server, troubleshooting
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Troubleshooting
  title: Troubleshooting Guide
  parent: Hub
  order: 6
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Docs
        url: '{{ site.url }}/docs/hub/'
        position: 3
---

# Troubleshooting Guide

## Change to the Project Directory

```bash
cd /home/websites/atlas/hub
```

## Realtime Logs

Realtime logs can be viewed by running `pm2 monit`. Task errors will be shown in the `atlas-hub-runner-####` service.

Logs for a particular services can be viewed by running `pm2 logs <service name>`. Get a list of current services by running `pm2 list`.

## Log files

Log files for the services are located in the `3###/logs` folder.

## Restarting Services

Services can be restarted by running `pm2 restart <service name>`. Get a list of current services by running `pm2 list`.

## Nginx

Test a `nginx` config by running `nginx -t`.

Reload `nginx` after config changes by running `nginx -s reload`.

`Nginx` logs are generally found in `/var/log/nginx/`. Here are a few useful commands for viewing them:

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Errors

`sudo: poetry: command not found`: If you have installed poetry and are running the scripts with use you may need to add the path to poetry to your sudo path. Run `sudo visudo` and add `/root/.local/bin:` to the secure path.

## No `pm2` services after a reboot

Most likely `pm2` is not set to load after a reboot. You can run `pm2 resurrect; pm2 save` to get the jobs back, then run `pm2 startup` to make them reload after a reboot.
