---
title: LDAP User Import | Supplementary ETLs | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library supplementary ETL to gather user profile information. It plugs directly into an LDAP server to get basic user data.
keywords: atlas, atlas bi library, unified report library, data governance, database, ldap, users, user profile, etl
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  parent: BIL Supplementary ETLs
  key: BIL LDAP User Import
  title: LDAP User Import
  order: 1
---

# LDAP User Import

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="svg-inline--fa fa-download fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Download this ETL</strong>
          <br>
          <a href="https://github.com/atlas-bi/LDAP-ETL" rel="noopener" target="blank">https://github.com/atlas-bi/LDAP-ETL</a>
        </p>
      </div>
    </div>
  </article>
</div>

## What it does

This supplementary ETL loads data from an LDAP server into a database that is accessible by the primary [Atlas metadata ETL](/docs/bi-library/etl/).

## Setup

Create a `settings.py` file with the following settings, modified to fit your needs.

```py
server_uri = "ldap.example.net"
username = "MYORG\\my_user"
password = "my_pass"
database = "DRIVER={ODBC Driver 17 for SQL Server};SERVER=server_name;DATABASE=LDAP;UID=user_name;PWD=password"
ad_domain = "MYORG"
dc = "MyOrg"
search_bases = ["EPIC", "Employees", "Doctors", "Non-Staff", "Students", "Volunteers"]

group_search_bases = [
    "Email Distribution Groups",
    "Room & Shared Mailboxes",
    "Access & Permissions",
]
```

Next, create the database and tables using the `LDAPDatabaseCreationScript.sql` provided in the download.

## Usage

The `ldap.py` script can be periodically run to keep you user profiles fresh.

```python
python ldap.py
```

## Other Tools

[Active Directory Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/adexplorer) is a useful tool to browse your LDAP setup to find the correct bases and dc.
