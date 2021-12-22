---
title: Terms | Atlas BI Library Docs
tags: BI Library
description: A terms provides a definition that can be shared across many reports and collections. Terms are a powerful way to identify key concepts in your report library.
keywords: atlas, atlas bi library, unified report library, data governance, database, terms, definition, define key terms
layout: docs_library.njk
eleventyNavigation:
  key: BIL Terms
  title: Terms
  parent: BIL Usage
  order: 2
---

# Terms
<p class="subtitle pb-5">Define key concepts that are shared across reports.</p>

Terms give you the powers to share common definitions between reports. For example, perhaps you have multiple LOS (length of stay) definitions, depending on who you are reporting for. This is the ideal tool to keep those definitions clearly defined and assigned to the correct reports. Your users can know what LOS definition is being used, without needing to call the poor Analyst every time they are in doubt.


## Description & Meta

There are two primary fields used to document the term - a summary, and a technical definition.

{% admonition
   "note",
   "Markdown",
   "Descriptions fields and most other free text fields support full markdown, including tables, code highlighting, and more! [Learn more about markdown](https://www.markdownguide.org/getting-started)"
%}

A term can be `approved`, and have a `valid from` date assigned.

Any reports that are linked tot he term will be automatically listed below the term details.

## Term Profile

All terms will have a `profile` included. In the profile you will find all the linked reports run data combined, who runs the reports. This is useful to find the general impact of concepts in your organization.

## Starring Terms

Starring a term will add it to your home screen favorites.

## Sharing Terms

Terms can be shard directly in the app. The person receiving the share will receive a notification in the right sidebar, and also in the mail. SFTP can also be configured in the application settings to send notification to users email box.

## Giving Feedback

Users have the option to give feedback on terms. These option integrates with the `Manage Engine` ticketing system.


## Commenting

Comments can be added to the terms. There is a security point you can assign to users for removing comments.
