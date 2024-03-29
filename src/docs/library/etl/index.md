---
title: Setup | Learn about the Atlas Library ETL, how it works, and the supplementary ETL's used to gather report metadata
tags: Library
description: ETL Setup. The Atlas ETL's are used to collect metadata from a variety of sources and merge it into a common database. There are several ETLs - LDAP Loads user information from an LDAP server. Sqlize Crystal Reports ETL to extract sql queries from Crystal Reports. Tableau Metadata ETL to extract Tableau metadata, sql queries and run data. PowerBI Metadata ETL to extract PowerBI metadata and run data. Report Metadata Collects metadata from over five different reporting tools. Report Run Data Collects run data from various reporting tools. Solr Search ETL to keep the search results fresh.
keywords: atlas, atlas library, unified report library, data governance, database, etl, deploy, install, publish
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Setup
  title: ETL Setup
  parent: Library
  order: 6
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

# ETL Setup

The Atlas ETL's are used to collect metadata from a variety of sources and merge it into a common database.

There are several ETLs -

- LDAP: Loads user information from an LDAP server.
- _(Optional)_ Sqlize Crystal Reports: ETL to extract sql queries from Crystal Reports.
- _(Optional)_ Tableau Metadata: ETL to extract Tableau metadata, sql queries and run data.
- _(Optional)_ PowerBI Metadata: ETL to extract PowerBI metadata and run data.
- Report Metadata (split into 8 sections): Collects metadata from over five different reporting tools.
- Report Run Data: Collects run data from various reporting tools.
- Solr Search: ETL to keep the search results fresh.
