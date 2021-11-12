---
title: ETL Setup
tags: BI Library
description: Atlas Docs
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

## Supplementary ETL's

There are several supplementary ETL's that run with Python.

- [LDAP User Import](https://github.com/atlas-bi/atlas-bi-libaray-etl/tree/master/LDAP)
- [Solr Search Loader](https://github.com/atlas-bi/Solr-Search-ETL)
- [Tableau Metadata Exporter](https://github.com/atlas-bi/Tableau-Metadata-Exporter)
- [Sqlize Crystal Reports](https://github.com/atlas-bi/Sqlize-Crystal-Reports)

These ETL's can be run separately from the main metadata ETL and are used to add supplementary information to web app. The supplementary ETL's can also be through `SQL Agent Jobs`, or with another tool [Atlas Automation Hub](/docs/automation_hub/).

### LDAP Information

It is presumed that most user profile information will be coming from LDAP. The [LDAP User Import](https://github.com/atlas-bi/atlas-bi-libaray-etl/tree/master/LDAP) collects the necessary data from LDAP server(s) into a separate database. The primary metadata ETL will pick up from this database.

{% admonition
   "note",
   "SQL Server",
   "[Active Directory Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/adexplorer) is a useful tool to browse your LDAP setup."
%}

## Steps to Run

::: content
1. Configure and run the supplementary ETL's
2. Configure and run Atlas ETL's (main ETL and run data)

   - Delete SSRS sections if not used
   - Update Clarity server and credentials
   - Update Database connection strings
   - Schedule ETL's in SQL Agent Jobs
:::
