---
title: Atlas Automation Hub Docs » Upgrading
tags: Automation Hub
description: Automation Hub upgrades can easily be installed using apt update and apt install commands. Take a backup before upgrading.
layout: docs_hub.njk
eleventyNavigation:
  key: AH Upgrade
  title: Upgrade Guide
  parent: Automation Hub
  order: 5
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
