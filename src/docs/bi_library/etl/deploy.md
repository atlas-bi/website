---
title: ETL Deploy
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Deploy
  title: Deploy
  parent: BIL ETL
  order: 3
---

# Deploy


Once the ETL performs to your satisfaction in Visual Studio it can be deployed to an SSRS server and scheduled as a job.

::: content
- Open ETL solution (ETL.sln) in Visual Studio
- Highlight all the packages you want to deploy and right click on the ETL > deploy.
  {% image "./src/static/img/bi_library/deploy/packages.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Choose SSIS as the deploy target
  {% image "./src/static/img/bi_library/deploy/target.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Enter the destination server name, and path the ETL location. You can create the folder and project.
  {% image "./src/static/img/bi_library/deploy/destination.png", "destination", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi_library/deploy/folder.png", "folder", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/bi_library/deploy/project_name.png", "project", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Click "Deploy"
  {% image "./src/static/img/bi_library/deploy/deploy_button.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Verify "Success"
  {% image "./src/static/img/bi_library/deploy/results.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
:::
