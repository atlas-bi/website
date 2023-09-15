---
title: Dashboard | Learn about the various sections on the Atlas Hub Dashboard.
tags: Hub
description: The dashboard is designed to give an admin a quick overview of the upcoming run schedule, show any failed jobs, and give a listing of what runs are coming up. The run plan shows the upcoming schedule for the next 24 hours.
keywords: atlas, atlas hub, extract scheduler, etl, dashboard
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Dashboard
  title: Dashboard
  parent: Hub
  order: 8
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Docs
        url: '{{ site.url }}/docs/hub/'
        position: 3
---

# Dashboard

The dashboard is designed to give an admin a quick overview of the upcoming run schedule, show any failed jobs, and give a listing of what runs are coming up.

The run plan shows the upcoming schedule for the next 24 hours.

{% image "./src/static/img/hub/dashboard.png", "dashboard", "(min-width:1200px) 50vw, 100vw", "boxed" %}

## Errored Tasks

Any tasks currently in an "errored" state will be listed in this table. It is possible to run all errored tasks at the same time, or run them individually

## Running Tasks

Any task currently in a "running" state will be listed in this table.

## Scheduled Tasks

Any enabled task will be listed in this table.

## Orphaned Job

Any job that is left behind in the scheduler after a task is disabled will show in this table. They should be removed by clicking `Delete All`.
