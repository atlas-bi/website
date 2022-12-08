---
title: Deploy | Atlas BI Library Docs
tags: BI Library
description: Learn how to start Atlas BI Library locally and make changes to the codebase. Settings are kept in json files.
keywords: atlas, atlas bi library, unified report library, data governance, database, deploy, running locally
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Deploy
  title: Deploy
  parent: BI Library
  order: 7
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
---

# Deploying Atlas BI Library

## Getting Started

Download the [latest release](https://github.com/atlas-bi/atlas-bi-library/releases) of Atlas BI Library onto your workstation and getting running with the [getting started](/docs/bi-library/getting-started/) guide.

## Update Settings

Update the website configuration files as specified in [configuration](/docs/bi-library/deploy/configuration).

## Install Dependencies and Update Database

Install the project dependencies, update the database and build a production deploy-

```js
npm install
npm db:update
npm dotnet:publish
```

The built website is will be in the `/out` folder and is ready to be copied to your web server.

{% admonition
   "alert",
   "Database",
   "If you have a manually created database, ensure the database is current the old [creation script](https://github.com/atlas-bi/atlas-bi-library/blob/2d961e765106c26044ec29f415573d1d8e385c7e/web/atlas-creation_script.sql), then comment out the code in the `Migrations/*Initial.cs` that updates the database before running migrations!"
%}

## Publish to the Web Server

If you changes have tested nicely you can [publish](/docs/bi-library/deploy/publish) to your web server.

We recommend to having two instances of Atlas (Atlas and Atlas-Test).

First, [publish](/docs/bi-library/deploy/publish) to test, and if your updates work well, then [publish](/docs/bi-library/deploy/publish) to your production server.
