---
title: Welcome | Welcome to the Atlas System documentation
tags: System
description: Track uptime and receive alerts when the system is not working as planned. Atlas System monitors SQL Server, Windows, Ubuntu, websites, and tcp connections. Supposed LDAP and SAML sso authentication.
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

**Available for testing now!**

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
    {{ system.short_description }}
</p>

{{ system.description }}

{% set links=[{
  title:"Install",
  url:"/docs/system/install/",
  description:"install"
}] %}
