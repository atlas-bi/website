---
title: Schedule | Learn about how to schedule the Atlas Library ETL to run periodically on your SSIS server.
tags: Library
description: Once the ETL's are published to SSRS they can easily be scheduled to run on intervals. Create a new job. Give the job a name. Add a step to the ETL. The first step must be Setup and the last two steps must be Merge and Post Processing. When multiple steps, be sure to end the last step with 'Quit the job reporting success'.
keywords: atlas, atlas library, unified report library, data governance, database, etl, schedule, run, ssis
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Schedule
  title: Schedule
  parent: BIL SSIS ETLs
  order: 3
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

# Schedule

Once the ETL's are published to SSRS they can easily be scheduled to run on intervals.

- Create a new job
  {% image "./src/static/img/library/schedule/create_job.png", "create job", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Give the job a name
  {% image "./src/static/img/library/schedule/name_job.png", "name job", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Add a step to the ETL. The first step must be Setup and the last two steps must be Merge and Post Processing.
  {% image "./src/static/img/library/schedule/schedule_choose_job.png", "create job step", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% admonition
  "note",
  "Note",
  "At this step, choose the domain account that has read access to all data source and write access to the ``atlas-staging`` db."
%}

- When multiple steps, be sure to end the last step with 'Quit the job reporting success'.
  {% image "./src/static/img/library/schedule/MultipleSteps.png", "multiple steps", "(min-width:800px) 50vw, 100vw", "boxed" %}
- Create a schedule
  {% image "./src/static/img/library/schedule/schedule_job.png", "create schedule", "(min-width:800px) 50vw, 100vw", "boxed" %}
