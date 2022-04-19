---
title: Database Setup | Atlas BI Library Docs
tags: BI Library
description: Learn about how to setup your database for a new Atlas BI Library install. The database is sql server 2016 or later.
keywords: atlas, atlas bi library, unified report library, data governance, database, setup, database setup, ssrs
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Database Setup
  title: Database Setup
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

# Database Server

Atlas BI Library is designed to run with **SQL Server Database 2016 or later**.

::: content

- See [ETL Install](/docs/bi-library/etl/install/) for a database setup guide
  :::

{% admonition
   "note",
   "SQL Server",
   "Any SQL Server license type will work. If you need a demo database we recommend running with docker."
%}

## Create Databases

There are two databases used -

::: content

- `atlas-staging` used to prepare raw data and insert it into several staging tables (created in the ETL setup).
- `atlas` is the destination database used by the webapp (created when deploying the webapp).
  :::
