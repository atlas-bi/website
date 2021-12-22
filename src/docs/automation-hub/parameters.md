---
title: Parameters | Atlas Automation Hub Docs
tags: Automation Hub
description: Learn about how to create project and task level parameters for Atlas Automation Hub. Parameters are a powerful way to make your tasks flexible.
keywords: atlas, atlas automation hub, extract scheduler, etl, parameters
layout: docs_hub.njk
eleventyNavigation:
  key: AH Parameters
  title: Parameters
  parent: Automation Hub
  order: 13
---

# Parameters

Parameters are a powerful way to make tasks and project flexible.

Parameters can be added at the project and task level. Project parameters are passed down to all child tasks, task parameters will override project parameters with the same name.

## Creating Parameters

A parameter is a key value pair, separated with a ``=`` or ``:``.

```bash
key=value
key:value
```

Parameters can include date/time variables, wrapped in a ``parse(...)`` tag.

```bash
@my_param=nice_day-parse(%d)
```

Values using inside a ``parse`` tag should be a [strftime pattern](https://strftime.org).

## Parameters in SQL

Parameters are inserted into sql queries in the `DECLARE` or `SET` statements. For example, if you have a query to print the date:

```sql

DECLARE @my_date datetime = getdate()
select @my_date
```

You could add a task or project parameter to override the value:

```
@my_date = getdate()-1
```

The sql run, and show in the sql preview, as:

```sql
DECLARE @my_date datetime = getdate()-1
select @my_date
```

## Parameters in Filenames

Atlas Hub has a few options for filename parameters as well.

### Wildcards

Filenames for a data source can use Unix shell-style wildcards to allow groups of files, or a file with an unknown name, to be found. Options are:

| Pattern | Meaning                          |
|---------|----------------------------------|
| *       | matches everything               |
| ?       | matches any single character     |
| [seq]   | matches any character in seq     |
| [!seq]  | matches any character not in seq |

Here's a few examples.

`folder/*/sub_sub_folder/file_*.csv` would match `folder/sub_folder/sub_sub_folder/file_01_02_91.csv`.

These patterns are most useful for picking up files with date patterns in them.

### Dates

Filename can also include all [strftime patterns](https://strftime.org).

For example, `my_file_%d_%Y.blah` is a good name, and will pick up a file with the same day and year.

But, if you need a file from yesterday? That is also possible. Adding a `-1`, or `+1`, or `+100`, or any number, to most `strftime` options will do date math.

`%d-1` will be yesterday day number.

`%y-1` will be last year.

If today is the 1st day of the month, `%d-1` will give you the last day of last month, and so on.

The last day and first day of the month are also available, using `lastday`, `firstday`, and `firstday0`.

### Parse Parameters

Parsed parameters can be used in filenames as well.

For example, and parameter of ```#cool=parse(%d_%Y)``` can be used in a filename ```my_date_#cool.csv```. The output will be something like ```my_date_01_21.csv```.
