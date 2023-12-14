---
title: Sqlize Crystal Reports | Atlas Library supplementary ETL to parse SAP Crystal report templates, and connect to APIs to gather report data
tags: Library
description: Sqlize Crystal Reports runs Aidan Ryan's RptToXml converter to convert a directory of SAP Crystal Reports into XLM files, and then makes a strong attempt at parsing that XML out into a somewhat readable and potentially runnable t-sql statement. The results are saved into a database table along with the reports.
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

{% set data={download:"https://github.com/atlas-bi/Sqlize-Crystal-Reports/releases",source:"https://github.com/atlas-bi/Sqlize-Crystal-Reports", vidTitle:"Crystal ETL Install", vidUrl:"https://www.youtube.com/embed/FKaGT-VVmPk?si=jNLxHspFVTfGyqV8&rel=0"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/Sqlize-Crystal-Reports/master/readme.md" %}
