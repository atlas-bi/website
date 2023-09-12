---
title: Configuring
tags: System
description: Atlas System upgrades can easily be installed using apt update and apt install commands. Take a backup before configuring.
keywords: atlas, atlas system, extract scheduler, etl, configuration, ubuntu server
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AH Configuration
  title: Configuration Guide
  parent: System
  order: 5
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: System
        url: '{{ site.url }}/docs/system/'
        position: 3
---

# Configuration Options

## Installer Configuration

Some items in the installer can be configured through an `installer.conf` file in the install directory. These settings are helpful if you are running multiple instances of Atlas Hub on the same server.

| Key        | Definition                                                               |
| ---------- | ------------------------------------------------------------------------ |
| NGINX_FILE | Alternate name for the `nginx` config file. Default is `atlas-hub.conf`. |
| PM2_PREFIX | Alternate prefix for `pm2` processes. Default is `atlas-hub`.            |

The file format should be:

```ini
KEY=VALUE
```

## App Configuration

Create/edit the project `.env`

```bash
mkdir -p /home/websites/atlas/system
cd /home/websites/atlas/system

nano .env
```

Here's a list of the config values that should be set.

```bash
DATABASE_URL="postgresql://web_user:1234_with_single_quotes@localhost:5432/atlas-system"
SESSION_SECRET="03efg9241c4fc6bc9b98529f69bfj5ce"

# saml sso configuration.
SAML_IDP_METADATA="http://localhost:7000/metadata"
SAML_SP_AUTHNREQUESTSSIGNED=false
SAML_SP_WANTMESSAGESIGNED=false
SAML_SP_WANTASSERTIONSIGNED=false
SAML_SP_WANTLOGOUTREQUESTSIGNED=false
SAML_PRIVATE_KEY="/etc/certs/idp-private-key.pem"
SAML_PRIVATE_KEY_PASS=""
SAML_ENC_PRIVATE_KEY="/etc/certs/idp-private-key.pem"
SAML_SP_ISASSERTIONENCRYPTED=false
SAML_SIGNING_CERT="/etc/certs/idp-private-key.crt"
SAML_ENC_CERT="/etc/certs/idp-private-key.crt"

# ldap settings.
LDAP_HOST=ldap://localhost
LDAP_START_TLS=false
LDAP_USERNAME=cn=admin,dc=example,dc=org
LDAP_PASSWORD=adminpassword
LDAP_BASE_DN=dc=example,dc=org
LDAP_GROUP_SEARCH=(objectClass=groupOfNames)
LDAP_USER_SEARCH=(&(objectClass=inetOrgPerson)(sn=*)(givenName=*)(displayName=*))
LDAP_EMAIL_FIELD=sn
LDAP_GROUP_NAME=cn
LDAP_FIRSTNAME=givenName
LDAP_LASTNAME=displayName
LDAP_PHOTO_FIELD=jpegPhoto
LDAP_USER_GROUP=memberOf

# email box settings
SMTP_HOST=localhost
SMTP_PORT=25
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_TLS=false
SMTP_SENDER_NAME=Atlas System | Riverside Healthcare Analytics
SMTP_SENDER_EMAIL=system-no-reply@system.atlas.bi
IMAP_HOST=localhost
IMAP_PORT=143

# the URL your site will be accessed at.
HOSTNAME=https://system.atlas.bi
```

# Configure

If this is a new install proceed to the install guide.

Update the app with your new configuration by running:

```bash
curl -sSL https://atlas.bi/installers/system.sh | bash -s -- --configure
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/system.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
