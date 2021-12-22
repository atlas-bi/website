---
title: Configuration | Atlas BI Library Docs
tags: BI Library
description: Learn about how to configure Atlas BI Library with settings for your organization and install requirements. Configuration is easly done through config files.
keywords: atlas, atlas bi library, unified report library, data governance, database, configuration
layout: docs_library.njk
eleventyNavigation:
  key: BIL Configuration
  title: Configuration
  parent: BIL Deploy
  order: 2
---

# Configuration

Copy the file ``/web/appsettings.json`` to a new file called ``appsettings.cust.json``. This file should be modified to hold your custom settings. The file is excluded from git revision control, so pulling fresh code updates will preserve this file.


Development settings for debugging can also be added. Copy the file ``/web/appsettings.Development.json`` to a new file called ``appsettings.cust.Development.json``.

The available settings are:

```json
{
  "AllowedHosts": "*",
  "AppSettings": {
    "default_from_email_address": "your default sender address for smtp",
    "manage_engine_server": "http://manage engine server for manage engine integration",
    "manage_engine_tech_key": "api key for manage engine",
    "org_ad_domain": "org domain should match the ETl setting for org domain",
    "org_domain": "web domain (example.com)",
    "org_name": "My Organization Name",
    "smtp_port": 465,
    "smtp_server": "your smtp email server",
    "smtp_use_ssl": true
  },
  "ConnectionStrings": {
    "AtlasDatabase": "Server=server_name;Database=atlas;User Id=datagov; Password=<password>; MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "webOptimizer": {
    "enableCaching": true,
    "enableDiskCache": false,
    "enableMemoryCache": true,
    "enableTagHelperBundling": true
  },
  "solr": {
    "atlas_address": "http://localhost:8983/solr/atlas"
  }
}
```
