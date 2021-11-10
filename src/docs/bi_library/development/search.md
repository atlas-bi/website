---
title: Solr Search
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Solr Search
  title: Solr Search
  parent: BIL Development
  order: 2
---

# Solr Search

## Install

1. Install Java JRE on the web server. You can check your current install by running ``java --version`` in command prompt. Java can be downloaded [here](https://www.oracle.com/java/technologies/downloads/#jdk17-windows).
2. Add a system environment variable "JAVA_HOME" that points to the install path of java. Most likely something close to `C:\Program Files\Java\jdk-17.0.1`
3. [Download Solr](https://solr.apache.org/downloads.html) as a `zip` folder. Extract into your `inetpub/wwwroot` as `atlas-search`.
4. Start Solr in command prompt by navigating to the `/bin` folder and running `solr start`. The output will let you know Solr has started on port 8983.

{% image "./src/static/img/bi_library/search/start_solr.png", "start solr", "(min-width:800px) 50vw, 100vw", "boxed" %}

## Setup

1. Start Solr if it is not running.
2. Create the Atlas search core running `solr create -c atlas -p 8983` from the `/bin` folder.
3. Create the Atlas-lookups search core running `solr create -c atlas_lookups -p 8983` from the `/bin` folder.

### Configure
In your file explorer, you will see a new folder called `atlas` inside the `server/solr` folder. Navigate to `server/solr/atlas/conf` folder.

{% image "./src/static/img/bi_library/search/file_structure.png", "file structure", "(min-width:800px) 50vw, 100vw", "boxed" %}

1. Copy the three configuration files from the atlas source code folder `solr/atlas/` into the `server/solr/atlas/conf` folder, replacing the three default files.
2. Copy the three configuration files from the atlas source code folder `solr/atlas_lokups/` into the `server/solr/atlas_lookups/conf` folder, replacing the three default files.
3. Restart Solr by running `solr restart -p 8983`
4. Navigate to `http://localhost:8983/` and ensure the `Atlas` and `Atlas Lookups` cores is in the core list.

{% image "./src/static/img/bi_library/search/dashboard.png", "dashboard", "(min-width:800px) 50vw, 100vw", "boxed" %}

You will be able to access Solr externally by ``https://server_name:8983``.

### Auto Start Solr

If your server reboots you would like Solr to automatically start. There are several tools you can use to auto start commands. One option is to use windows task scheduler.

Create a new folder for `atlas` tasks, and then add a new task.

{% image "./src/static/img/bi_library/search/create_task.png", "create task", "(min-width:800px) 50vw, 100vw", "boxed" %}

Set the trigger, action and then test.

{% image "./src/static/img/bi_library/search/create_trigger.png", "create trigger", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/bi_library/search/create_action.png", "create action", "(min-width:800px) 50vw, 100vw", "boxed" %}

Ensure that you do not need to be logged in to run the task.
{% image "./src/static/img/bi_library/search/not_logged_in.png", "no login needed", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% image "./src/static/img/bi_library/search/test_task.png", "test task", "(min-width:800px) 50vw, 100vw", "boxed" %}



## Notes

1. Stop Solr in command prompt by navigating to the `/bin` folder and running `solr stop -p 8983`.
