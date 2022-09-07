---
title: Publish | Deploy | Atlas BI Library Docs
tags: BI Library
description: Learn about how to deploy Atlas BI Library onto your web server. Atlas BI Library runs on .NET 5 and is easily deployed from Visual Studio.
keywords: atlas, atlas bi library, unified report library, data governance, database, publishing, iis, deploy, visual studio
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Publish
  title: Publish
  parent: BIL Deploy
  order: 3
---

# Publish

{% admonition
   "alert",
   "Attention",
   "Ensure that the destination server has the same .NET *version* `Hosting Bundle`."
%}

{% admonition
   "note",
   "Note",
   "This guide assumes you have already created the Atlas Databases, run the ETL to populate the database, and added your database connection as specified in the [`configuration guide`](/docs/bi-library/deploy/configuration/)"
%}

## Deploy to IIS

Deploying the build of Atlas from your `/out` directory is simple. If you are doing an update or redeploying, a few services should be stopped before copying in the new build.

First, stop solr search engine.

In window services, find and stop "solr", or use this command in your cmd terminal.

```bash
net stop solr
```

Next, stop the Atlas website in IIS, or use this command in your cmd terminal.

```bash
Powershell.exe -Command "Stop-Website -Name atlas"
```

Then stop the Atlas pool in IIS, or use this command in your cmd terminal.

```bash
Powershell.exe -Command "Stop-WebAppPool -Name atlas"
```

Now, copy the contents of the `/out` folder onto the atlas website folder (probably `C:\inetpub\wwwroot\atlas`) on your server.

Turn all the services on in reverse order that you used in turning them off.

```bash
Powershell.exe -Command "Start-WebAppPool -Name atlas"
Powershell.exe -Command "Start-Website -Name atlas"
net start solr
```

{% admonition
   "note",
   "Note",
   "It is possible your app pool and website will have a different name than give here. Check your IIS Manager to see the exact names to use in your case."
%}
