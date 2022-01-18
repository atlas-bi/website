---
title: Configuration | Atlas Automation Hub Docs
tags: Automation Hub
description: Configuring Atlas Automation Hub is done through an ini file installed in /etc/atlas-hub/config.ini. Defaults are preset.
keywords: atlas, atlas automation hub, extract scheduler, etl, configuration
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Configuration
  title: Configuration
  parent: Automation Hub
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
        url: '{{ site.url }}/docs/automation-hub/'
        position: 3
---

# Configuration

When you installed Atlas Hub a default configuration file was added to `/etc/atlas-hub/config.ini`. This file should be edited to meet your needs.

Keep in mind that special characters, like `%` need to be escaped.

```ini
[MASTER]
; web address used to access the site
EXTERNAL_URL='localhost'

; min requirements to keep tasks running
; MIN_DISK_SPACE=1 * 1024 * 1024 * 1024
; MIN_FREE_MEM_PERC=3
; MIN_FREE_CPU_PERC=3

; connection information for gitlab hosted code
; GIT_URL="https://git.example.net/"
; GIT_USERNAME="username"
; GIT_PASSWORD=r"password"
; GIT_TOKEN=r"token"

; connection information for back smb server
; SMB_USERNAME="username"
; SMB_PASSWORD="password"
; SMB_SERVER_IP="10.0.0.0"
; SMB_SERVER_NAME="servername"
; SMB_DEFAULT_SHARE="BackupShare"

; email connection settings
; SMTP_SERVER="10.0.0.0"
; SMTP_PORT=25
; SMTP_SENDER_NAME="Atlas Automation Hub"
; SMTP_SENDER_EMAIL="noreply@example.net"
; SMTP_DEFAULT_RECIEVER="noreply@example.net"
; SMTP_SUBJECT_PREFIX="### "

; ORG_NAME="My Org"
; auth options are SAML, DEV and LDAP
; AUTH_METHOD="SAML"

[NGINX]
; Optional cert and key to enable HTTPS
; Adding the cert and key will auto-enable https
; NGINX_HTTPS_CERT='/usr/atlas-hub/cert.crt'
; NGINX_HTTPS_CERT_KEY='/usr/atlas-hub/cert.crt'

[LDAP]
; REQUIRED_GROUPS=[b"Analytics"]
; LDAP_HOST="ldap.host.net"
; LDAP_BASE_DN="OU=RHC & Offsite Locations,OU=Employees,DC=MyOrg,DC=net"
; LDAP_USER_OBJECT_FILTER="(|(sAMAccountName=%%s)(userPrincipalName=%%s))"
; LDAP_USERNAME="MYORG\\username"
; LDAP_PASSWORD="password"

[SAML]
; meta and certs required for saml to work.
; saml metadata is access at $EXTERNAL_URL/saml2/metadata/
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
