---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Schedule
  parent: ETL
---

# Schedule

Once the ETL's are published to SSRS they can easily be scheduled to run on intervals.

::: content
- Create a new job
   <div class="box is-flex is-justify-content-center">
       {% image "./src/static/img/bi_library/schedule/create_job.png", "create job", "(min-width:800px) 50vw, 100vw" %}
   </div>
- Give the job a name
   <div class="box is-flex is-justify-content-center">
       {% image "./src/static/img/bi_library/schedule/name_job.png", "name job", "(min-width:800px) 50vw, 100vw" %}
   </div>
- Add a step to the ETL. The first step must be Setup and the last two steps must be Merge and Post Processing.
   <div class="box is-flex is-justify-content-center">
       {% image "./src/static/img/bi_library/schedule/schedule_choose_job.png", "create job step", "(min-width:800px) 50vw, 100vw" %}
   </div>
:::

{% admonition
  "note",
  "Note",
  "At this step, choose the domain account that has read access to all data source and write access to the ``atlas-staging`` db."
%}

::: content
- When multiple steps, be sure to end the last step with 'Quit the job reporting success'.
   <div class="box is-flex is-justify-content-center">
       {% image "./src/static/img/bi_library/schedule/MultipleSteps.png", "multiple steps", "(min-width:800px) 50vw, 100vw" %}
   </div>
- Create a schedule
   <div class="box is-flex is-justify-content-center">
       {% image "./src/static/img/bi_library/schedule/schedule_job.png", "create schedule", "(min-width:800px) 50vw, 100vw" %}
   </div>
:::
