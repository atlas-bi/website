---
title: Schedule | ETL | Atlas BI Library Docs
tags: BI Library
description: Learn about how to schedule the Atlas BI Library ETL to run periodically on your SSIS server.
layout: docs_library.njk
eleventyNavigation:
  key: BIL ETL Schedule
  title: Schedule
  parent: BIL ETL Setup
  order: 3
---

# Schedule

Once the ETL's are published to SSRS they can easily be scheduled to run on intervals.

::: content
- Create a new job
  {% image "./src/static/img/bi-library/schedule/create_job.png", "create job", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Give the job a name
  {% image "./src/static/img/bi-library/schedule/name_job.png", "name job", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Add a step to the ETL. The first step must be Setup and the last two steps must be Merge and Post Processing.
  {% image "./src/static/img/bi-library/schedule/schedule_choose_job.png", "create job step", "(min-width:800px) 50vw, 100vw", "boxed" %}
:::

{% admonition
  "note",
  "Note",
  "At this step, choose the domain account that has read access to all data source and write access to the ``atlas-staging`` db."
%}

::: content
- When multiple steps, be sure to end the last step with 'Quit the job reporting success'.
  {% image "./src/static/img/bi-library/schedule/MultipleSteps.png", "multiple steps", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Create a schedule
  {% image "./src/static/img/bi-library/schedule/schedule_job.png", "create schedule", "(min-width:800px) 50vw, 100vw", "boxed" %}
:::
