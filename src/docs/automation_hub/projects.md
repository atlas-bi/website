---
title: Projects
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: Projects
  parent: Automation Hub
  order: 5
---

# Projects


.. note:: A project is a group of tasks that should be run on the same schedule.

Projects include three primary pages:

- All Projects. This loads a paginated table of all projects along with a name cloud of project owners.
- My Projects. This loads a paginated table of all projects for the specified owner.
- Project Details. Summary page of some project events and a few actions that can be taken.
- New Project. The page to create or edit a project. If no projects, or no tasks exists, users are directed here to create a project.

.. image:: ../images/em2-project.png
  :alt: Project List

## Project Details

There are two actions a user can take in a project - delete or edit. Editing options are explained in the `New Project`_ section.

There are a few task control options:

- Add a task. This will redirect to the :ref:`task_new` page, tasks can only be created under a project.
- Disable all tasks. This will prevent any new runs for tasks in the project.
- Enable all tasks. This will allow the project schedule to run all the tasks.
- Run all tasks. This will immediately run all tasks.

## New Project


When creating or editing a project the same steps can be used. By default a new project is owned by the creator. However, users have the option of taking ownership of existing projects by checking the "Take Ownership of Project" button.

### Run Tasks in Sequence

Checking this box will run the tasks in a series instead of in parallel. The run order is determined by the job rank (1,2,3,4...) and if there is no rank, or a duplicate value, the tasks are sorted by name (1,2,3..a,b,c..).

### Triggers

There are three types of triggers for a project.

#### Cron


The cron schedule follows the typical linux type scheduling. More information can be found `here <https://crontab.guru>`_ and some `examples <https://crontab.guru/examples.html>`_.

Check the "Use a cron schedule" box to enable a cron schedule.

Fill in parameters as required. Leave fields blank as a wildcard.

#### Interval

Check the "Use an interval schedule" box to enable an interval schedule.

An interval schedule will run a project "ever x <time period>". Where the time periods is either

- week(s)
- day(s)
- hour(s)
- minute(s)
- second(s)

#### One Off

It is also possible to schedule an additional one-time schedule.



### Parameters

Parameters can be used to modify sql queries at run time. Parameters must be in one of two formats:

``` python
<param_name> = <param_value>

# or

<param_name> : <param_value>
```

For example:

``` sql

-- parameter
myDate = getdate()

-- original SQL
Declare @myDate = tomorrow

-- final SQL
Declare @myDate = getdate()
```

Parameters can also include custom date syntax using the `parse()` syntax, with most python date shortcodes. For example, this command will get the current year.

``` sql

--paramter
myYear = parse(%Y)
```

Parameters are calculated when the tasks are first run and the parameter values will remain consistent during the task run. Parameters can also be used in the filename, only `parse()` values will be converted to actual values.

.. note:: The code preview in :ref:`task_details` is modified to include parameter values. Verify this is correct when adding parameters!

.. note:: Project parameters will be passed to all tasks in the project, but can be overridden at the task level.
