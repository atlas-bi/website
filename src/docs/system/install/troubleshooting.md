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
      - name: Docs
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

Windows:
need powershell version > 5.1 for commands to work

Follow these directions:
https://hostadvice.com/how-to/how-to-install-an-openssh-server-client-on-a-windows-2016-server/

Download link:
https://github.com/PowerShell/Win32-OpenSSH/releases/

Error 1297: https://github.com/PowerShell/Win32-OpenSSH/issues/1824

Once that is completed we need to change the service login accounts to an account that has access to the LDAP directory.
Open services (run services.msc). Find the SSH services. There should be two.. probably called "Open SSH ...".
Right click on each service > properties > logon > change the login account to one that can access the LDAP server and is also part of the administrator group on the server.
The services will most likely fail to restart.
Open security (secpool.msc) as recommended and add administrator group as needed to Security Settings > Local Policies > User Rights Assignment.
After adding the admin group here you can go back and restart both services. Services should start without error.
Errors can be found in the Event Log application > Windows > Security, and also in Event Log > Application > Open SSH.
