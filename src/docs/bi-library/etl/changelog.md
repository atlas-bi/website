---
title: Changelog | ETL | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library ETL changelog. Find updates from recent releases and what feature you can expect on your next upgrade.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Changelog
  title: Changelog
  parent: BIL ETL Setup
  order: 4
---

# Changelog

## Version 2021.12.1

::: content
- Added SAP Crystal Report file link import (Requires Supplementary Crystal ETL)
- Added More Clarity Report Groups
- Added HRX Report parameters to system detailed description as a collapse
- Fixed typo in SlicerDicer report type table
- Moved sql proc's for run data into the ETL (sql clean coming in future release)
- Added sql query names (webapp inclusion of this feature coming in future release)
- Added SlicerDicer report groups
- Added run links for cubes
- Added cert tag for cubes
:::

## Version 2021.11.1

::: content
- Added SSAS cubes, measures, and dimensions
- Added hierarchy for workbench reports
- Updated creation scripts
- Added certification tag table
- Added EpicID to users
- Modified UserGroup Memberships
- Added column to ReportObjectType table (must be a Y to be searchable)
:::

## Version 2021.07.1

::: content
- Added SlicerDicer session info to ETL
- Updated certification tags to include self-service
- Fixed Tableau rundata
- Updated hierarchies for sessions
- Added Clarity tags and tag memberships
:::

## Version 2021.06.1

::: content
- Modularized ETL
- Fixed a bug in the run data for SlicerDicer
- Updated SlicerDicer column mapping to Clarity-ETL
- Added in run time for SlicerDicer run data
- Added LPP and PAF to Clarity
- Added HGR to HRX relationships
- Removed personal dashboards (IDN)
- Added private report column
:::

## Version 2021.05.1

::: content
- Added step to import repository information
- Updated run data ETL connections
- Fixed a bug in ReportObjectQuery where queries were not being removed
:::

## Version 2021.03.1

::: content
- Updated database names
- Fixed a bug in ReportObject merge where nulls were not being updated
- Removed custom tables
- Removed dev connection from ETL
- Added Tableau and SlicerDicer
:::

### Updating to 2021.03.1

::: content
- Rename database ``Data_Governance`` to ``atlas``
- Drop ``dg_staging`` database and run ETL creation script ``atlas_staging-creation_script.sql``
- Update ETL connections and parameters to new database names.
:::
