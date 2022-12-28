---
title: Webserver Setup | Atlas BI Library Docs
tags: BI Library
description: Learn about how to setup a webserver for installing Atlas BI Library. Setup is quick and requirements minimal.
keywords: atlas, atlas bi library, unified report library, data governance, database, webserver, setup, iss, iis setup
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Webserver Setup
  title: Webserver Setup
  parent: BI Library
  order: 5
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

# Webserver Setup

Atlas BI Library is designed to run on **Windows Server 2016 or later**. There are a few installs to get the website running.

## Server Requirements

A single hospital install will generally have <40gb of data. A majority of the data is report usage data. Here is a rule of thumb sizing for a single hospital. You can scale the numbers to your size -

::: content

- Database Server Ram: 40gb
- Database Server Disk Space: 80gb (keep in mind the ETL's use a staging database, so you need effectively 2x the disk space of the prod database.)
- Server cores: 8
  :::

The website server requirements are much less. The website requires <1gb of disk space. On a shared webserver we would recommend 16gb ram and 8 cores.

## Install Requirements

::: content

- IIS Webserver with [Microsoft .NET SDK 7 (Hosting Bundle)](https://dotnet.microsoft.com/download/dotnet/7.0)
  {% image "./src/static/img/bi-library/requirements/dotnetversion.png", "Extension", "(min-width:400px) 50vw, 100vw", "boxed" %}
- Ensure IIS has server roles needed for [web deploy and web management service](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis) installed and started. Microsoft has a few [examples](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/deploying-to-iis).

  - IIS: ASPNET
  - IIS: .NET Extensibility

- By default the Web Deploy seems to not install correctly. `Change` the install in `Control Panel > Programs > Programs and Features` and ensure the package is completely installed.
  {% image "./src/static/img/bi-library/requirements/install_web_deploy.png", "Extension", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Java JRE. You can check your current install by running `java --version` in command prompt. Java can be downloaded [here](https://www.oracle.com/java/technologies/downloads/#jdk17-windows).
  - Add a system environment variable "JAVA_HOME" that points to the install path of java. Most likely something close to `C:\Program Files\Java\jdk-17.0.1`
    :::

After installing the server should be rebooted, or the web services restarted (`Web Deployment Agent Service` and `Web Management Service`).

## Setup IIS

Open the **Internet Information Services (IIS) Manager** on your Windows Server.

First, create a new site by right clicking on **Site** then **Create New Site**.

{% image "./src/static/img/bi-library/deploy/add_website.png", "Add website", "(min-width:800px) 50vw, 100vw", "boxed" %}

Next, fill out the require parameters. If you have setup a DNS you can enter it in the **Host name** box.

{% image "./src/static/img/bi-library/deploy/website_config.png", "Add website configuration", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% admonition
   "alert",
   "Attention",
   "Ideally you will add another binding for https. There are [many tutorials](https://techexpert.tips/iis/enable-https-iis/) showing how to enable HTTPS."
%}

Finally, verify that **windows** authentication is enabled and **all** other methods are disabled.

{% image "./src/static/img/bi-library/deploy/open_auth.png", "Open authentication settings", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/bi-library/deploy/windows_auth.png", "Verify windows authentication", "(min-width:800px) 50vw, 100vw", "boxed" %}
