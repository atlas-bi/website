---
title: Welcome! Atlas Requests - documentation for how to install and use
tags: Requests
description: Welcome to the Atlas Requests documentation. Learn about how to install and configure your Atlas requests install.
keywords: atlas, atlas requests, unified report requests, data governance, database, documetation
layout: docs_requests.njk
date: Last Modified
eleventyNavigation:
  key: requests
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

# Welcome to Atlas {{ requests.name }} Docs

**Coming soon!**

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
    {{ requests.short_description }}
</p>

{{ requests.description }}

{% set links=[{
  title:"Install",
  url:"/docs/requests/install/",
  description:"install"
}] %}
