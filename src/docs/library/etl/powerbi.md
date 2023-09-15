---
title: PowerBI ETL | Atlas Library supplementary ETL to load PowerBI reports, queries, and connect to APIs to gather report data
tags: Library
description: This is a user contributed ETL that can be used with the Atlas Metadata ETL. It is specifically made to use a cloud PowerBI. The SSIS package in /etl can be added in with the other ETL SSIS packages in Visual Studio. The SISS package will run various powershell scripts which are in the /powershell folder. See the notes.txt and /modified_sql to see modifications you may need to make for this ETL to work with your PowerBI install.
keywords: atlas, atlas library, unified report library, data governance, database, etl, powerBI, reports, sql
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

# PowerBI

{% set data={download:"https://github.com/atlas-bi/PowerBI-ETL/releases",source:"https://github.com/atlas-bi/PowerBI-ETL"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/PowerBI-ETL/master/readme.md" %}
