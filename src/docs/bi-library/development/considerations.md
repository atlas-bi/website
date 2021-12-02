---
title: Atlas BI Library Docs » Development » Special Considerations
tags: BI Library
description: Special considerations when contributing to the Atlas BI Library development.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Special Considerations
  title: Special Considerations
  parent: BIL Development
  order: 3
---

# Special Considerations

## Database Information

The app is currently using a SQL Server database, with a "database first" model.

The database can be created by running the script "Data Governance WebaApp/DatabaseCreationScript.sql".

Any changes to the base tables must be done in the database first, then pulled into the webapp with the scaffold command.

```bash
Scaffold-DbContext "Server=my_server;Database=atlas;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force -Context Atlas_WebContext -Namespace Atlas_Web.Models
```

The file `webapp/atlas-creation-script.sql` must be updated after making database changes. This can be done in SSMS by right clicking the db > clicking tasks > script database. 

Calculated fields can be added as a customization in the `model/customizations/` folder.

## Hyperspace Integration

Linking to Atlas from a Dashboard

::: content
1. Create a link component
2. Select a source of Component Editor
3. Select an Activity type link
4. Give your link a label
5. In the parameters, list the Atlas activity, and then runparams:<URL of the content> (like below)
:::

```
ATLAS_WEBSITE,RunParams:https://my_host.net/Reports?id=73740
```

## Adding Banner Messages

Add a global site paramter in the webapp `settings` > `global settings`.
Name: `msg`
Description: `<Message Text>`
Value: `<id used to show message>`

Show message by adding the message ID to the url:

www.atlas.com?msg=1

To have a site wide message that does not require a URL param, leave the ``Value`` box blank when creating the param.
