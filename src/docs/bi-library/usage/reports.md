---
title: Reports | Atlas BI Library Docs
tags: BI Library
description: Reports are the cornerstone of Atlas BI Library. System data is brought in through the ETLs and more documentation can be added in the app.
keywords: atlas, atlas bi library, unified report library, data governance, database, reports, etl, metadata, profile, run data, ssrs, crystal
layout: docs_library.njk
eleventyNavigation:
  key: BIL Reports
  title: Reports
  parent: BIL Usage
  order: 1
---

# Reports
<p class="subtitle pb-5">Reports are the cornerstone of Atlas BI Library.</p>

## ETL Loaded Content

Reports are added to the library through the [ETL processes](/docs/bi-library/etl/). A report general will include several sets of data or actions:

:::content
- Title, Description, basic meta details such as last updated, report type, author, etc.
- Usage information include report run data by person, in some cases also report failed runs, subscription information etc.
- Links to run, edit, or manage the report in its source system
- Source SQL queries uses in the report.
- Report security groups.
- Report hierarchy structure (sub-reports, parent reports etc).
:::

This basic information provides the foundation for your consolidated report library, and is fed into the search.

## User Loaded Content

Additional documentation and metadata can now be added through the app. There are a variety of ways to enhance your documentation!

:::content
- Images describing your report
- Developer description and key assumptions
- Link to [terms](/docs/bi-library/usage/terms/), with custom notes
- Add reports to exiting [report collections](/docs/bi-library/usage/collections/)
- Report owners, requester, link to the source code
- Through [parameters](/docs/bi-library/usage/parameters/), custom values can be added as options for

    - Organizational value
    - Estimated run frequency
    - Fragility rating
    - Maintenance schedule - used to trigger [maintenance tasks](/docs/bi-library/usage/tasks/) and certification tags!
    - Fragility tags - tag potential fragility points that could affect you reports during upgrades, etc
    - Executive visibility - flag all reports that your execs are using
    - Do No Purge - flag reports that you want to hide from the [recommended retire task](/docs/bi-library/usage/tasks/)
    - Hide Report - flag to hide the report in search for users without advanced search permissions

- Service tickets - add the ticket number, a link to the ticketing system, and a few comments describing the change
- Maintenance - add maintenance logs directly to your documentation to track the history and changes and maintain report certification
:::

{% admonition
   "note",
   "Markdown",
   "Descriptions fields and most other free text fields support full markdown, including tables, code highlighting, and more! [Learn more about markdown](https://www.markdownguide.org/getting-started)"
%}


## Report Certification

The ETL will add a `certification tag` to all reports each time it runs. There are several levels, a description can be found in the `About Analytics` page on your Atlas BI Library install. These tags range from `High Risk` to `Analytics Certified`. The top tag requires things such as image, descriptions, recent maintenance, etc, in order to achieve the top rank.

## Report Maintenance

If a report has a maintenance schedule and misses the next maintenance dates, administrators will see an alert under the report title reminding them to maintain the report. The [task list](/docs/bi-library/usage/tasks/) will also show the report.

## Report Profile

All reports will have a `profile` included. In the profile you will find all the reports run data, who runs the report, who is subscribed, and who has starred it.

## Sharing Reports

Reports can be shard directly in the app. The person receiving the share will receive a notification in the right sidebar, and also in the mail. SFTP can also be configured in the application settings to send notification to users email box.

## Starring Reports

Starring a report will add it to your home screen favorites.

## Requesting Access and Giving Feedback

Users have the option to request access to reports, or to give feedback. Both of these options integrate into `Manage Engine` ticketing system.

## Running Reports

The library has some logic in place to determine if reports can be run from your current browser and will give a message to users if they are not able to run the report.

## Commenting

Comments can be added to the reports. There is a security point you can assign to users for removing comments.
