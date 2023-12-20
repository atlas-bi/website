---
title: Webserver Setup | Learn about how to setup a webserver for installing Atlas Library
tags: Library
description: Atlas Library is designed to run on Windows Server 2016 or later. There are a few installs to get the website running. Setup is quick and requirements minimal. A single hospital install will generally have ~50gb of data. A majority of the data is report usage data. Here is a rule of thumb sizing for a single hospital. You can scale the numbers to your size.
keywords: atlas, atlas library, unified report library, data governance, database, webserver, setup, iss, iis setup
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Webserver Setup
  title: Webserver Setup
  parent: Library
  order: 4
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
---

# Webserver Setup

Atlas Library is designed to run on **Windows Server 2016 or later**. There are a few installs to get the website running.

## Server Requirements

A single hospital install will generally have ~50gb of data. A majority of the data is report usage data. Here is a rule of thumb sizing for a single hospital. You can scale the numbers to your size -

- Database Server Ram: 50gb
- Database Server Disk Space: 120gb (keep in mind the ETL's use a staging database, so you need effectively 2x the disk space of the prod database.)
- Server cores: 8

The website server requirements are much less. The website requires <5gb of disk space. On a shared webserver we would recommend 16gb ram and 8 cores.

## Install Requirements

- IIS Webserver with [Microsoft .NET SDK 8 (Hosting Bundle)](https://dotnet.microsoft.com/download/dotnet/8.0)
  {% image "./src/static/img/library/requirements/dotnetversion.png", "Extension", "(min-width:400px) 50vw, 100vw", "boxed" %}
- Ensure the following tools are installed via `Server Manager` > `Manage` > `Add Roles and Features` > `IIS`:

  - Common HTTP Features
  - Health and Diagnostics
  - Static Content Compression
  - Security
  - .Net Extensibility 4
  - asp.net 4
  - IIS Management Console
  - IIS Management Scripts and Tools
  - Management Services

- Java JRE. You can check your current install by running `java --version` in command prompt. Java can be downloaded [here](https://www.oracle.com/java/technologies/downloads/#jdk17-windows).
  - Add a system environment variable "JAVA_HOME" that points to the install path of java. Most likely something close to `C:\Program Files\Java\jdk-17.0.1`

## Setup IIS

Open the **Internet Information Services (IIS) Manager** on your Windows Server.

First, create a new site by right clicking on **Site** then **Create New Site**.

{% image "./src/static/img/library/deploy/add_website.png", "Add website", "(min-width:800px) 50vw, 100vw", "boxed" %}

Next, fill out the require parameters. If you have setup a DNS you can enter it in the **Host name** box.

{% image "./src/static/img/library/deploy/website_config.png", "Add website configuration", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% admonition
   "alert",
   "Attention",
   "Ideally you will add another binding for https. There are [many tutorials](https://techexpert.tips/iis/enable-https-iis/) showing how to enable HTTPS."
%}

Finally, verify that **windows** authentication is enabled and **all** other methods are disabled.

{% image "./src/static/img/library/deploy/open_auth.png", "Open authentication settings", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/library/deploy/windows_auth.png", "Verify windows authentication", "(min-width:800px) 50vw, 100vw", "boxed" %}
