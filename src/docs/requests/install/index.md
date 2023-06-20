---
title: Install
tags: Requests
description: How to install Atlas Requests. Easily download and install with our ppa through apt!
keywords: atlas, atlas requests, extract scheduler, etl, install, guide, ubuntu server
layout: docs_requests.njk
date: Last Modified
eleventyNavigation:
  key: AS Install
  title: Install Guide
  parent: Requests
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
        url: '{{ site.url }}/docs/requests/'
        position: 3
---

# Install Guide

## Setup the Project Directory

```bash
mkdir -p /home/websites/atlas/requests
cd /home/websites/atlas/requests
```

## Run the Installer

```bash
curl -sSL https://atlas.bi/installers/requests.sh | bash -
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/requests.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
