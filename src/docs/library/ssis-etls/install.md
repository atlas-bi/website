---
title: Install | Lean about how to install the Atlas Library ETL on your SSIS server
tags: Library
description: How to Install. There are two user accounts needed to make the ETL's work. A domain account with read access to all source databases, and write access to the staging database. A local sql login with full access to the two databases atlas and atlas-staging.
keywords: atlas, atlas library, unified report library, data governance, database, etl, install, ssis, visual studio
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Install
  title: Install
  parent: BIL SSIS ETLs
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
        url: '{{ site.url }}/docs/library/'
        position: 3
      - name: SSIS ETLs
        url: '{{ site.url }}/docs/library/ssis-etls/'
        position: 4
---

# How to Install

There are two user accounts needed to make the ETL's work.

1. A **domain** account with read access to all source databases, and write access to the staging database.
2. A **local** sql login with full access to the two databases `atlas` and `atlas-staging`.

## Local SQL User

The SSRS user is created at the server level. Once created, they can be added to the databases.

The account should have reader, writer, admin and owner memberships to the two databases.

{% image "./src/static/img/library/install/add_user.png", "add user", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/library/install/user.png", "create user", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/library/install/user_cred.png", "user credentials", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/library/install/user_membership.png", "user membership", "(min-width:800px) 50vw, 100vw", "boxed" %}

## Set ETL Parameters

The ETL connection are kept in the **Connection Manager** and **Parameters**. Update the placeholder connection to valid credentials.

If any of these are not needed, delete them from the ETL or disable to steps.

Several data connection in the [Clarity ETL](https://datahandbook.epic.com/Reports/Details/9000648) are `csv` files. There is a pdf setup guide `Extracts and Exports Instruction Sheet.pdf` included in that download.

{% admonition
   "note",
   "Note",
   "The same steps can be followed to the Run Data ETL."
%}

## System Tables

It is possible that not all tables that Atlas uses are exported to your Clarity database. You may need to enable additional tables.

## Create the Staging Database

The Staging database can be created using the [creation script](https://github.com/atlas-bi/atlas-bi-library-etl/blob/master/atlas_staging_creation_script.sql).
