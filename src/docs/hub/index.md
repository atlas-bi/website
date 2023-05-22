---
title: Welcome
tags: Hub
description: Welcome to the Atlas Hub documentation. Here you'll learn about how to install, configure and update the app.
keywords: atlas, atlas hub, extract scheduler, etl, documentation, install, configure, update
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: Hub
  parent: Docs
  order: 1
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
---

# Welcome

Atlas Automation Hub is a task scheduling tool. It is designed to simplify routine data extraction and sending.

The tool easily connects to databases, SFTP, FTP, SMB and SSH servers and GIT servers/web URL's, to pull data, run queries, and load data back.

A few handy features -

:::content

- Fully parameterized
- Supports SSH key connections
- Supports GPG encryption
- Supports ZIP archives
- Capable of moving batches of files with wildcard matching
- Easily run a group of jobs in a sequence, or parallel
- Powerful scheduler options
- Fully searchable
- Easy to use interface
- Email integration
- Multiple authentication options - SAML2, LDAP, or local
- Complete logging
- Middle man processing scripts can modify data before loading
  :::

## How Does it Work?

Atlas Automation Hub is a collection of three webapps, running with Nginx and Gunicorn.

:::content

- user interface (website)
- scheduler (API)
- job runner (API)
  :::

The schedule and runner webapps are both API's, designed to only be accessed internally by the website. The scheduler is a single worker process that keeps a schedule of all the tasks. When it is time for a task to run, the scheduler sends a request to the job runner to begin an execution.

When a task is run, data is generally "collected" into a "normalized" file. Various task parameters are used to build this file. The file can then be passed into a "processing script" to do any data modifications, calculations, etc.

Finally, the final output file is created, using various parameters, and then loaded to the final destinations.

## Project and Task Structure

A [project](/docs/hub/projects/) is the place the run schedule is stored. A project is a group of tasks that should run at the same time - either in parallel or series.

A [task](/docs/hub/tasks/) is a job of getting/storing data. Tasks are independent of each other, unless they are run in series - then the success or failure of a task determine weather the successors will run.

Tasks can be individually enabled or disabled.
