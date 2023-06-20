---
title: Welcome
tags: Library
description: Welcome to the Atlas Library documentation. Learn about how to install and configure your Atlas Library install.
keywords: atlas, atlas library, unified report library, data governance, database, documetation
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: Library
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

# Welcome to Atlas {{ library.name }} Docs

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
            {{ library.short_description }}
        </p>

{{ library.description }}

{% set links=[{
  title:"Getting Started",
  url:"/docs/library/getting-started/",
  description:"In just a few minutes you can have the Library web app running on your computer."
},{
  title:"Webserver Setup Guide",
  url:"/docs/library/webserver-setup/",
  description:"Find all the steps to prepare an IIS webserver for your Atlas Library install."
},{
  title:"ETL Setup Guide",
  url:"/docs/library/etl/",
  description:"Discover the ETL, how it works, and the supplementary ETL's used to gather report metadata."
},{
  title:"Publishing",
  url:"/docs/library/deploy/",
  description:"Read about how to deploy Atlas Library onto your web server."
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
