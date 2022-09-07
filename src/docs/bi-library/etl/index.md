---
title: Setup | ETL | Atlas BI Library Docs
tags: BI Library
description: Learn about the Atlas BI Library ETL, how it works, and the supplementary ETL's used to gather report metadata.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, deploy, install, publish
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Setup
  title: ETL Setup
  parent: BI Library
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
---

# ETL Setup

The Atlas ETL's are used to collect metadata from a variety of sources and merge it into a common database.

There are two primary ETLs -

::: content

- Report Metadata (split into 8 sections)
- Report Run Data
  :::

The ETL's are SSIS packages and can be scheduled to run as jobs on a Microsoft SQL Server. The metadata ETL can be scheduled to run at a fairly frequent interval - every hour for example - while the run data ETL can be run daily.

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
