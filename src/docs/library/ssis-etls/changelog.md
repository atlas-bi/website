---
title: Changelog
tags: Library
description: Atlas Library ETL changelog. Find updates from recent releases and what feature you can expect on your next upgrade.
keywords: atlas, atlas library, unified report library, data governance, database, etl, changelog
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL ETL Changelog
  title: Changelog
  parent: BIL SSIS ETLs
  order: 4
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
      - name: ETL Setup
        url: '{{ site.url }}/docs/library/ssis-etls/'
        position: 4
---

# Changelog

## Version 2023-09-1

- clarity: fixed data size on paf and hrx column file imports
- slicer: ignore truncation warning on slicer dicer session description
- hyperdrive/ssrs: updated ssrs links to allow embedding in hyperdrive

## Version 2023-06-1

- atlas hub: fixed max length issue on description

## Version 2023-03-3

- tableau: fixed tableau hierarchy for reports with 4 digit ids

## Version 2023-03-2

- run data: fixed bug where hrx's with no run time would result in null instead of 0

## Version 2023-03-1

- fixed bug in RPT_RUN_DATA
- added atlas hub projects and task: added etl for atlas hub
- added stage.reportobjecttypefromprd: updated rundata being pushed up and down
- improved performance for clarity bridge

## Version 2022-11-1

- clarity: fixed sql encoding on blank lines
- hierarchy: added distinct

## Version 2022-10-1

- column sync: fixed out of sync column in ssis clarity
- query: preventing inserting queries for reports that do not exist
- ssrs2: fixed datatype conversion problem on subscription report_ooid

## Version 2022.07.1

- hide reports: fixed update statement alias in hide reports step
- ssrs2: fixed datatype on subscriptionid
- ssrs2: fixed ssrs2 subscription mapping

## Version 2022.03.1

- Fixed RW report group id's
- Moved username parsing into ETL from webapp
- Moved report parameters from description into separate db table
- Added number of report runs in last x months to reportobject table
- Updated Slicer Dicer session tags to all be "self service"

## Version 2022.02.1

- Updated deprecated table
- Added user RW groups

## Version 2022.01.1

- Fixed bug causing missing RW report groups
- Fixed spelling on report parameters
- Added User RW Report Group overrides
- Updated deprecated run data table

## Version 2021.12.1

- Added SAP Crystal Report file link import (Requires Supplementary Crystal ETL)
- Added More Clarity Report Groups
- Added HRX Report parameters to system detailed description as a collapse
- Fixed typo in SlicerDicer report type table
- Moved sql proc's for run data into the ETL (sql clean coming in future release)
- Added sql query names (webapp inclusion of this feature coming in future release)
- Added SlicerDicer report groups
- Added run links for cubes
- Added cert tag for cubes

## Version 2021.11.1

- Added SSAS cubes, measures, and dimensions
- Added hierarchy for workbench reports
- Updated creation scripts
- Added certification tag table
- Added EpicID to users
- Modified UserGroup Memberships
- Added column to ReportObjectType table (must be a Y to be searchable)

## Version 2021.07.1

- Added SlicerDicer session info to ETL
- Updated certification tags to include self-service
- Fixed Tableau rundata
- Updated hierarchies for sessions
- Added Clarity tags and tag memberships

## Version 2021.06.1

- Modularized ETL
- Fixed a bug in the run data for SlicerDicer
- Updated SlicerDicer column mapping to Clarity-ETL
- Added in run time for SlicerDicer run data
- Added LPP and PAF to Clarity
- Added HGR to HRX relationships
- Removed personal dashboards (IDN)
- Added private report column

## Version 2021.05.1

- Added step to import repository information
- Updated run data ETL connections
- Fixed a bug in ReportObjectQuery where queries were not being removed

## Version 2021.03.1

- Updated database names
- Fixed a bug in ReportObject merge where nulls were not being updated
- Removed custom tables
- Removed dev connection from ETL
- Added Tableau and SlicerDicer

### Updating to 2021.03.1

- Rename database `Data_Governance` to `atlas`
- Drop `dg_staging` database and run ETL creation script `atlas_staging-creation_script.sql`
- Update ETL connections and parameters to new database names.
