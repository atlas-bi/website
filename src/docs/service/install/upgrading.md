---
title: Upgrading
tags: Service
description: Atlas Service upgrades can easily be installed using apt update and apt install commands. Take a backup before upgrading.
keywords: atlas, atlas service, extract scheduler, etl, upgrading, ubuntu server
layout: docs_service.njk
date: Last Modified
eleventyNavigation:
  key: AH Upgrade
  title: Upgrade Guide
  parent: Service
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
        url: '{{ site.url }}/docs/service/'
        position: 3
---

# Upgrading

```bash
curl -sSL https://atlas.bi/installers/service.sh | bash -
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/service.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
