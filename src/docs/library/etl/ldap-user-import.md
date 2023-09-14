---
title: LDAP User Import | Atlas Library supplementary ETL to gather user profile information
tags: Library
description: Plugs directly into an LDAP server to get basic user data. Use the LDAPDatabaseCreationScript.sql to create a database with the required tables. Dependencies This ETL uses python. Python can be installed from https://www.python.org/downloads/ C++ build tools are needed on Windows OS. ODBC Driver for SQL Server is required for connecting to the database.
keywords: atlas, atlas library, unified report library, data governance, database, ldap, users, user profile, etl
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL ETL Setup
  key: BIL LDAP User Import
  title: LDAP User Import
  order: 1
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
        url: '{{ site.url }}/docs/bi-library/'
        position: 3
---

# LDAP User Import

{% set data={download:"https://github.com/atlas-bi/LDAP-ETL/releases",source:"", vidTitle:"LDAP ETL", vidUrl:"https://video.atlas.bi/videos/embed/81a60ee2-14a3-4368-b8be-9ad6ceb3f065"} %}

{% include 'src/_includes/components/download.njk' %}
{% get_page "https://raw.githubusercontent.com/atlas-bi/LDAP-ETL/master/README.md" %}
