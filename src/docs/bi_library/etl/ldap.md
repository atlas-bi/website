---
title: ETL LDAP
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL LDAP
  title: LDAP
  parent: BIL ETL
  order: 2
---

# Set Up LDAP

It is presumed that most user profile information will be coming from LDAP. There are [LDAP scripts](https://github.com/atlas-bi/atlas-bi-libaray-etl/tree/master/LDAP) provided to scrape the necessary data from LDAP server(s) into a separate database.

This can be setup to run as a scheduled job with [Atlas Automation Hub](https://www.atlas.bi/docs/automation_hub/), or another tool, to provide data to the Atlas ETL.
