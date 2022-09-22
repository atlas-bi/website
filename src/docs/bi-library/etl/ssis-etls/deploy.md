---
title: Deploy | ETL | Atlas BI Library Docs
tags: BI Library
description: Learn about how to deploy Atlas BI Library to your web server from Visual Studio.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, deploy, visual studio
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
      - name: BI Library
        url: '{{ site.url }}/docs/bi-library/'
        position: 3
      - name: ETL Setup
        url: '{{ site.url }}/docs/bi-library/etl/'
        position: 4
      - name: SSIS ETLs
        url: '{{ site.url }}/docs/bi-library/etl/ssis-etls/'
        position: 5
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
