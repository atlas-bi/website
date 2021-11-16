---
title: Changelog
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Changelog
  title: Changelog
  parent: BIL Releases
  order: 0
---

# Changelog

## Next Release

::: content
- Add profile to terms
:::

## Version 2021.11.1

::: content
- Implemented SSAS Cubes- added to search, added run button
- Updated db creation script
:::

## Version 2021.10.1

::: content
- Fixed hyperspace links for SlicerDicer sessions
- Added feature toe search so screenshots are enlarged when clicked
- Moved certification tags into separate table
- Updated Self-Service certification tag criteria
- Fixed script errors in collections
- Updated reports to show correct description
- Fixed bug in repository descriptions
:::

## Version 2021.08.1

::: content
- Renamed Data Projects to Collections
- Added details to search
- Added thumbnail of screenshot in search
- Modified search bar to always display
- Fixed js bug within collections
- Added feature to group reports by report type
- Added report profile that combines usage information across all reports in a collection
- Updated LDAP groups to show in Atlas
- Fixed bug to let term links be removed
:::

## Version 2021.07.1

::: content
- Added ShortName column to ReportObjectType
- Added report tags for Clarity reports
- Added projects to report relationships
- Added Self-Service certification tag
- Added SSRS Files to search
- Removed hardcoded report types from search
- Updated report editor to be able to add data projects to reports
- Modified ReportObjectType table to include visibility
- Added optional banner text to config file
- Fixed script errors on projects page
- Updated metrics to include components in relationships
- Modified report editor to only close on x
:::

## Version 2021.06.1

::: content
- Combined ETL documentation with webapp documentation
- Fixed SlicerDicer run button in Hyperspace
- Split a joined primary key to a single primary key in three tables
- Added a SlicerDicer filter button to search
- Modified Tableau filter button on search
- Fixed new favorite folder bug
- Removed 0's from user profile run data
- Removed hidden reports from report relationships
- Fixed search pagination that was removing search filters
- Moved certification tag to ETL
- Made the run button green
- Fixed the search bug when searching for single letters
- Updated project search procedure
:::

## Version 2021.05.1

::: content
- Updated criteria for certification tags
- Updated criteria for Epic report groups
- Added commas when multiple fragility tags
- Added button to refresh preview
- Modified report details to show report name not display title
:::

## Version 2021.04.1

::: content
- Updated project editor to be able to link multiple terms and reports at a time
- Modified image loader size
- Updated formatting for maintenance entries
- Added hidden flag to data projects to hide from search
- Updated search filters for metrics
- Fixed report type tooltip
- Added report certification title to favorites
:::

## Version 2021.03.1

::: content
- Renamed database ``Data_Governance`` to ``atlas``
- Renamed database ``DG_Staging`` to ``atlas_staging``
- Added report certification title to report header
- Added documentation
- Added .25s delay to live searching to reduce server load
- Removed private reports from search procs
- Fixed bug with copy query button always copying first query
- Fixed bug which prevented deleting data projects
- Fixed bug which displayed html text instead of parsed html in comments
- Fixed misc dropdown bugs
- Merged thumbs up/thumbs down on reports into one button
- Updated search proc to treat terms name as high a priority as report name
- Added data projects as "ads" to search
- Fixed bug in search that was removing search filters after starting another search
- Fixed bug in search that was hiding last filter when only a few results were showing
- Update search proc to include report annotations from data projects
:::
