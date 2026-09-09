---
title: Connections | Learn about how to use the Atlas Hub Connections page
tags: Hub
description: The connection manager stores credentials for FTP, SFTP, SMB, SSH, Database and GPG encryption keys. Connections are saved in organization groups which can also store contact information for the organization. A connection group can have any number of different connections. Password/ssh key/gpg key fields are all encrypted before being saved into the database.
keywords: atlas, atlas hub, extract scheduler, etl, external connections, database connection, sftp, ssh, smb, gpg
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Connections
  title: Connections
  parent: Hub
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
        url: '{{ site.url }}/docs/hub/'
        position: 3
---

# Connections

The connection manager stores credentials for FTP, SFTP, SMB, SSH, Database and GPG encryption keys.

Connections are saved in organization groups which can also store contact information for the organization.

A connection group can have any number of different connections.

Password/ssh key/gpg key fields are all encrypted before being saved into the database.

## Generate an SSH key for SFTP

On the New or Edit SFTP Connection form, click **Generate SSH key pair** beside the SSH Key field. To protect the private key with a passphrase, fill in **Key Password** before generating the pair.

Copy the generated **Public key** to the SFTP account's `authorized_keys` file on the server. Then click **Add SFTP Connection** or **Save SFTP Connection** to store the private key using Hub's existing encrypted storage. Generating a pair alone does not save the connection.

If the form already contains a key, Hub asks before replacing it. Keep the key password unchanged after generation unless you generate a new pair with the new password. This feature is on the SFTP form; the SSH command connection form uses password authentication.
