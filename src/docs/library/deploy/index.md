---
title: Deploy
tags: BI Library
description: Learn how to start Atlas BI Library locally and make changes to the codebase. Settings are kept in json files.
keywords: atlas, atlas bi library, unified report library, data governance, database, deploy, running locally
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Deploy
  title: Deploy
  parent: Library
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
        url: '{{ site.url }}/docs/library/'
        position: 3
---

# Deploying Atlas BI Library

## Getting Started

Download the [latest release](https://github.com/atlas-bi/Library/releases) of Atlas BI Library onto your workstation and getting running with the [getting started](/docs/library/getting-started/) guide.

## Update Settings

Update the website configuration files as specified in [configuration](/docs/library/deploy/configuration).

## Install Dependencies and Update Database

Install the project dependencies, update the database and build a production deploy-

```js
npm install
npm run db:update
npm run dotnet:publish
```

The built website is will be in the `/out` folder and is ready to be copied to your web server.

## Publish to the Web Server

If you changes have tested nicely you can [publish](/docs/library/deploy/publish) to your web server.

We recommend to having two instances of Atlas (Atlas and Atlas-Test).

First, [publish](/docs/library/deploy/publish) to test, and if your updates work well, then [publish](/docs/library/deploy/publish) to your production server.
