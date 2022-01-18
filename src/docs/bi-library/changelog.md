---
title: Changelog | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library changelog. Find updates from recent releases and what feature you can expect on your next upgrade.
keywords: atlas, atlas bi library, unified report library, data governance, database, changelog
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Changelog
  title: Changelog
  parent: BI Library
  order: 10
---

# Changelog

Version names follow a pattern of YYYY.MM.release.

## Next Release

::: content

- Added image processing for thumbnails to reduce data transfer
- Updated site nav style
- Updated thumbnail view in search results and favorites
- Sitewide messages from the config or settings now support markdown and html
- Added config option to disable the demo video, request access and feedback buttons, comments, and report sharing
- Updated Solr to v8.11.1
- Fixed v tag on preloaded fonts
- Removed Collection milestone feature from UI
  :::

## Version 2022.01.1

::: content

- Improved asset handling
- Fixed bug with search share links
- Fixed spelling in search settings
- Changed disabled run button text from "Login to Hyperspace to run report." to "Run from the Hyperspace report library."
- Fixed Crystal Hyperspace embedded run link on report modal to use an embedded display action
- Fixed bug in permission check requiring 2 matching groups instead of 1
- Fixed bug adding a favorite from search results
  :::

## Version 2021.12.1

::: content

- Add profile to terms
- Fixed duplicate term listings on reports
- Change search from sql full text index to Apache Solr
- Updated Tableau run URL's to launch externally
- Added NPM build
- Fixed bug adding service tickets to report documentation
- Fixed bug in access request from search results
- Added run button for SAP Crystal Reports
- Added permission check for Crystal Reports and RW Reports
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

### Updating to 2021.06.1

::: content

- Add column `CertificationTag` to `dbo.ReportObject`
- Three tables have a primary key added, and the joint pk removed. Script to create new tables is below. Remove old tables, then rename new to the old name.
  :::

```sql

USE [atlas]
GO

/****** Object:  Table [app].[ReportObjectDocFragilityTags]    Script Date: 6/2/2021 10:47:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
drop table if exists [app].[ReportObjectDocFragilityTags_New];
CREATE TABLE [app].[ReportObjectDocFragilityTags_New](
    LinkId  [int] IDENTITY(1,1) NOT NULL,
    [ReportObjectID] [int] NOT NULL,
    [FragilityTagID] [int] NOT NULL,
PRIMARY KEY CLUSTERED
(
    LinkId ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [app].[ReportObjectDocFragilityTags_New]  WITH CHECK ADD FOREIGN KEY([FragilityTagID])
REFERENCES [app].[FragilityTag] ([FragilityTagID])
ON DELETE CASCADE
GO

ALTER TABLE [app].[ReportObjectDocFragilityTags_New]  WITH CHECK ADD FOREIGN KEY([ReportObjectID])
REFERENCES [app].[ReportObject_doc] ([ReportObjectID])
ON DELETE CASCADE
GO


insert into [app].[ReportObjectDocFragilityTags_New] (FragilityTagID, ReportObjectId)
select t.FragilityTagID, t.ReportObjectID
from [app].[ReportObjectDocFragilityTags] t

-- then rename
```

```sql

USE [atlas]
GO

/****** Object:  Table [app].[ReportObjectDocMaintenanceLogs]    Script Date: 6/2/2021 12:19:35 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

drop table if exists [app].[ReportObjectDocMaintenanceLogs_New];
CREATE TABLE [app].[ReportObjectDocMaintenanceLogs_New](
    LinkId  [int] IDENTITY(1,1) NOT NULL,
    [ReportObjectID] [int] NOT NULL,
    [MaintenanceLogID] [int] NOT NULL,
PRIMARY KEY CLUSTERED
(
    LinkId ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [app].[ReportObjectDocMaintenanceLogs_New]  WITH CHECK ADD FOREIGN KEY([MaintenanceLogID])
REFERENCES [app].[MaintenanceLog] ([MaintenanceLogID])
ON DELETE CASCADE
GO

ALTER TABLE [app].[ReportObjectDocMaintenanceLogs_New]  WITH CHECK ADD FOREIGN KEY([ReportObjectID])
REFERENCES [app].[ReportObject_doc] ([ReportObjectID])
ON DELETE CASCADE
GO

insert into [app].[ReportObjectDocMaintenanceLogs_New] (ReportObjectID, MaintenanceLogID)
select t.[ReportObjectID], t.[MaintenanceLogID]
from [app].[ReportObjectDocMaintenanceLogs] t

-- then rename
```

```sql

USE [atlas]
GO

/****** Object:  Table [app].[ReportObjectDocTerms]    Script Date: 6/2/2021 12:22:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
drop table if exists [app].[ReportObjectDocTerms_New];
CREATE TABLE [app].[ReportObjectDocTerms_New](
    LinkId  [int] IDENTITY(1,1) NOT NULL,
    [ReportObjectID] [int] NOT NULL,
    [TermId] [int] NOT NULL,
PRIMARY KEY CLUSTERED
(
    LinkId ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [app].[ReportObjectDocTerms_New]  WITH CHECK ADD FOREIGN KEY([ReportObjectID])
REFERENCES [app].[ReportObject_doc] ([ReportObjectID])
ON DELETE CASCADE
GO

ALTER TABLE [app].[ReportObjectDocTerms_New]  WITH CHECK ADD FOREIGN KEY([TermId])
REFERENCES [app].[Term] ([TermId])
ON DELETE CASCADE
GO


insert into [app].[ReportObjectDocTerms_New] (ReportObjectID, [TermId])
select t.[ReportObjectID], t.[TermId]
from [app].[ReportObjectDocTerms] t

-- then rename
```

::: content

- Update search procedures from database creation script
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

- Renamed database `Data_Governance` to `atlas`
- Renamed database `DG_Staging` to `atlas_staging`
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

### Updating to 2021.03.1

::: content

- Install :doc:`.Net5 <../requirements>` on dev machine and host machine.
- Rename database `Data_Governance` to `atlas`
- Drop `dg_staging` database and run ETL creation script `atlas_staging-creation_script.sql`
- Update ETL connections and parameters to new database names.
  :::
