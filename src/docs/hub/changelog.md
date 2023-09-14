---
title: Changelog - Atlas Hub
tags: Hub
description: Atlas Hub changelog. Find updates from recent releases and what feature you can expect on your next upgrade.
keywords: atlas, atlas automation hub, extract scheduler, etl, changelog
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Changelog
  title: Changelog
  parent: Hub
  order: 15
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Docs
        url: '{{ site.url }}/docs/hub/'
        position: 3
---

# Changelog

<a class="block border rounded-lg p-5 shadow bg-white no-underline group animate-fade transition-colors hover:border-sky-400 hover:shadow-sky-400" target="_blank" href="https://github.com/atlas-bi/Hub/releases" title="github releases">
  <div class="flex content-center space-x-2">
<div class=" my-auto">{% include "src/_includes/svg/right.svg" %}</div><div class="my-auto">Release notes have been moved into the <span class="text-sky-600 ">releases</span>.</div>
</div>
</a>

## Version 0.0.1-rc.8

Using "release candidate" tags until we are able to get more apt install testing/feedback.

:::content

- Added query caching for web query sources, when source is offline, cache can be used
- Added filename preview
- Enhanced feedback messages
- Change log format to console style
- Updated UI
- Added option to require SQL output
- Added support for email to sms service
- Updated to allow multiple source files to be moved to a destination, keeping original name
- Fixed layout issue on connection page
- Fixed search layout on chrome
  :::

## Version 2021.08.1

:::content

- Fixed installer for latest Poetry update
- Added ability to run tasks in sequence
- Updated html linter
- Added better error handling when task runner is offline
- Added python package lookup for py processor
- Added option to use parameters in file names
- Added option to pre-parse parameters using python date formats
  :::

## Version 2021.04.1

:::content

- Added SAML auth as default
- Changed to use flask-login for user session
- Increased test cov to 60%
- Hide nav when showing 400/500 errors
- Fixed bug where `errored > run all now` button was not working
- Fixed bug with screen resize when changing tabs
- Updated project page to have logs on tab 2
- Fixed bug with adding duplicate SMB connections when creating a new connection
- Added option to include custom line ending in output text files
- Added background task for maintenance
  :::

## Version 2021.03.1

:::content

- Rewrote Scheduler API as flask application factory
- Changed task enable/disable to a toggle
- Fixed bug that didn't allow py scripts from a git url
- Fixed bug that was hiding organization input on new ssh tasks
- Updated to latest version of SQL Alchemy
- Added in run duration
- Added file checksum to file logs
- Added option to rerun all running tasks from dashboard
- Added logging of current row count of exports from SQL Server queries
- Fixed bug with parsing sql queries to remove "go" command
- Added basic search
- Added option to encrypt files with gpg keys
- Fixed bug resending blanks files to SFTP servers
- Fixed display issue with cron schedules on projects
- Allow gitlab/hub "blob" urls as well as "raw" urls
- Added ability to auto retry extracts x number of times
- Fixed a few timezone bugs
- Fixed display issue with code previews
- Added option to embed output file in email vs sending as attachment
- Added option to connect to SFTP servers with SSH keys
- Added file streaming for large queries/files to reduce memory usage
- Fixed file size calculation
  :::
