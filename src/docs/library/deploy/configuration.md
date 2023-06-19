---
title: Configuration
tags: Library
description: Learn about how to configure Atlas Library with settings for your organization and install requirements. Configuration is easly done through config files.
keywords: atlas, atlas library, unified report library, data governance, database, configuration
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Configuration
  title: Configuration
  parent: BIL Deploy
  order: 2
---

# Configuration

Copy the file `/web/appsettings.json` to a new file called `appsettings.cust.json`. This file should be modified to hold your custom settings. The file is excluded from git revision control, so pulling fresh code updates will preserve this file.

Development settings for debugging can also be added. Copy the file `/web/appsettings.Development.json` to a new file called `appsettings.cust.Development.json`.

The available settings are:

```json
{
  "AllowedHosts": "*",
  "AppSettings": {
    "base_url": "https://atlas.example.org",
    "manage_engine_server": "http://manage engine server for manage engine integration",
    "manage_engine_tech_key": "api key for manage engine",
    "org_ad_domain": "org domain should match the ETl setting for org domain",
    "org_domain": "web domain (example.com)",
    "org_name": "My Organization Name",
    "smtp_port": 465,
    "smtp_server": "your smtp email server",
    "smtp_use_ssl": true,
    "smtp_sender_email": "atlas@example.com",
    "smtp_sender_name": "Atlas | Example Healthcare Analytics",
    "smtp_username": "this is an option value, only use if your smtp requires auth.",
    "smtp_password": "this is an option value, only use if your smtp requires auth."
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
    "atlas_address": "http://localhost:8983/solr/atlas",
    "atlas_lookup_address": "http://localhost:8983/solr/atlas_lookups"
  },
  "logo": "path/to/override_logo.png",
  "features": {
    "enable_initiatives": true,
    "enable_request_access": true,
    "enable_sharing": true,
    "enable_terms": true,
    "enable_user_profile": true,
    "enable_breadcrumbs": true
  },
  "text": {
    "reports": {
      "external_link": "GitLab Project Link"
    }
  },
  "footer": {
    "links": {
      "Group One": {
        "Something": "https://something",
        "Something Else": "https://soemthingelse"
      },
      "Group One": {
        "Something": "https://something",
        "Something Else": "https://soemthingelse"
      }
    }
  }
}
```