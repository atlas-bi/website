---
title: Sqlize Crystal Reports
tags: Library
description: Atlas Library supplementary ETL to parse SAP Crystal report templates, and connect to APIs to gather report data.
keywords: atlas, atlas library, unified report library, data governance, database, etl, crystal, sap reports, sql
date: Last Modified
layout: docs_library.njk
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL Sqlize Crystal Reports
  title: Sqlize Crystal Reports
  order: 2
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

# Sqlize Crystal Reports

{% set data={download:"https://github.com/atlas-bi/Sqlize-Crystal-Reports/releases",source:"https://github.com/atlas-bi/Sqlize-Crystal-Reports", vidTitle:"Crystal ETL Install", vidUrl:"https://video.atlas.bi/videos/embed/2deb942b-7d75-45dd-a387-b692b29665c7"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/Sqlize-Crystal-Reports/master/readme.md" %}
