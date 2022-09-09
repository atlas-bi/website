---
title: Welcome | Atlas BI Library Docs
tags: BI Library
description: Welcome to the Atlas BI Library documentation. Learn about how to install and configure your Atlas BI Library install.
keywords: atlas, atlas bi library, unified report library, data governance, database, documetation
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BI Library
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

# {{ bi_library.name }}

<p class="subtitle">{{ bi_library.short_description }}</p>

{{ bi_library.description }}

<div class="tile is-ancestor">
    <div class="tile is-parent">
       <div class="tile is-child box bd-notification has-background-white-bis has-text-centered">
         <h4 class="title is-3 has-text-success my-5">Getting Started</h4>
         <span class="icon is-large has-text-grey-light"><i class="fas fa-rocket fa-2x"></i></span>
         <p class="subtitle my-5">In just a few minutes you can have Atlas BI Library web app running on your computer.</p>
         <a class="button is-info" href="/docs/bi-library/getting-started/">Take me there!</a>
      </div>
    </div>
    <div class="tile is-parent">
    <div class="tile is-child box bd-notification has-background-white-bis has-text-centered">
       <h4 class="title is-3 has-text-success my-5">Webserver Setup Guide</h4>
       <span class="icon is-large has-text-grey-light"><i class="fas fa-server fa-2x"></i></span>
       <p class="subtitle my-5">Find all the steps to prepare an IIS webserver for your Atlas BI Library install.</p>
       <a class="button is-info" href="/docs/bi-library/webserver-setup/">Take me there!</a>
    </div>
  </div>
  
</div>
<div class="tile is-ancestor">
  <div class="tile is-parent">
     <div class="tile is-child box bd-notification has-background-white-bis has-text-centered">
       <h4 class="title is-3 has-text-success my-5">ETL Setup Guide</h4>
       <span class="icon is-large has-text-grey-light"><i class="fas fa-code fa-2x"></i></span>
       <p class="subtitle my-5">Discover the ETL, how it works, and the supplementary ETL's used to gather report metadata.</p>
       <a class="button is-info" href="/docs/bi-library/etl/">Take me there!</a>
    </div>
  </div>
  <div class="tile is-parent">
     <div class="tile is-child box bd-notification has-background-white-bis has-text-centered">
       <h4 class="title is-3 has-text-success my-5">Publishing</h4>
       <span class="icon is-large has-text-grey-light"><i class="fas fa-ship fa-2x"></i></span>
       <p class="subtitle my-5">Read about how to deploy Atlas BI Library onto your web server.</p>
       <a class="button is-info" href="/docs/bi-library/deploy/">Take me there!</a>
    </div>
  </div>
</div>
