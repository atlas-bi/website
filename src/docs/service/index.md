---
title: Welcome
tags: Service
description: Welcome to the Atlas service documentation. Learn about how to install and configure your Atlas service install.
keywords: atlas, atlas service, unified report service, data governance, database, documetation
layout: docs_service.njk
date: Last Modified
eleventyNavigation:
  key: service
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

# {{ service.name }}

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
            {{ service.short_description }}
        </p>

{{ service.description }}

{% set links=[{
  title:"Install",
  url:"/docs/service/install/",
  description:"install"
}] %}

<div class="grid md:grid-cols-2 gap-4 ">
  {%- for link in links -%}
       <a href="{{ link.url }}" class="group animate-fade text-center border rounded-lg shadow p-5 space-y-3 transition-colors hover:border-sky-400 hover:shadow-sky-400 no-underline">
         <h2 class="text-2xl font-medium transition-colors m-0 text-slate-600 group-hover:text-slate-900 ">{{ link.title }}</h2>
         <p class="prose text-slate-600 group-hover:text-slate-900">{{ link.description }}</p>
         <div class="no-underline text-sky-600" >Take me there!</div>
      </a>
    {%- endfor -%}
</div>
