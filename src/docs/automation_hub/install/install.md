---
title: Install
tags: Automation Hub
description: Automation Hub Install
layout: docs_hub.njk
eleventyNavigation:
  key: AH Install
  title: Install Guide
  parent: Automation Hub
  order: 4
---


# Recommended Install Method

This is the recommended way to install Atlas Hub. The installed is designed for a dedicated Ubuntu Server, is easy to install, and easy to upgrade.

The primary server requirement is diskspace - have enough space to hold 2x the data you plan to transfer. Atlas Hub streams all data, so the memory requirements are low.

## Install


Install ``curl`` and ``gnupg2``.

```bash
sudo apt update; sudo apt install curl gnupg2
```

Then, connect to the Atlas PPA Repository

```bash
curl -s "https://packages.atlas.bi/scripts/deb.sh" | sudo bash -
```

Finally, install Atlas Hub

```bash
export EXTERNAL_URL='https://atlas-hub.me.com'; sudo apt install atlas-hub
```

The `EXTERNAL_URL` is an optional pram with the DNS you've set up. This can be configured after install.


## Tips

### Connection to SQL Server Databases

If you will be using SQL Server databases as a datasource you will need to [install the package from Microsoft](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15).


### Connecting to LAN

If you use hostnames vs IP addresses in your config files be sure to update hosts file ``nano /etc/hosts`` to include the ip address of any internal domain hosts you will use. For example, LDAP server, GIT server, any databases you plan to query, etc.
