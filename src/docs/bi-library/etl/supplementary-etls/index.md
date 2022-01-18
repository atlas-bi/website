---
title: Supplementary ETLs | ETL | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library Supplementary ETL guide. There are several supplementary ETL's created to help gather extra data outside of the main SSIS packages.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, supplementary etl, ldap, solr, tableau, crystal, sap
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Supplementary ETLs
  title: Supplementary ETLs
  parent: BIL ETL Setup
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
      - name: BI Library
        url: '{{ site.url }}/docs/bi-library/'
        position: 3
      - name: ETL Setup
        url: '{{ site.url }}/docs/bi-library/etl/'
        position: 4
---

# Supplementary ETLs

There are several supplementary ETLs that run with Python.

- LDAP User Import
- Solr Search Loader
- Tableau Metadata Exporter
- Sqlize Crystal Reports

These ETLs can be run separately from the main metadata ETL and are used to add supplementary information to web app.

The recommended way to run these ETLs is through [Atlas Automation Hub](/docs/automation-hub/), however then can also be run with `SQL Agent Jobs` or another tool .
