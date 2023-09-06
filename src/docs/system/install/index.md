---
title: Install
tags: System
description: How to install Atlas System. Easily download and install with our ppa through apt!
keywords: atlas, atlas system, extract scheduler, etl, install, guide, ubuntu server
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AS Install
  title: Install Guide
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

# Install Guide

## Setup the Project Directory

```bash
mkdir -p /home/websites/atlas/system
cd /home/websites/atlas/system
```

## Run the Installer

```bash
curl -sSL https://atlas.bi/installers/system.sh | bash -
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/system.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}

See [Configuration](/docs/system/install/configuration/) for installer configuration options.
