---
title: Sqlize Crystal Reports | Supplimentary ETLs | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library supplimentary ETL to parse SAP Crystal report templates, and connect to APIs to gather report data. Queries are pulled in, the ablity to run repors is enabled with this ETL's data.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, crystal, sap reports, sql
layout: docs_library.njk
eleventyNavigation:
  parent: BIL Supplementary ETLs
  key: BIL Sqlize Crystal Reports
  title: Sqlize Crystal Reports
  order: 2
---

# Sqlize Crystal Reports

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="svg-inline--fa fa-download fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Download this ETL</strong>
          <br>
          <a href="https://github.com/atlas-bi/Sqlize-Crystal-Reports" rel="noopener" target="blank">https://github.com/atlas-bi/Sqlize-Crystal-Reports</a>
        </p>
      </div>
    </div>
  </article>
</div>

## About

**Sqlize Crystal Reports** runs [Aidan Ryan's](https://github.com/ajryan) [RptToXml](https://github.com/ajryan/RptToXml) converter to convert a directory of SAP Crystal Reports into XLM files, and then makes a strong attempt at parsing that XML out into a *somewhat* readable and *potentially* runnable t-sql statement. The results are saved into a database table along with the reports:

:::content
- FileName
- Title
- Description
- Query
:::

If multiple queries are found in the report, there will be a db entry for each query.

## Credits

Special thanks to [Aidan Ryan](https://github.com/ajryan) for creating the [RptToXml](https://github.com/ajryan/RptToXml) converter.

## How To Run

### First, install SAP's Crystal Reports, Developer for Visual Studio, SP 28

Here are a few links to try -

* [Direct link to download https://www.sap.com/cmp/td/sap-crystal-reports-visual-studio-trial.html](https://www.sap.com/cmp/td/sap-crystal-reports-visual-studio-trial.html)
* [How To Page https://wiki.scn.sap.com/wiki/display/BOBJ/Crystal+Reports%2C+Developer+for+Visual+Studio+Downloads](https://wiki.scn.sap.com/wiki/display/BOBJ/Crystal+Reports%2C+Developer+for+Visual+Studio+Downloads)
* [Wiki Home https://blogs.sap.com/2016/12/06/sap-crystal-reports-developer-version-for-microsoft-visual-studio-updates-runtime-downloads/](https://blogs.sap.com/2016/12/06/sap-crystal-reports-developer-version-for-microsoft-visual-studio-updates-runtime-downloads/)


:::content
- SAP Crystal Reports for Visual Studio (SP28) runtime engine for .NET framework MSI (64-bit)
- SAP Crystal Reports for Visual Studio (SP28) runtime (64-bit)
:::

### Next, install a few Python packages

```bash
pip install pyodbc lxml sqlparse
```

### Create Database

There are only four db columns -

```sql
USE [CrystalSQL]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Query](
  [ReportName] [nvarchar](max) NULL,
  [Query] TEXT NULL,
  [Title] [nvarchar](max) NULL,
  [Description] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

```

Don't forget to add a user account that can delete and insert.

### Create settings.py file

```py
database = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=server_name;DATABASE=database_name;UID=username;PWD=password'
rpt_src = '\\\\network\\c$\\path\\to\\.rpt\\files\\'
```

### Run

```bash
python main.py
```

The rpt > xml conversion takes some time, don't be surprised at a 30+ minute run time if you have 1000 reports.

### Notes

If you are running this with Atlas Automation Hub, keep in mind that it must run on a windows server. Run the command over ssh on a windows server.

A windows ssh command will look something similar to this.

```bash
cd c:/Users/Public & \
rmdir /s /q crystal 2>nul & \
mkdir crystal & \
cd crystal & \
git -c http.sslVerify=false clone https://<your-local-git-server>/atlas/etl/crystal-to-sql.git . & \
"C:\Program Files\Python38\python.exe" -m virtualenv venv &\
.\venv\Scripts\python -m pip install lxml pyodbc sqlparse &\
.\venv\Scripts\python main.py & \
cd .. & rmdir /s /q crystal
```
