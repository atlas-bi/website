---
title: Install
tags: Hub
description: How to install Atlas Hub. Easily download and install with our ppa through apt!
keywords: atlas, atlas hub, extract scheduler, etl, install, guide, ubuntu server
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Install
  title: Install Guide
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

# Install Guide

## Setup the Project Directory

```bash
mkdir -p /home/websites/atlas/hub
cd /home/websites/atlas/hub
```

## Run the Installer

```bash
curl -sSL https://atlas.bi/installers/hub.sh | bash -
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/hub.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}

## Advanced Installer Configuration

Some items in the installer can be configured through an `installer.conf` file in the install directory. These settings are helpful if you are running multiple instances of Atlas Hub on the same server.

| Key        | Definition                                                               |
| ---------- | ------------------------------------------------------------------------ |
| NGINX_FILE | Alternate name for the `nginx` config file. Default is `atlas-hub.conf`. |
| PM2_PREFIX | Alternate prefix for `pm2` processes. Default is `atlas-hub`.            |

The file format should be:

```ini
KEY=VALUE
```

## Next Steps

Nice job installing! You can access the website with a default username of "admin" to try things out. Now it is time to fully configure the app. See the [configuration guide](/docs/hub/install/configuration/) for a complete list of options.

## Tips

### Making Connections to SQL Server Databases

If you will be using SQL Server databases as a data source you will need to [install the ODBC package from Microsoft](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15).

### Making Connections to a LAN

If you use host names vs IP addresses in your config files be sure to update hosts file `nano /etc/hosts` to include the IP address of any internal domain hosts you will use. For example, LDAP server, GIT server, any databases you plan to query, etc.

## Authentication

There are two primary authentication options -

- SAML2
- LDAP

### SAML2

The [PySAML2](https://pysaml2.readthedocs.io) library is used for SAML authentication, and all the `sp` configuration parameters are supported. The default config file includes an ADFS setup example.

Saml metadata is accessible at `/saml2/metadata/`.

### LDAP

LDAP login follows this basic process:

1. `config_cust.py` file holds the general connection info. A connection to the ldap server is made with the service account credentials supplied in the config file.
2. Once a connection is established and a user attempts to access the site the package first verifies that the user exists, by doing a search for the user. If the user exists we save their details and groups.
3. If the user exists then we attempt to log them in.. this returns true if they had a valid username/pass.
4. Finally, as this site can be restricted to users in a certain LDAP group, for example, we only allow users that have the "Analytics" group on their profile.
