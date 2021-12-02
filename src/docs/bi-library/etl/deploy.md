---
title: Atlas BI Library Docs » ETL » Deploy
tags: BI Library
description: Learn about how to deploy Atlas BI Library to your web server from Visual Studio.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Deploy
  title: Deploy
  parent: BIL ETL Setup
  order: 2
---

# Deploy


Once the ETL performs to your satisfaction in Visual Studio it can be deployed to an SSRS server and scheduled as a job.

::: content
- Open ETL solution (ETL.sln) in Visual Studio
- Highlight all the packages to deploy, right click on the ETL > deploy.
  {% image "./src/static/img/bi-library/deploy/packages.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Choose SSIS as the deploy target
  {% image "./src/static/img/bi-library/deploy/target.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Enter the destination server name, and path the ETL location. You can create the folder and project.
  {% image "./src/static/img/bi-library/deploy/destination.png", "destination", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi-library/deploy/folder.png", "folder", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi-library/deploy/project_name.png", "project", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Click "Deploy"
  {% image "./src/static/img/bi-library/deploy/deploy_button.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Verify "Success"
  {% image "./src/static/img/bi-library/deploy/results.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
:::
