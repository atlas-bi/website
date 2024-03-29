---
title: Supplementary ETLs | Atlas Library SSIS ETL guide
tags: Library
description: The Report Metadata and Run Data ETL's are SSIS packages and can be scheduled to run as jobs on a Microsoft SQL Server. The metadata ETL can be scheduled to run at a fairly frequent interval - every hour or few hours for example - while the run data ETL can be run daily.
keywords: atlas, atlas library, unified report library, data governance, database, etl, supplementary etl, ldap, solr, tableau, crystal, sap
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL SSIS ETLs
  title: SSIS ETLs
  parent: Library
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
      - name: Library
        url: '{{ site.url }}/docs/library/'
        position: 3
---

# SSIS ETLs

The Report Metadata and Run Data ETL's are SSIS packages and can be scheduled to run as jobs on a Microsoft SQL Server. The metadata ETL can be scheduled to run at a fairly frequent interval - every hour or few hours for example - while the run data ETL can be run daily.

The Clarity ETL must be downloaded from the [data handbook](https://datahandbook.epic.com/Reports/Details/9000648).

## Metadata ETL

The metadata ETL is composed of multiple SSIS packages - basically one package per source system. There is a `setup` ETL that creates the database tables needed for the data merge, and then each other ETL will create their own specific data tables.

## Steps to Run

1. Configure and run the [supplementary ETLs](/docs/library/etl/)
2. Configure and run Atlas ETL's (main ETL and run data)

   - Delete SSRS sections if not used
   - Update Clarity server and credentials
   - Update Database connection strings
   - Schedule ETL's in SQL Agent Jobs

## Requirements

- Install [Visual Studio 2017](https://visualstudio.microsoft.com/downloads/). The community edition works well.
- Visual Studio's `SQL Server Integration Services Projects` extension
  {% image "./src/static/img/library/requirements/vs_extension.png", "Extension", "(min-width:800px) 50vw, 100vw", "boxed" %}
- `Data Storage and Processing` component
  {% image "./src/static/img/library/requirements/sqlservices.png", "sql services component", "(min-width:800px) 50vw, 100vw", "boxed" %}
