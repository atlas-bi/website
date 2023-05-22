---
title: Starting Search
tags: BI Library
description: Learn about how to start Atlas BI Library search after deploying onto your web server. Atlas BI Library runs on .NET 5 and is easily deployed from Visual Studio.
keywords: atlas, atlas bi library, unified report library, data governance, database, publishing, iis, deploy, visual studio, solr, search
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Starting Search
  title: Starting Search
  parent: BIL Deploy
  order: 4
---

# Starting Solr Search

## Testing

After publishing for the first time you will need to start Solr. This is done in command prompt. Navigate to the published site, then `/solr/bin` folder and running `solr start -p 8983`. The output will let you know Solr has started on port 8983.

{% image "./src/static/img/library/search/start_solr.png", "start solr", "(min-width:800px) 50vw, 100vw", "boxed" %}

You will be able to access Solr externally for testing at `https://server_name:8983`.

    To stop Solr in command prompt by navigating to the `/bin` folder and running `solr stop -p 8983`.

### Solr As A Service

Solr should be registered as a windows service in order to keep solr running after you log off the server.

We use a tool called NSSM that allows us to run `.cmd` as a service on the server.

Downloads [NSSM prelease build 2.24-101](http://nssm.cc/download), or the correct version for your server. Unzip the file and add the 64 or 32 folder to your system path.

After adding NSSM to your path you can add a service by

```bash
nssm install atlas-search
```

Add the path to your Atlas install. Add in the start up params. Be sure to include the `-f` flag to run solr in the foreground. This will let windows services cleanly stop/restart the service.

{% image "./src/static/img/library/search/nssm-config.png", "create task", "(min-width:800px) 50vw, 100vw", "boxed" %}

Finally, you can start the service from the windows services manager.

{% image "./src/static/img/library/search/services.png", "create trigger", "(min-width:800px) 50vw, 100vw", "boxed" %}

The nssm service can easily be edited with `nssm edit atlas-search`.

    When publishing the website again, you may need to stop solr before publishing.
