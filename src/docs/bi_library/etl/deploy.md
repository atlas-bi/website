---
title: ETL Deploy
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Deploy
  parent: ETL
---

# Deploy


Once the ETL performs to your satisfaction in Visual Studio it can be deployed to an SSRS server and scheduled as a job.

::: content
- Open ETL solution (ETL.sln) in Visual Studio
- Highlight all the packages you want to deploy and right click on the ETL > deploy.
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/packages.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw" %}
  </div>
- Choose SSIS as the deploy target
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/target.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw" %}
  </div>
- Enter the destination server name, and path the ETL location. You can create the folder and project.
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/destination.png", "destination", "(min-width:800px) 50vw, 100vw" %}
  </div>
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/folder.png", "folder", "(min-width:800px) 50vw, 100vw" %}
  </div>
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/project_name.png", "project", "(min-width:800px) 50vw, 100vw" %}
  </div>
- Click "Deploy"
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/deploy_button.png", "deploy button", "(min-width:800px) 50vw, 100vw" %}
  </div>
- Verify "Success"
  <div class="box is-flex is-justify-content-center">
    {% image "./src/static/img/bi_library/deploy/results.png", "deploy button", "(min-width:800px) 50vw, 100vw" %}
  </div>
:::
