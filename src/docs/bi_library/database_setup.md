---
title: Database Setup
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Database Setup
  title: Database Setup
  parent: BI Library
  order: 4
---

# Database Server

Atlas BI Library is designed to run with **SQL Server Database 2016 or later**. 


::: content
- An install of SQL Server Database 2016+ with [Full Text Index](https://codingsight.com/implementing-full-text-search-in-sql-server-2016-for-beginners/)
- See [ETL Install](/docs/bi_library/etl/install/) for a database setup guide
:::

{% admonition
   "note",
   "SQL Server",
   "Any SQL Server license type will work. If you need a demo database we recommend [running with docker](https://schwabencode.com/blog/2019/10/27/MSSQL-Server-2017-Docker-Full-Text-Search>)."
%}


## Create Databases

There are two databases used -

::: content
- ``atlas-staging`` used to prepare raw data and insert it into several staging tables.
- ``atlas`` is the destination database used by the webapp.
:::

The databases can be created by running the two database creation scripts:

::: content
- [atlas_staging-creation_script.sql](https://github.com/atlas-bi/atlas-bi-libaray-etl/blob/master/atlas_staging_creation_script.sql)
- [atlas-creation_script.sql](https://github.com/atlas-bi/atlas-bi-library/blob/master/web/atlas-creation_script.sql)
:::
