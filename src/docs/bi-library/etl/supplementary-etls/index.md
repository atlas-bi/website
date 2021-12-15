---
title: Supplementary ETLs | ETL | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Libaray Supplementary ETL guide. There are several supplementary ETL's created to help gather extra data outside of the main SSIS packages.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Supplementary ETLs
  title: Supplementary ETLs
  parent: BIL ETL Setup
  order: 4
---

# Supplementary ETLs

There are several supplementary ETLs that run with Python. 

- LDAP User Import
- Solr Search Loader
- Tableau Metadata Exporter
- Sqlize Crystal Reports

These ETLs can be run separately from the main metadata ETL and are used to add supplementary information to web app. 

The recommended way to run these ETLs is through [Atlas Automation Hub](/docs/automation-hub/), however then can also be run with `SQL Agent Jobs` or another tool .
