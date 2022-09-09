---
title: Changelog | Supplementary ETLs | ETL | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library Supplementary ETLs changelog. Find updates from recent releases and what feature you can expect on your next upgrade.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, changelog
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Supplementary ETLs Changelog
  title: Changelog
  parent: BIL Supplementary ETLs
  order: 5
---

# Changelog

Release notes have been moved into the releases.

::: content

- [Solr Search Loader](https://github.com/atlas-bi/Solr-Search-ETL/releases)
- [LDAP User Import](https://github.com/atlas-bi/atlas-bi-library/releases)
- [Sqlize Crystal Reports](https://github.com/atlas-bi/Sqlize-Crystal-Reports/releases)
- [Tableau Metadata Exporter](https://github.com/atlas-bi/Tableau-Metadata-Exporter/releases)

:::

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="solr">Solr Search Loader</a></li>
    <li><a tab="ldap">LDAP User Import</a></li>
    <li><a tab="crystal">Sqlize Crystal Reports</a></li>
    <li><a tab="tableau">Tableau Metadata Exporter</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab is-active"id="solr">

# Solr Search Loader

## Version 2022.01.1

::: content

- Strip html from input descriptions to avoid format breaking in return snippets
  :::

## Version 2021.12.1

::: content

- Added fields
:::
   </div>
   <div class="tab"id="ldap">

# LDAP User Import

## Version 2022.1.1

::: content

- Split from primary ETL
:::
</div>
   <div class="tab"id="crystal">

# Sqlize Crystal Reports

## Version 2022.1.1

:::content

- Split ETL's into individual files so they can be run independently.
- Fix bug in report data load from BOE.
:::
   </div>
   <div class="tab"id="tableau">

# Tableau Metadata Exporter

## Version 0.0.1

::: content

- Updated to work with any Tableau version
:::
</div>
</div>
