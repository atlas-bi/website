---
title: Requirements
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Requirements
  parent: BI Library
  order: 4
---

# Requirements

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="deploy">Deploy</a></li>
    <li><a tab="develop">Develop</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab is-active"id="deploy">
   
There are minimal requirements to get Atlas running on your servers.

::: content
- An install of SQL Server Database 2016+ with [Full Text Index](https://codingsight.com/implementing-full-text-search-in-sql-server-2016-for-beginners/)
- IIS Webserver with [Microsoft .NET SDK 5 (Hosting Bundle)](https://dotnet.microsoft.com/download/dotnet/5.0)
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/dotnetversion.png", "Extension", "(min-width:800px) 50vw, 100vw" %}
  </div>
:::

{% admonition
   "note",
   "SQL Server",
   "Any SQL Server license type will work. If you need a demo database we recommend [running with docker](https://schwabencode.com/blog/2019/10/27/MSSQL-Server-2017-Docker-Full-Text-Search>)." %}

{% admonition
   "note",
   "Web Server",
   "While Atlas will run on any OS that has **.Net 5** installed (check out our [Ubuntu docker file](https://github.com/Riverside-Healthcare/Atlas-of-Information-Management/blob/master/Dockerfile>)!), Atlas authentication uses IIS Windows Authentication.
Also, using Windows Server 2019 has HTTP2, which allows greater site speed.

**If publishing from Visual Studio..**

Ensure IIS has server roles needed for [web deploy and web management service](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis) installed and started. Microsoft has a few [examples](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis).

By default the Web Deploy will not install correctly. Change the install in `Control Panel / Programs / Programs and Features` and ensure the package is completely installed.

.. figure:: ../images/requirements/install_web_deploy.png
   :alt: Web Deploy

Then, restart/start services `Web Deployment Agent Service` and `Web Management Service`."
%}

{% admonition
   "hint",
   "Deploy Atlas",
   "Atlas can be deployed without Visual Studio. We recommend deploying with Visual Studio for ease of use. See the :doc:`deploy guide <deploy>`."
%}

  
{% admonition
   "alert",
   ".NET 5",
   "While .NET 5 x86 is specified, it is not required. The only *requirement* is that Atlas is *built* and *run* in the same version and bitness."
%}

</div>
   <div class="tab" id="develop">

Doing development on Atlas is fairly simple. The Web App is developed using [Visual Studio 2017+](https://visualstudio.microsoft.com/downloads/). Testing is done with Python + Selenium.

Visual Studio Requirements

::: content
- Full install of [Visual Studio 2017+](https://visualstudio.microsoft.com/downloads/)
- Visual Studio's ``SQL Server Integration Services Projects`` extension
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/vs_extension.png", "Extension", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``ASP.NET and web development`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/dotnet.png", "asp.net component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``Data Storage and Processing`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/sqlservices.png", "sql services component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``Razor Language Services`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/razor.png", "razor component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- [Python 3.7+](https://www.python.org/downloads/) 
- [Microsoft .NET SDK 5.0.103 (x86)](https://dotnet.microsoft.com/download/dotnet/5.0)
:::

   </div>

</div>
