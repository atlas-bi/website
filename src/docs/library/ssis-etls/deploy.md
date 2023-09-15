---
title: Deploy | Learn about how to deploy Atlas Library to your web server
tags: Library
description: Once the ETL performs to your satisfaction in Visual Studio it can be deployed to an SSRS server and scheduled as a job. Open ETL solution (ETL.sln) in Visual Studio. Highlight all the packages to deploy, right click on the ETL > deploy.
keywords: atlas, atlas library, unified report library, data governance, database, etl, deploy, visual studio
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Deploy
  title: Deploy
  parent: BIL SSIS ETLs
  order: 2
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Library
        url: '{{ site.url }}/docs/library/'
        position: 3
      - name: SSIS ETLs
        url: '{{ site.url }}/docs/library/ssis-etls/'
        position: 4
---

# Deploy

Once the ETL performs to your satisfaction in Visual Studio it can be deployed to an SSRS server and scheduled as a job.

- Open ETL solution (ETL.sln) in Visual Studio
- Highlight all the packages to deploy, right click on the ETL > deploy.
  {% image "./src/static/img/library/deploy/packages.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Choose SSIS as the deploy target
  {% image "./src/static/img/library/deploy/target.png", "visual studio deploy", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Enter the destination server name, and path the ETL location. You can create the folder and project.
  {% image "./src/static/img/library/deploy/destination.png", "destination", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/library/deploy/folder.png", "folder", "(min-width:800px) 50vw, 100vw", "boxed" %}
  {% image "./src/static/img/library/deploy/project_name.png", "project", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Click "Deploy"
  {% image "./src/static/img/library/deploy/deploy_button.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Verify "Success"
  {% image "./src/static/img/library/deploy/results.png", "deploy button", "(min-width:800px) 50vw, 100vw", "boxed" %}
