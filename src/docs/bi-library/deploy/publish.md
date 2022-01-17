---
title: Publish | Deploy | Atlas BI Library Docs
tags: BI Library
description: Learn about how to deploy Atlas BI Library onto your web server. Atlas BI Library runs on .NET 5 and is easily deployed from Visual Studio.
keywords: atlas, atlas bi library, unified report library, data governance, database, publishing, iis, deploy, visual studio
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Publish
  title: Publish
  parent: BIL Deploy
  order: 3
---

# Publish

{% admonition
   "alert",
   "Attention",
   "Ensure that the destination server has the same .NET *version* `Hosting Bundle`."
%}

{% admonition
   "note",
   "Note",
   "This guide assumes you have already created the Atlas Databases, run the ETL to populate the database, and added your database connection as specified in the [`configuration guide`](/docs/bi-library/deploy/configuration/)"
%}

## Deploy to IIS

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="vs">Deploy With Visual Studio</a></li>
    <li><a tab="manual">Manual or CI/CD Deploy</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab is-active"id="vs">

Deploying with Visual Studio is the preferred method. After opening the `web.sln` file -

::: content

- In Visual Studio's menu, click **Build** then **Publish Web**
- Create a new publish profile.
  - Choose **Web Server (IIS)** as the **Target**
  - Choose **Web Deploy** as the **Specific target**
  - Enter your IIS **Server** name
  - Enter your **Site name**. This must match the site name already created on the web server (`atlas-dev`)
  - Enter the web url in **Destination URL**
  - Optionally enter you credentials for the web server
- After the profile is created click **Edit** to change additional settings.
- Change to the **Settings** tab and change the **Target Runtime** to match the web servers .NET bitness.
  {% image "./src/static/img/bi-library/deploy/vs_profile.png", "Edit publish profile", "(min-width:800px) 50vw, 100vw", "boxed" %}
- In order to successfully publish the connection must be validated to allow self-signed certificates.
  {% image "./src/static/img/bi-library/deploy/vs_connection.png", "Validate connection", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi-library/development/ssl_warning.png", "ssl warning", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi-library/development/ssl_confirm.png", "ssl confirm", "(min-width:800px) 50vw, 100vw", "boxed" %}
  :::

{% admonition
  "alert",
  "Attention",
  "The connection must be re-verified every time Visual Studio is restarted."
%}

::: content

- Finally publish Atlas by clicking **Publish** button.
  {% image "./src/static/img/bi-library/deploy/vs_publish.png", "Publish Atlas", "(min-width:800px) 50vw, 100vw", "boxed" %}
  :::

If Visual Studio still cannot resolve the certificate issue, you can disable the check in the publish settings XML file.
{% image "./src/static/img/bi-library/deploy/cert_error.png", "disable cert", "(min-width:800px) 50vw, 100vw", "boxed" %}

</div>
   <div class="tab" id="manual">

Atlas is also fairly simple to manually deploy.

{% admonition "alert", "Attention", "Ensure the bitness matches the bitness of the .NET version you've installed on the server!" %}

::: content

- Run dotnet publish from the `web` folder to build the Atlas runtime.
  ```bash
  dotnet publish -r win-x86 --self-contained false -c Release -o out
  ```
- Copy the contents of the newly created `out` directory into the `c://inetpub/wwwroot/atlas-dev` folder.
  :::

**Navigate to your binding and Atlas should be available!**

</div>
</div>

## Starting Solr Search

After publishing for the first time you will need to start Solr. This is done in command prompt. Navigate to the published site, then `/solr/bin` folder and running `solr start -p 8983`. The output will let you know Solr has started on port 8983.

{% image "./src/static/img/bi-library/search/start_solr.png", "start solr", "(min-width:800px) 50vw, 100vw", "boxed" %}

You will be able to access Solr externally for testing at `https://server_name:8983`.

### Auto Start Solr

If your server reboots you would like Solr to automatically start. There are several tools you can use to auto start commands. One option is to use windows task scheduler.

Create a new folder for `atlas` tasks, and then add a new task.

{% image "./src/static/img/bi-library/search/create_task.png", "create task", "(min-width:800px) 50vw, 100vw", "boxed" %}

Set the trigger, action and then test.

{% image "./src/static/img/bi-library/search/create_trigger.png", "create trigger", "(min-width:800px) 50vw, 100vw", "boxed" %}
{% image "./src/static/img/bi-library/search/create_action.png", "create action", "(min-width:800px) 50vw, 100vw", "boxed" %}

Ensure that you do not need to be logged in to run the task.
{% image "./src/static/img/bi-library/search/not_logged_in.png", "no login needed", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% image "./src/static/img/bi-library/search/test_task.png", "test task", "(min-width:800px) 50vw, 100vw", "boxed" %}

## Notes

1. Stop Solr in command prompt by navigating to the `/bin` folder and running `solr stop -p 8983`.
2. When publishing the website again, you may need to stop solr before publishing.
