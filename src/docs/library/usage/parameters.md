---
title: Parameters
tags: BI Library
description: Customize you install by setting parameters to configure search, add global site messages, set documentation options and more!
keywords: atlas, atlas bi library, unified report library, data governance, database, parameters, configuration, configure, setup, search settings
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Parameters
  title: Parameters
  parent: BIL Usage
  order: 8
---

# Parameters

<p class="subtitle pb-5">Configure documentation drop downs, site messages and default search configuration.</p>

## Documentation Drop Downs

From the parameters screen you are able to add additional fields for all the documentation drop down fields, for example you may need additional fragility tags in your organization.

## Global Settings

There are a few useful global settings -

- Default Visibility Time [18] - reports that have not been used in the last x months will be hidden through the ETL
- msg [0-99999] - add a site-wide message. Access by adding `?msg=0` to the URL's

Other content may show here, but is edited in search settings

## Search

In search parameters you can choose what report types will be visible for the basic search. We recommend only including your commonly used report types to make content easier for your users to find.

You also have the option to completely exclude users, groups, collections, initiatives and terms from the basic search results.

Users with the `advanced search` permission will still be able to access all content.
