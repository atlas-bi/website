---
title: Setup | ETL | Atlas BI Library Docs
tags: BI Library
description: Learn about the Atlas BI Library ETL, how it works, and the supplimentary ETL's used to gather report metadata.
layout: docs_library.njk
eleventyNavigation:
  key: BIL ETL Setup
  title: ETL Setup
  parent: BI Library
  order: 5
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


## Steps to Run

::: content
1. Configure and run the [supplementary ETLs](/docs/bi-library/etl/supplimentary-etls/)
2. Configure and run Atlas ETL's (main ETL and run data)

   - Delete SSRS sections if not used
   - Update Clarity server and credentials
   - Update Database connection strings
   - Schedule ETL's in SQL Agent Jobs
:::
