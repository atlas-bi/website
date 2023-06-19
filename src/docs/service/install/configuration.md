---
title: Configuring
tags: Service
description: Atlas Service upgrades can easily be installed using apt update and apt install commands. Take a backup before configuring.
keywords: atlas, atlas service, extract scheduler, etl, configuration, ubuntu server
layout: docs_service.njk
date: Last Modified
eleventyNavigation:
  key: AH Configur

  title: Configuration Guide
  parent: Service
  order: 4
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
        url: '{{ site.url }}/docs/service/'
        position: 3
---

Configuration Options

```bash
DATABASE_URL="postgresql://web_user:1234_with_single_quotes@locahost:5432/atlas-service"
SESSION_SECRET="03efg9241c4fc6bc9b98529f69bfj5ce"

SAML_IDP_METADATA="http://localhost:7000/metadata"
SAML_SP_AUTHNREQUESTSSIGNED=false
SAML_SP_WANTMESSAGESIGNED=false
SAML_SP_WANTASSERTIONSIGNED=false
SAML_SP_WANTLOGOUTREQUESTSIGNED=false
SAML_PRIVATE_KEY="/etc/certs/idp-private-key.pem"
SAML_PRIVATE_KEY_PASS=""

SAML_ENC_PRIVATE_KEY="/etc/certs/idp-private-key.pem"
SAML_SP_ISASSERTIONENCRYPTED=false

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

SMTP_HOST=localhost
SMTP_PORT=25
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_TLS=false
SMTP_SENDER_NAME=Atlas Requests | Riverside Healthcare Analytics
SMTP_SENDER_EMAIL=requests-no-reply@service.atlas.bi
IMAP_HOST=localhost
IMAP_PORT=143


```

# Configure

```bash
curl -sSL https://atlas.bi/installers/service.sh | bash -s -- --configure
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/service.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
