---
title: Solr Search Loader | Supplementary ETLs | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library supplementary ETL to reset and populate the main website search. The etl to keeps search results fresh as new documentation is added.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, solr, apache solr, search, advanced search
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL Supplementary ETLs
  key: BIL Solr Search Loader
  title: Solr Search Loader
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
      - name: ETL Setup
        url: '{{ site.url }}/docs/bi-library/etl/'
        position: 4
      - name: Supplementary ETLs
        url: '{{ site.url }}/docs/bi-library/etl/supplementary-etls/'
        position: 5
---

# Solr Search Loader

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="svg-inline--fa fa-download fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Download this ETL</strong>
          <br>
          <a href="https://github.com/atlas-bi/Solr-Search-ETL" rel="noopener" target="blank">https://github.com/atlas-bi/Solr-Search-ETL</a>
        </p>
      </div>
    </div>
  </article>
</div>

Atlas BI Library > 2021.11.1 uses Apache Solr as the search engine. This collection of script is used to load data into Solr.

In order to use these scripts you should already have Atlas published, with Solr started. See the [deploy docs](/docs/bi-library/deploy/).

## How to use

1. Create a `settings.py` file with two variables, update as needed:

```py
SOLR_URL = "http://localhost:8983/solr/atlas"
SOLR_LOOKUP_URL = "http://localhost:8983/solr/atlas_lookups"
SQL_CONN = "SERVER=server_name;DATABASE=atlas;UID=user_name;PWD=password"
```

2. `delete.py` script should be run once daily to empty Solr.
3. The remaining `atlas_*.py` scripts can be run periodically through the day to keep search results current.
