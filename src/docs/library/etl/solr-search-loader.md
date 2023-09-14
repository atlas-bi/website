---
title: Solr Search Loader | Atlas Library supplementary ETL to reset and populate the main website search
tags: Library
description: Load Atlas metadata into the Solr search engine that powers Atlas' search. The etl to keeps search results fresh as new documentation is added. In order to use these scripts you should already have Atlas published, with Solr started.
keywords: atlas, atlas library, unified report library, data governance, database, etl, solr, apache solr, search, advanced search
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL Solr Search Loader
  title: Solr Search Loader
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
      - name: Library
        url: '{{ site.url }}/docs/library/'
        position: 3
---

# Solr Search Loader

{% set data={download:"https://github.com/atlas-bi/Solr-Search-ETL/releases",source:"https://github.com/atlas-bi/Solr-Search-ETL", vidTitle:"Atlas Solr Search ETL", vidUrl:"https://video.atlas.bi/videos/embed/0beefee6-f054-4640-aeef-73818f4c28d9"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/Solr-Search-ETL/master/readme.md" %}
