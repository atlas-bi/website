---
title: Configuration
tags: Hub
description: Configuring Atlas Hub is done through an ini file installed in /etc/atlas-hub/config.ini. Defaults are preset.
keywords: atlas, atlas hub, extract scheduler, etl, configuration
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Configuration
  title: Configuration
  parent: Hub
  order: 6
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

# Configuration

When you installed Atlas Hub a default configuration file was added to `/etc/atlas-hub/config.ini`. This file should be edited to meet your needs.

Keep in mind that special characters, like `%` need to be escaped.

```ini
[MASTER]
; web address used to access the site
; something along the lines of 'atlas-hub.com'
EXTERNAL_URL='localhost'

; min requirements to keep tasks running
; once the server falls below this threshold
; tasks will stop running.
; MIN_DISK_SPACE=1 * 1024 * 1024 * 1024
; MIN_FREE_MEM_PERC=3
; MIN_FREE_CPU_PERC=3

; connection information for gitlab hosted code
; GIT_URL="https://git.example.net/"
; GIT_USERNAME="username"
; GIT_PASSWORD=r"password"
; GIT_TOKEN=r"token"

; connection information for backup smb server
; if this is populated, all task runs will be
; backed up. This allows you to be able to re-
; send files at a later time.
; SMB_USERNAME="username"
; SMB_PASSWORD="password"
; SMB_SERVER_IP="10.0.0.0"
; SMB_SERVER_NAME="servername"
; SMB_DEFAULT_SHARE="BackupShare"

; email connection settings
; SMTP_SERVER="10.0.0.0"
; SMTP_PORT=25
; SMTP_SENDER_NAME="Atlas Hub"
; SMTP_SENDER_EMAIL="noreply@example.net"
; SMTP_DEFAULT_RECIEVER="noreply@example.net"
; SMTP_SUBJECT_PREFIX="### "

; ORG_NAME="My Org"
; auth options are SAML, DEV and LDAP
; a new install will be set at DEV, meaning
; you can login with the username 'admin'
; and no password. This should be changed to
; SAML or LDAP before adding sensitive information
; to the site.
; AUTH_METHOD="SAML"

; Optionally use an external database
; DATABASE=postgresql+psycopg2://user:password@host/db

[NGINX]
; Optional cert and key to enable HTTPS
; Adding the cert and key will auto-enable https
; NGINX_HTTPS_CERT='/usr/atlas-hub/cert.crt'
; NGINX_HTTPS_CERT_KEY='/usr/atlas-hub/cert.crt'

[AUTH]
; optionally require users to be part of a SAML or LDAP
; group before they can access the site
; REQUIRED_GROUPS=["Analytics","My Friends"]

[LDAP]
; LDAP_HOST="ldap.host.net"
; LDAP_BASE_DN="OU=RHC & Offsite Locations,OU=Employees,DC=MyOrg,DC=net"
; LDAP_USER_OBJECT_FILTER="(|(sAMAccountName=%%s)(userPrincipalName=%%s))"
; LDAP_USERNAME="MYORG\\username"
; LDAP_PASSWORD="password"

[SAML]
; meta and certs required for saml to work.
; saml metadata is access at $EXTERNAL_URL/saml2/metadata/
; four claims are needed from your saml server:
; "name" (full name), "emailAddress", "surname" (last name),
; "givenName" (first name), "group" (users groups)
; REMOTE_META_URL=https://rhcfs.MyOrg.net/FederationMetadata/2007-06/FederationMetadata.XML
; SAML_CERT='/usr/atlas-hub/cert.crt'
; SAML_CERT_KEY='/usr/atlas-hub/cert.key'
; CONTACT_PERSON_FIRST_NAME="first"
; CONTACT_PERSON_LAST_NAME="last"
; CONTACT_PERSON_COMPANY=""
; CONTACT_PERSON_EMAIL=""
```

## Reconfiguring Atlas

After making changes to the `/etc/atlas-hub/confi.ini` file you should reconfigure the tool.

```bash
atlas-hub --configure
```
