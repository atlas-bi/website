---
title: ETL Install
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Install
  parent: ETL
---

# How to Install


## Create Databases


There are two databases used -

::: content
- ``atlas-staging`` used to prepare raw data and insert it into several staging tables.
- ``atlas`` is the destination database used by the webapp.
:::

The databases can be created by running the two database creation scripts:

::: content
- ``atlas_staging-creation_script.sql``
- [``atlas-creation_script.sql`` (kept in the Atlas repo)](https://github.com/Riverside-Healthcare/Atlas/blob/master/web/atlas-creation_script.sql).)
:::


## Create Database Users

There are two user accounts needed to make the ETL's work.

::: content
1. A domain account with read access to all source databases, and write access to the staging database.
2. A local SSRS account with full access to the two databases.
:::

### SSRS User


The SSRS user is created at the server level. Once created, they can be added to the databases.

The account should have reader, writer, admin and owner memberships to the two databases.

<div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/install/add_user.png", "add user", "(min-width:800px) 50vw, 100vw" %}
</div>
<div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/install/user.png", "create user", "(min-width:800px) 50vw, 100vw" %}
</div>
<div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/install/user_cred.png", "user credentials", "(min-width:800px) 50vw, 100vw" %}
</div>
<div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/install/user_membership.png", "user membership", "(min-width:800px) 50vw, 100vw" %}
</div>

## Set ETL Parameters

The ETL connection are kept in the **Connection Manager** and **Parameters**. Update the placeholder connection to valid credentials.

The default ETL uses sources of

::: content
- Tableau (see [tableau install guide](https://github.com/Riverside-Healthcare/Tableau-Metadata-Exporter).)
- Crystal (see [crystal install guide](https://github.com/Riverside-Healthcare/Sqlize-Crystal-Reports).)
- Two SSRS Report Servers
- Clarity
- LDAP Users (see :doc:`LDAP install guide <./ldap>`.)
:::

If any of these are not needed, delete them from the ETL.

{% admonition
   "note",
   "Note",
   "The same steps can be followed to the Run Data ETL."
%}
