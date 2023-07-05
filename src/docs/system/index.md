---
title: Welcome
tags: System
description: Welcome to the Atlas System documentation. Learn about how to install and configure your Atlas system install.
keywords: atlas, atlas system, unified report system, data governance, database, documetation
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: system
  parent: Docs
  order: 1
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
---

# Welcome to Atlas {{ system.name }} Docs

**Coming soon!**

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
    {{ system.short_description }}
</p>

{{ system.description }}

{% set links=[{
  title:"Install",
  url:"/docs/system/install/",
  description:"install"
}] %}
