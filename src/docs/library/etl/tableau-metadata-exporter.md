---
title: Tableau Metadata Exporter | Atlas Library supplementary ETL to parse download Tableau report metadata and usage
tags: Library
description: A Python script pulls and parses XML data from PSQL readonly Tableau database. This data, along with data pulled from Tableau's database, is inserted into a SQL database and is able to be run daily and inserted into Atlas.
keywords: atlas, atlas library, unified report library, data governance, database, etl, tableau, metadata
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL Tableau Metadata Exporter
  title: Tableau Metadata Exporter
  order: 3
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

# Tableau Metadata Exporter

{% set data={download:"https://github.com/atlas-bi/Tableau-Metadata-Exporter/releases",source:"https://github.com/atlas-bi/Tableau-Metadata-Exporter"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/Tableau-Metadata-Exporter/master/README.md" %}
