---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Deploy
  parent: BI Library
  order: 5
---

# Deploy

{% admonition 
   "alert",
   "Attention",
   "Ensure that the destination server has the same .NET *version* `Hosting Bundle`."
%}

{% admonition 
   "note",
   "Note",
   "This guide assumes you have already created the Atlas Databases and run the ETL."
%}

## Setup IIS

Open the **Internet Information Services (IIS) Manager** on your Windows Server.

First, create a new site by right clicking on **Site** then **Create New Site**.

<div class="box is-flex is-justify-content-center tile">
{% image "./src/static/img/bi_library/deploy/add_website.png", "Add website", "(min-width:800px) 50vw, 100vw" %}
</div>

Next, fill out the require parameters. If you have setup a DNS you can enter it in the **Host name** box.

<div class="box is-flex is-justify-content-center tile">
{% image "./src/static/img/bi_library/deploy/website_config.png", "Add website configuration", "(min-width:800px) 50vw, 100vw" %}
</div>

{% admonition 
   "alert",
   "Attention",
   "Ideally you will add another binding for https. There are [many tutorials](https://techexpert.tips/iis/enable-https-iis/) showing how to enable HTTPS."
%}

Finally, verify that **windows** authentication is enabled.

<div class="columns">
    <div class="box is-flex is-justify-content-center column">
        {% image "./src/static/img/bi_library/deploy/open_auth.png", "Open authentication settings", "(min-width:800px) 50vw, 100vw" %}
    </div>
    <div class="box is-flex is-justify-content-center column">
        {% image "./src/static/img/bi_library/deploy/windows_auth.png", "Verify windows authentication", "(min-width:800px) 50vw, 100vw" %}
    </div>
</div>

## Deploy to IIS

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="vs">Deploy With Visual Studio</a></li>
    <li><a tab="manual">Manually Deploy</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab is-active"id="vs">


Deploying with Visual Studio is the preferred method. After opening the ``web.sln`` file -

::: content
- First update ``web/appsettings.json`` with the correct settings for your database and organization.
- In Visual Studio's menu, click **Build** then **Publish Web**
- Create a new publish profile.
   - Choose **Web Server (IIS)** as the **Target**
   - Choose **Web Deploy** as the **Specific target**
   - Enter your IIS **Server** name
   - Enter your **Site name**. This must match the site name already created on the web server (``atlas-dev``)
   - Enter the web url in **Destination URL**
   - Optionally enter you credentials for the web server
- After the profile is created click **Edit** to change additional settings.
- Change to the **Settings** tab and change the **Target Runtime** to match the web servers .NET bitness.
  <div class="box is-flex is-justify-content-center tile">
      {% image "./src/static/img/bi_library/deploy/vs_profile.png", "Edit publish profile", "(min-width:800px) 50vw, 100vw" %}
  </div>
- In order to successfully publish the connection must be validated to allow self-signed certificates.
  <div class="box is-flex is-justify-content-center tile">
      {% image "./src/static/img/bi_library/deploy/vs_connection.png", "Validate connection", "(min-width:800px) 50vw, 100vw" %}
  </div>
  <div class="box is-flex is-justify-content-center tile">
      {% image "./src/static/img/bi_library/development/ssl_warning.png", "ssl warning", "(min-width:800px) 50vw, 100vw" %}
  </div>
  <div class="box is-flex is-justify-content-center tile">
      {% image "./src/static/img/bi_library/development/ssl_confirm.png", "ssl confirm", "(min-width:800px) 50vw, 100vw" %}
  </div>
:::

{% admonition
  "alert",
  "Attention",
  "The connection must be re-verified every time Visual Studio is restarted."
%}

::: content
- Finally publish Atlas by clicking **Publish** button.
  <div class="box is-flex is-justify-content-center tile">
      {% image "./src/static/img/bi_library/deploy/vs_publish.png", "Publish Atlas", "(min-width:800px) 50vw, 100vw" %}
  </div>
:::

</div>
   <div class="tab" id="manual">

Atlas is fairly simple to manually deploy.

::: content
- First pull Atlas's source code onto the server
- Update ``web/appsettings.json`` with the correct settings for your database and organization.
- Run dotnet publish from the ``web`` folder to build the Atlas runtime.
  ```bash
  dotnet publish -r win-x86 --self-contained false -c Release -o out
  ```
:::

{% admonition
"alert",
"Attention",
"Ensure the bitness matches the bitness of the .NET version you've installed on the server!"
%}

::: content
- Copy the contents of the newly created ``out`` directory into the ``c://inetpub/wwwroot/atlas-dev`` folder.
:::

**Navigate to your binding and Atlas should be available!**
</div>
</div>
