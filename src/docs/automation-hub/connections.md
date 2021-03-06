---
title: Connections | Atlas Automation Hub Docs
tags: Automation Hub
description: Learn about how to use the Atlas Automation Hub Connections page.
keywords: atlas, atlas automation hub, extract scheduler, etl, external connections, database connection, sftp, ssh, smb, gpg
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Connections
  title: Connections
  parent: Automation Hub
  order: 11
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
        url: '{{ site.url }}/docs/automation-hub/'
        position: 3
---

# Connections

The connection manager stores credentials for FTP, SFTP, SMB, SSH, Database and GPG encryption keys.

Connections are saved in organization groups which can also store contact information for the organization.

A connection group can have any number of different connections.

Password/ssh key/gpg key fields are all encrypted before being saved into the database.
