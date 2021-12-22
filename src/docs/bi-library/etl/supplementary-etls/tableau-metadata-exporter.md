---
title: Tableau Metadata Exporter | Supplimentary ETLs | Atlas BI Library Docs
tags: BI Library
description: Atlas BI Library supplementary ETL to parse download Tableau report metadata and usage.
keywords: atlas, atlas bi library, unified report library, data governance, database, etl, tableau, metadata
layout: docs_library.njk
eleventyNavigation:
  parent: BIL Supplementary ETLs
  key: BIL Tableau Metadata Exporter
  title: Tableau Metadata Exporter
  order: 3
---

# Tableau Metadata Exporter

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
          <a href="https://github.com/atlas-bi/Tableau-Metadata-Exporter" rel="noopener" target="blank">https://github.com/atlas-bi/Tableau-Metadata-Exporter</a>
        </p>
      </div>
    </div>
  </article>
</div>

## About

Tableau runs a Python script that pulls and parses XML data from PSQL readonly Tableau database. This data, along with data queried from PSQL workgroup Tableau database, is inserted into a SQL database and is able to be run daily and inserted into Atlas. If multiple queries are found in a report, there will be a database entry for each query.

### What It Does

It logs in to the Tableau server and connects to the Tableau PSQL Admin account in the workgroup database.

:::content
1.  The query will create .twbx and .twb files containing SQL queries related to the workbooks stored in Tableau
2.  The files retrieved are placed in the "TwbxFiles" folder and any zipped folders are unzipped
3.  All XML files are parsed and the server, database name, and SQL queries are pulled from each along with the the respective workbook
4.  Connection to SQL database is established to hold Tableau data. All tables are truncated so as not to duplicate data
5.  All PSQL queries are run and data pulled is stored in SQl tables
:::

## How To Run

### Create Database and Tables

```sql
CREATE DATABASE [TableauSQL]
 GO
```

Run the ``create_tables.sql`` script included in the download.

### Create settings.py file

For the settings.py file, the Tableau admin and readonly passwords will be needed.

Navigate to the Tableau server and open command prompt.
```py
cd C:\Program Files\Tableau\Tableau Server\packages\pgsql.<version>\bin

#to retrieve the Tableau admin password
tsm configuration get -k pgsql.adminpassword

#to retrieve the readonly password
tsm configuration get -k pgsql.readonly_password
```

The ``settings.py`` file should look something like this:

```py
# readonly account
PSQL_Server = ("dbname=database_name user=username host=hostname password=password port=port")

SQL_Server = "DRIVER={ODBC Driver 17 for SQL Server};SERVER=server_name;DATABASE=database_name;UID=username;PWD=password"

SSH_Host = "SSH_server_name"
SSH_Username = "username"
SSH_Password = "password"

# admin account
PG_PASSWORD="password"
PG_HOST="localhost"
PG_PORT=8060
PG_DB="workgroup"
PG_USER="tblwgadmin"

Sleep: int = 5 # number of seconds

```

### Run

If you are not using Atlas Automation Hub, you'll need to manually install the dependent packages.

```bash
python main.py
```

## Additional Information

Some of the PSQL queries that are run look at user and group data. To access these tables, try this [guide](https://github.com/tableau/community-tableau-server-insights). The user data is mostly found in the ts_users data source.

For a list of nearly all Tableau tables along with columns and descriptions, try this [guide](https://tableau.github.io/tableau-data-dictionary/2019.4/data_dictionary.htm).
