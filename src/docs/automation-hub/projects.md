---
title: Projects | Atlas Automation Hub Docs
tags: Automation Hub
description: Learn about creating and editing Atlas Automation Hub projects.
keywords: atlas, atlas automation hub, extract scheduler, etl, projects, task group, schedule, cron
layout: docs_hub.njk
eleventyNavigation:
  key: AH Projects
  title: Projects
  parent: Automation Hub
  order: 9
---

# Projects

A project is a group of tasks that run on the same schedule. The tasks can be set to run in parallel or series.

Projects include three primary pages:

:::content
- ``All Projects`` This loads a paginated table of all projects along with a name cloud of project owners.
- ``My Projects`` This loads a paginated table of all projects for the specified owner.
- `Project Details` Summary page of some project events and a few actions that can be taken.
- [`New Project`](#new-project) The page to create or edit a project. If no projects, or no tasks exists, users are directed here to create a project.
:::

{% image "./src/static/img/automation-hub/my_projects.png", "my projects", "(min-width:800px) 50vw, 100vw", "boxed" %}

## Project Details

There are two actions a user can take in a project - delete or edit.

There are a few task control options:

:::content
- `New` This will redirect to the [``task``](/docs/automation-hub/tasks/) page, tasks can only be created under a project.
- `Disable All` This will disable all tasks in the project from running.
- `Enable All` This will enable all tasks in the project to run.
- `Run All` This will immediately run all ``enabled`` tasks.
:::

## New Project

When creating or editing a project the same steps can be used. By default a new project is owned by the creator. However, users have the option of taking ownership of existing projects by checking the "Take Ownership of Project" button.

### Run Tasks in Sequence

Checking this box will run the tasks in a series instead of in parallel. The run order is determined by the job rank (1,2,3,4...) and if there is no rank, or a duplicate value, the tasks are sorted by name (1,2,3..a,b,c..).

### Triggers

There are three types of triggers for a project.

#### Cron

The cron schedule is used to run on specific dates or times. It follows the typical linux type cron scheduling. More information can be found [here](https://crontab.guru) and some [examples](https://crontab.guru/examples.html).

Check the "Use a cron schedule" box to enable a cron schedule.

Fill in parameters as required. Leave fields blank as a wildcard.

For example, to run a task ever Monday at 8 AM, set the option "day of the week" to 0, and "hour of the day" to 8.

#### Interval

The interval schedule runs tasks with a duration between them. For example, running a task every 20 minutes. Check the "Use an interval schedule" box to enable an interval schedule.

An interval schedule will run a project "ever x <time period>". Where the time periods is either

:::content
- week(s)
- day(s)
- hour(s)
- minute(s)
- second(s)
:::

#### One Off

It is also possible to schedule an additional one-time schedule.

### Parameters

See the [parameters](/docs/automation-hub/parameters/) page for more parameter options.
