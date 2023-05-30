---
title: Sqlize Crystal Reports
tags: Library
description: Atlas Library supplementary ETL to parse SAP Crystal report templates, and connect to APIs to gather report data.
keywords: atlas, atlas library, unified report library, data governance, database, etl, crystal, sap reports, sql
date: Last Modified
layout: docs_library.njk
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL PowerBI
  title: PowerBI
  order: 4
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

{% set data={download:"https://github.com/atlas-bi/PowerBI-ETL/releases",source:"https://github.com/atlas-bi/PowerBI-ETL"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/PowerBI-ETL/master/readme.md" %}
