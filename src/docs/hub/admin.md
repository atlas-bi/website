---
title: Admin | Learn about how to use the controls on the Atlas Hub Admin page.
tags: Hub
description: Reset all tasks to completed, Reschedule Enabled Jobs, Pause All Jobs, Resume Enabled Jobs, Kill Scheduler
keywords: atlas, atlas hub, extract scheduler, etl, usage, admin
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Admin
  title: Admin
  parent: Hub
  order: 12
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

# Admin

## App Tasks

An admin can

:::content

- Reset all tasks to completed. This is useful after publishing a website update and the admin would like to clear all errored tasks.
- Reschedule Enabled Jobs. This option will empty the scheduler and then reschedule any enabled jobs.
  :::

{% image "./src/static/img/hub/admin.png", "admin", "(min-width:1200px) 80vw, 100vw", "boxed" %}

## Scheduler Tasks

An admin can

:::content

- Pause All Jobs. This will ask the scheduler API to stop running any jobs until clicking "Resume Enabled Jobs."
- Resume Enabled Jobs. This will ask the scheduler API to resume running any enabled jobs that had been paused.
- Kill Scheduler. This will turn off the scheduler. Keep in mind that task are run in the Runner API and any started tasks will not be affected.
  :::

## User Task History

This table is a list of all manual intervention logs.

## User Login History

This table is a list of the access log.
