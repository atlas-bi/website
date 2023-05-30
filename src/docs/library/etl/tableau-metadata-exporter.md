---
title: Tableau Metadata Exporter
tags: Library
description: Atlas Library supplementary ETL to parse download Tableau report metadata and usage.
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
