---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: ETL
  parent: BI Library
  order: 7
---

# ETL

The Atlas ETL (designed for use with the [Atlas web application](https://github.com/Riverside-Healthcare/Atlas)), is used to collect report metadata from a variety of sources and merge it into a common database.

There are two primary ETLs -

::: content
- Report Metadata (split into 8 sections)
- Report Run Data
:::

The ETL's are both SSIS packages which are scheduled to run as jobs on a Microsft SQL Server. The metadata ETl can be scheduled to run at a fairly frequent interval - every 15 minutes - hour, while the run data ETL can be run daily.

The Clarity ETL can be added here: [Clarity ETL](https://datahandbook.epic.com/Reports/Details/9000648)

## Requirements

::: content
- [Active Directory Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/adexplorer), or other access to Active Directory
:::

## Steps to Run

::: content
1. Run database create scripts (LDAP, Data Governance, DG Staging). Set Datagov user credentials in database.
2. If you want to add demo data you can run the Data Governance database seeding script
3. Configure and run python LDAP script. Modify script and settings.py to match your LDAP build. Schedule in SQL Agent Jobs
4. Configure and run Atlas ETL's (main ETL and run data)

   - Delete SSRS sections if not used
   - Update Clarity server and credentials
   - Update Database connection strings
   - Schedule ETL's in SQL Agent Jobs

5. Populate Atlas/appsettings.json & appsettings.Development.json
6. Run website locally in Visual Studio
7. Update publish settings & publish
:::
