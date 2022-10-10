---
title: LDAP User Import | Supplementary ETLs | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library supplementary ETL to gather user profile information. It plugs directly into an LDAP server to get basic user data.
keywords: atlas, atlas bi library, unified report library, data governance, database, ldap, users, user profile, etl
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL LDAP User Import
  title: LDAP User Import
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
      - name: BI Library
        url: '{{ site.url }}/docs/bi-library/'
        position: 3
      - name: ETL Setup
        url: '{{ site.url }}/docs/bi-library/etl/'
        position: 4
      - name: Supplementary ETLs
        url: '{{ site.url }}/docs/bi-library/etl/supplementary-etls/'
        position: 5
---

# LDAP User Import

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="svg-inline--fa fa-download fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Download this ETL</strong>
          <br>
          <a href="https://github.com/atlas-bi/LDAP-ETL/releases" rel="noopener" target="blank">https://github.com/atlas-bi/LDAP-ETL</a>
        </p>
      </div>
    </div>
  </article>
</div>
<div class="block">
  <div class="video_wrapper" style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/757123870?h=5c6c9fb360&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="LDAP ETL"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
</div>

::: content

{% get_page "https://raw.githubusercontent.com/atlas-bi/LDAP-ETL/master/README.md" %}

:::