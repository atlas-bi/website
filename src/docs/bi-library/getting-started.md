---
title: Getting Started | Atlas BI Library Docs
tags: BI Library
description: In just a few minutes you can have Atlas BI Library web app running on your computer.
keywords: atlas, atlas bi library, unified report library, data governance, database, webserver, setup, iss, iis setup
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Try Atlas
  title: Getting Started
  parent: BI Library
  order: 3
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

# Getting Started!

In just a few minutes you can have Atlas BI Library web app running on your computer.

## Required Tools

There are a few build tools required to get started. The .Net version of Atlas BI Library is intended to run on Windows PC's that are connected to a domain.

::: content

- [Node.js + NPM](https://nodejs.org/en/download/)
- [Microsoft .NET SDK 6](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Visual Studio Code](https://code.visualstudio.com)
  :::

{% admonition
  "note",
  "Visual Studio Code",
  "Due to version conflicts in Visual Studio, the webapp is now developed in Visual Studio Code, and the ETL developed in Visual Studio 2017. Unfortunately later versions of Visual Studio do not yet include SQL Server Integration Services."
%}

Clone the project form GitHub into a new Visual Studio Code project using the clone url: https://github.com/atlas-bi/atlas-bi-library.git

{% image "./src/static/img/bi-library/getting_started/git_clone.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

Create a file called `web/appsettings.cust.Development.json` with a database connection string. `Localdb` is an easy way to get started. For a production website you should use a database on a real instance of sql server.

```json
{
  "ConnectionStrings": {
    "AtlasDatabase": "Server=(localdb)\\mssqllocaldb;Database=atlas_test;Trusted_Connection=True"
  }
}
```

{% image "./src/static/img/bi-library/getting_started/config.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

Next, install the dependencies. Open a powershell terminal session in VS Code.

```js
npm install
```

{% image "./src/static/img/bi-library/getting_started/npm_install.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

Then, migrate the database. This command will build the application and then create/update the database with all the tables needed. A lot of green and white text will print out... finally telling you "Done."!

```js
npm run db:update
```

{% image "./src/static/img/bi-library/getting_started/db_update.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

Finally, start the website. This command will build all the resources needed to start the site. It will open a browser automatically. After the browser opens give it a few more seconds to finish initializing .Net, then refresh the browser. You will see lot of white and purple text coming from Hangfire and EntityFramework when the app is ready to roll.

```js
npm start
```

{% image "./src/static/img/bi-library/getting_started/npm_start.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

You should see yourself logged in as an admin with a name Guest! Next you can run the ETL's to load in some report data!

{% image "./src/static/img/bi-library/getting_started/running.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% admonition
  "note",
  "Debugging in Visual Studio Code",
  "To monitor breakpoints in VS Code press `f5` to connect to the running site."
%}
