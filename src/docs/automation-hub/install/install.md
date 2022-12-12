---
title: Install | Atlas Automation Hub Docs
tags: Automation Hub
description: How to install Atlas Automation Hub. Easily download and install with our ppa through apt!
keywords: atlas, atlas automation hub, extract scheduler, etl, install, guide, ubuntu server
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Install
  title: Install Guide
  parent: Automation Hub
  order: 4
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
        url: '{{ site.url }}/docs/automation-hub/'
        position: 3
---

# Install Guide

This is the recommended way to install Atlas Hub. The installed is designed for a dedicated Ubuntu 20 Server, is easy to install and upgrade.

The primary server requirement is disk space - have enough space to hold 2x the data you plan to transfer. Atlas Hub streams all data, so the memory requirements are low.

Install `curl` and `gnupg2`.

```bash
sudo apt update;
sudo apt install curl gnupg2
```

Then, connect to the Atlas PPA Repository

```bash
curl -s "https://packages.atlas.bi/scripts/deb.sh" | sudo bash -
```

Finally, install Atlas Hub. The `EXTERNAL_URL` is an optional pram with the DNS you've set up. This can be configured after install.

```bash
# if you have already configured a dns:
export EXTERNAL_URL='https://atlas-hub.me.com'; sudo apt install atlas-hub

# if you plan to configure a dns after install:
sudo apt install atlas-hub
```

{% admonition
   "note",
   "Note",
   "If this is a new server you will be prompted to set the region and time zone."
%}

## Next Steps

Nice job installing! You can access the website with a default username of "admin" to try things out. Now it is time to configure the app. See the [configuration guide](/docs/automation-hub/install/configuration/) for a complete list of options.

## Tips

### Making Connections to SQL Server Databases

If you will be using SQL Server databases as a datasource you will need to [install the package from Microsoft](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15).

### Making Connections to a LAN

If you use hostnames vs IP addresses in your config files be sure to update hosts file `nano /etc/hosts` to include the IP address of any internal domain hosts you will use. For example, LDAP server, GIT server, any databases you plan to query, etc.
