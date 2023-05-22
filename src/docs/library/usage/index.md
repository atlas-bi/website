---
title: Usage
tags: BI Library
description: Discover how to use the Atlas BI Library app, configure basic settings, add report documentation and more!
keywords: atlas, atlas bi library, unified report library, data governance, database, using atlas, usage guide
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Usage
  title: Usage
  parent: Library
  order: 8
---

# Using Atlas

<p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-400">Discover how to navigate and take full advantage of all the features!</p>

## Report Library Objects

{% set links=[{
  title:"Reports",
  url:"/docs/library/usage/reports/",
  description:"Reports are the cornerstone of Atlas BI Library. System data is brought in through the ETLs and more documentation can be added in the app."
},{
  title:"Terms",
  url:"/docs/library/usage/terms/",
  description:"A terms provides a definition that can be shared across many reports and collections. Terms are a powerful way to identify key concepts in your report library."
},{
  title:"Collections",
  url:"/docs/library/usage/collections/",
  description:"Collections are a tool used to group similar terms and reports together with summary documentation. Inside a collection you can review users and usage as a combined total."
},{
  title:"Initiatives",
  url:"/docs/library/usage/initiatives/",
  description:"Initiatives are a tool used to combine collections together into a larger project with some additional documentation."
},{
  title:"User Profiles",
  url:"/docs/library/usage/user-profile/",
  description:"User profiles are a quick way to find who is using your reporting content, provides tools for sharing content, and more!"
},{
  title:"Group Profiles",
  url:"/docs/library/usage/group-profile/",
  description:"Group profiles identify users in groups from your various reporting systems or LDAP. Quickly find groups that use your reporting content."
}] %}

<div class="grid md:grid-cols-2 gap-4 ">
  {%- for link in links -%}
       <a href="{{ link.url }}" class="group animate-fade text-center border rounded-lg shadow p-5 space-y-3 transition-colors hover:border-sky-400 hover:shadow-sky-400 no-underline">
         <h2 class="text-2xl font-medium transition-colors m-0 text-slate-600 group-hover:text-slate-900 ">{{ link.title }}</h2>
         <p class="prose text-slate-600 group-hover:text-slate-900">{{ link.description }}</p>
         <div class="no-underline text-sky-600">Take me there!</div>
      </a>
    {%- endfor -%}
</div>

## Administrator Tools

{% set links=[{
  title:"Access Control",
  url:"/docs/library/usage/access-control/",
  description:"Learn how to secure your library by creating access groups and assigning permissions to users."
},{
  title:"Parameters",
  url:"/docs/library/usage/parameters/",
  description:"Customize you install by setting parameters to configure search, add global site messages, set documentation options and more!"
},{
  title:"Tasks",
  url:"/docs/library/usage/tasks/",
  description:"Tasks are a combination of prebuilt reports to help govern your report library. Quickly identify areas where attention is needed."
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
