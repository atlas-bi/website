---
title: Atlas BI Library Docs » Development
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Development
  title: Development
  parent: BI Library
  order: 7
---

# Development

## Getting Started

Ensure you have already met the [`development requirements`](/docs/bi-library/development/requirements/) before getting started.

Download or clone the [Altas BI Library](https://github.com/atlas-bi/atlas-bi-library) repository onto your workstation.

## Update Settings

Find the file called ``appsettings.json`` and create a file along side it called ``appsettings.cust.json``. This file will hold your custom settings.

Copy the contents of ``appsettings.json`` into your new file and adjust the settings to meet your needs. The main update required is the database connection.

Development settings for debugging can also be added. Create another file called ``appsettings.cust.Development.json`` and copy the contents of ``appsettings.Development.json`` in.

## Run the Website Locally

Test out your configuration or changes by running the website locally. In visual studio, select ``Run with IIS Express``.

{% image "./src/static/img/bi-library/development/iisexpress.png", "Start debug", "(min-width:400px) 50vw, 100vw", "boxed" %}

The first time you start up the app there will most likely be two SSL prompts.

{% image "./src/static/img/bi-library/development/ssl_warning.png", "ssl warning", "(min-width:400px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/bi-library/development/ssl_confirm.png", "ssl confirm", "(min-width:400px) 50vw, 100vw", "boxed" %}


## Deploy to the Webserver

If you changes have tested nicely you can [`deploy`](/docs/bi-library/deploy) to your webserver.

We recommend to having two instances of Atlas (Atlas and Atlas-Test).

First, [deploy](/docs/bi-library/deploy) to test, and if your updates work well, then [deploy](/docs/bi-library/deploy) to your production server.
