---
title: Troubleshooting
tags: System
description: How to troublshoot Atlas System. Find logs, restart services and debug.
keywords: atlas, atlas system, extract scheduler, etl, install, guide, ubuntu server, troubleshooting
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AS Troubleshooting
  title: Troubleshooting Guide
  parent: System
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
      - name: System
        url: '{{ site.url }}/docs/system/'
        position: 3
---

# Troubleshooting Guide

## Change to the Project Directory

```bash
cd /home/websites/atlas/system
```

## Realtime Logs

Realtime logs can be viewed by running `pm2 monit`. Errors will be shown in the `atlas-system-` services.

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
