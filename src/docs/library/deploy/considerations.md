---
title: Special Considerations | Special considerations when using the Atlas Library development.
tags: Library
description: Hyperspace Integration. Linking to Atlas from a Dashboard. Addition integration guides are included in the Clarity ETL which can be downloaded from the data handbook. Adding Banner Messages. Adding Site Title for Dev Environments.
keywords: atlas, atlas library, unified report library, data governance, database, considerations, using the library
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Special Considerations
  title: Special Considerations
  parent: BIL Deploy
  order: 5
---

# Special Considerations

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
ATLAS_WEBSITE,RunParams:https://my_host.net/Reports?id=73740&EPIC=1
```

Addition integration guides are included in the Clarity ETL which can be downloaded from the [data handbook](https://datahandbook.epic.com/Reports/Details/9000648).

## Adding Banner Messages

Add a global site paramter in the webapp `settings` > `global settings`.
Name: `msg`
Description: `<Message Text>`
Value: `<id used to show message>`

Show message by adding the message ID to the url:

www.atlas.com?msg=1

To have a site wide message that does not require a URL param, leave the `Value` box blank when creating the param.

## Adding Site Title for Dev Environments

A json key can be added to the development config file with some text to display across the top of the website.

```json
  "banner_text": {
    "site_message": "Atlas Dev"
  },
```
