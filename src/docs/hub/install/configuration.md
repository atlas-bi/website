---
title: Configuration | Configure Atlas Hub, set authentication method, custom logos and more
tags: Hub
description: Configuring Atlas Hub is done through an ini file installed in /etc/atlas-hub/config.ini. Defaults are preset.
keywords: atlas, atlas hub, extract scheduler, etl, configuration, logo, saml
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Configuration
  title: Configuration
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

# Configuration

## Setup the Project Directory

```bash
mkdir -p /home/websites/atlas/hub
cd /home/websites/atlas/hub
```

## Download the default configuration file

```bash
curl https://raw.githubusercontent.com/atlas-bi/Hub/main/config.py > config_cust.py
```

The configuration file should be edited to meet your needs. At the least to get started using the app right away we can just update the postgres config.

```bash
nano config_cust.py
```

Scroll about half way down and change `SQLALCHEMY_DATABASE_URI` password to `1234_with_single_quotes`, the username to `web_user`, the database to `atlas-hub`, and the url to `127.0.0.1`.

## Update old installs with the new config

Already have Atlas Hub installed and just making changes to your config? You can update your install by running the following command.

It will copy the configuration into the app and restart the services.

```bash
curl -sSL https://atlas.bi/installers/hub.sh | bash -s -- --configure
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
