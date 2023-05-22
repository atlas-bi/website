---
title: Upgrading
tags: Hub
description: Hub upgrades can easily be installed using apt update and apt install commands. Take a backup before upgrading.
keywords: atlas, atlas hub, extract scheduler, etl, upgrading, ubuntu server
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Upgrade
  title: Upgrade Guide
  parent: Hub
  order: 5
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

# Upgrading

## Recommended Method

### Create A Backup

Before updating it is recommended to take a backup. The backup files are stored in `/etc/atlas-hub/backups`. They will include a database dump, the current configuration, the current connection passwords, and the current install of the app.

```bash
atlas-hub --backup
```

If you've installed Atlas Hub using the recommended installer you can easily update with

```bash
atlas-hub --upgrade
```

Or, use the standard commands

```bash
sudo apt update && sudo apt install atlas-hub
```
