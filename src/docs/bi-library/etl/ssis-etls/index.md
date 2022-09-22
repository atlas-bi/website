---
title: Supplementary ETLs | ETL | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library SSIS ETL guide. There are two SSIS ETL's used to collect all metadata and insert it into the Atlas database.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, supplementary etl, ldap, solr, tableau, crystal, sap
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL SSIS ETLs
  title: SSIS ETLs
  parent: BIL ETL Setup
  order: 5
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

# SSIS ETLs

The Report Metadata and Run Data ETL's are SSIS packages and can be scheduled to run as jobs on a Microsoft SQL Server. The metadata ETL can be scheduled to run at a fairly frequent interval - every hour or few hours for example - while the run data ETL can be run daily.

The Clarity ETL must be downloaded from the [data handbook](https://datahandbook.epic.com/Reports/Details/9000648).

## Metadata ETL

The metadata ETL is composed of multiple SSIS packages - basically one package per source system. There is a `setup` ETL that creates the database tables needed for the data merge, and then each other ETL will create their own specific data tables.

## Steps to Run

::: content

1. Configure and run the [supplementary ETLs](/docs/bi-library/etl/supplementary-etls/)
2. Configure and run Atlas ETL's (main ETL and run data)

   - Delete SSRS sections if not used
   - Update Clarity server and credentials
   - Update Database connection strings
   - Schedule ETL's in SQL Agent Jobs
     :::

## Requirements

::: content

- Install [Visual Studio 2017](https://visualstudio.microsoft.com/downloads/). The community edition works well.
- Visual Studio's `SQL Server Integration Services Projects` extension
  {% image "./src/static/img/bi-library/requirements/vs_extension.png", "Extension", "(min-width:800px) 50vw, 100vw", "boxed" %}
- `Data Storage and Processing` component
  {% image "./src/static/img/bi-library/requirements/sqlservices.png", "sql services component", "(min-width:800px) 50vw, 100vw", "boxed" %}
  :::
