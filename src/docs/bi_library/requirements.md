---
title: Requirements
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Requirements
  title: Requirements
  parent: BI Library
  order: 5
---

# Requirements

It is recommended to put the database on a separate server from the webapp, but a single server server can be used for both the webapp and database.

## Webapp Server

::: content
- Windows Server 2016 or later.
- IIS Webserver with [Microsoft .NET SDK 5 (Hosting Bundle)](https://dotnet.microsoft.com/download/dotnet/5.0)
  {% image "./src/static/img/bi_library/requirements/dotnetversion.png", "Extension", "(min-width:400px) 50vw, 100vw", "boxed" %}
- Ensure IIS has server roles needed for [web deploy and web management service](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis) installed and started. Microsoft has a few [examples](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis).

  - IIS: ASPNET 4.7
  - IIS: .NET Extensibility 4.5

- By default the Web Deploy seems to not install correctly. `Change` the install in `Control Panel > Programs > Programs and Features` and ensure the package is completely installed.
  {% image "./src/static/img/bi_library/requirements/install_web_deploy.png", "Extension", "(min-width:800px) 50vw, 100vw", "boxed" %}
:::

After installing the server should be rebooted, or the web services restarted (`Web Deployment Agent Service` and `Web Management Service`).

{% admonition
   "hint",
   "Deploy Atlas",
   "We recommend deploying with Visual Studio for ease of use. See the [`deploy guide`](/docs/bi_library/deploy/). It is also possible to deploy with a ci/cd pipeline if you prefer."
%}

{% admonition
   "alert",
   ".NET 5",
   "While .NET 5 x86 is specified, it is not required. The only *requirement* is that Atlas is *built* and *run* in the same version and bitness."
%}

## Database Server

::: content
- An install of SQL Server Database 2016+ with [Full Text Index](https://codingsight.com/implementing-full-text-search-in-sql-server-2016-for-beginners/)
- See [ETL Install](/docs/bi_library/etl/install/) for a database setup guide
:::

{% admonition
   "note",
   "SQL Server",
   "Any SQL Server license type will work. If you need a demo database we recommend [running with docker](https://schwabencode.com/blog/2019/10/27/MSSQL-Server-2017-Docker-Full-Text-Search>)."
%}
