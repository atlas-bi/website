---
title: Admin | Atlas Automation Hub Docs
tags: Automation Hub
description: Learn about how to use the controls on the Atlas Automation Hub Admin page.
keywords: atlas, atlas automation hub, extract scheduler, etl, usage, admin
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Admin
  title: Admin
  parent: Automation Hub
  order: 12
---

# Admin

## App Tasks

An admin can

:::content

- Reset all tasks to completed. This is useful after publishing a website update and the admin would like to clear all errored tasks.
- Reschedule Enabled Jobs. This option will empty the scheduler and then reschedule any enabled jobs.
  :::

{% image "./src/static/img/automation-hub/admin.png", "admin", "(min-width:1200px) 50vw, 100vw", "boxed" %}

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
