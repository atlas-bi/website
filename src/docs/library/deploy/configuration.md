---
title: Configuration | Configuring the Atlas Library web application
tags: Library
description: Learn about how to configure Atlas Library with settings for your organization and install requirements. Configuration is easly done through config files. Set custom logo, mail server, and enabled/disable app features.
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

The available settings are as follows. Remove comments when you create your configuration.

```json
{
  "AllowedHosts": "*",
  "AppSettings": {
    "base_url": "https://atlas.example.org",

    // Optional config for Manage Engine ticket system integration
    "manage_engine_server": "http://manage engine server for manage engine integration",
    "manage_engine_tech_key": "api key for manage engine",

    "org_ad_domain": "org domain should match the ETl setting for org domain",
    "org_domain": "web domain (example.com)",
    "org_name": "My Organization Name",

    // Outgoing email settings for share notifications
    "smtp_port": 465,
    "smtp_server": "your smtp email server",
    "smtp_use_ssl": true,
    "smtp_sender_email": "atlas@example.com",
    "smtp_sender_name": "Atlas | Example Healthcare Analytics",
    "smtp_username": "this is an option value, only use if your smtp requires auth.",
    "smtp_password": "this is an option value, only use if your smtp requires auth."
  },

  // Connection string. Newer sql tools will required the ";TrustServerCertificate=Yes" param.
  "ConnectionStrings": {
    "AtlasDatabase": "Server=server_name;Database=atlas;User Id=datagov; Password=<password>; MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },

  // Configuration for static files (css/js). No changes needed.
  "webOptimizer": {
    "enableCaching": true,
    "enableDiskCache": false,
    "enableMemoryCache": true,
    "enableTagHelperBundling": true
  },

  // URL's for solr. If you followed the default install guide no change is needed.
  "solr": {
    "atlas_address": "http://localhost:8983/solr/atlas",
    "atlas_lookup_address": "http://localhost:8983/solr/atlas_lookups"
  },

  // Optional path to a custom logo.
  "logo": "path/to/override_logo.png",

  // Enable or disable portions of the app.
  "features": {
    "enable_initiatives": true,
    "enable_request_access": true,
    "enable_sharing": true,
    "enable_terms": true,
    "enable_user_profile": true,
    "enable_breadcrumbs": true
  },

  // Optional custom text for the report documentation external link field
  "text": {
    "reports": {
      "external_link": "GitLab Project Link"
    }
  },

  // Optional custom links in the navbar dropdown menu
  "nav": {
    "links": {
      "Docs": "https://somewhere"
    }
  },

  // Optional custom link groups in the website footer
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

## Authentication

By default Atlas Library will use windows authentication from IIS. If you prefer, SAMl is a available with the following configuration options. Adding the configuration will automatically enable SAML.

```json
"Saml2": {
  "IdPMetadata": "http://localhost:7000/metadata",
  "Issuer": "atlas-library",
  "SignatureAlgorithm": "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
  "SigningCertificateFile": "C:\\user\\me\\Documents\\projects\\atlas\\idp\\idp.pfx",
  "SigningCertificatePassword": "password",
  "SignatureValidationCertificateFile": "C:\\Users\\me\\Documents\\projects\\atlas\\idp\\idp.pfx",
  "CertificateValidationMode": "None", // "ChainTrust"
  "RevocationMode": "NoCheck"
}
```

SAML endpoints will be available:

- `Metadata` > this url can be given to the IDP.
- `/Auth/Login` > Unauthenticated users will automatically be directed to this page.
- `/Logout` > Url can be called to end the SAML session if needed.
- `/Auth/Asc` > Callback url for the IPD
