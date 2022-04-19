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

Ensure you have already met the [system requirements](/docs/bi-library/deploy/requirements/) before getting started.

Download the [latest release](https://github.com/atlas-bi/atlas-bi-library/releases) of Atlas BI Library onto your workstation.

## Update Settings

Update the website configuration files as specified in [configuration](/docs/bi-library/deploy/configuration).

## Setup the Database

The database can be setup after updating the configuration settings.

To create the production database vs development simple change the environment variable from `Development` to `Production`.

```
# install ef command line tools
dotnet tool install --global dotnet-ef

# set environment (powershell)
$env:ASPNETCORE_ENVIRONMENT='Development'

# install database
dotnet ef database update --project web/web.csproj -v
```

{% admonition
   "alert",
   "Database",
   "If you have a manually created database, ensure the database is current the old [creation script](https://github.com/atlas-bi/atlas-bi-library/blob/2d961e765106c26044ec29f415573d1d8e385c7e/web/atlas-creation_script.sql), then comment out the code in the `Migrations/*Initial.cs` that updates the database before running migrations!"
%}

{% admonition
   "alert",
   "Security",
   "Installing Atlas for the first time will create a administrator user called `Default` - which is also the default user. Ensure that admin privileges are removed from this user once you have your ETL running."
%}

## Run the Website Locally

Test out your configuration or changes by running the website locally. In visual studio, select `Run with IIS Express`.

{% image "./src/static/img/bi-library/development/iisexpress.png", "Start debug", "(min-width:400px) 50vw, 100vw", "boxed" %}

The first time you start up the app there will most likely be two SSL prompts.

{% image "./src/static/img/bi-library/development/ssl_warning.png", "ssl warning", "(min-width:400px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/bi-library/development/ssl_confirm.png", "ssl confirm", "(min-width:400px) 50vw, 100vw", "boxed" %}

## Publish to the Webserver

If you changes have tested nicely you can [publish](/docs/bi-library/publish) to your webserver.

We recommend to having two instances of Atlas (Atlas and Atlas-Test).

First, [publish](/docs/bi-library/publish) to test, and if your updates work well, then [publish](/docs/bi-library/publish) to your production server.
