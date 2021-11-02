---
title: Authentication
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: AH Authentication
  title: Authentication
  parent: AH Configuration
  order: 1
---

# Authentication


There are two primary authentication options -

:::content
- SAML2
- LDAP
:::

## SAML2

The [PySAML2](https://pysaml2.readthedocs.io) library is used for SAML authentication, and all the ``sp`` configuration parameters are supported. See the example config file for an ADFS setup example.

{% admonition
   "note",
   "Note",
   "SAML2 requires that the [xmlsec1](https://pysaml2.readthedocs.io/en/latest/install.html#install-pysaml2) binary be present and mapped to in the config file."
%}

## LDAP

LDAP login follows this basic process:

:::content
1. config.py file holds the general connection info. A connection to the ldap server is made with the service account credentials supplied in the config file.
2. Once a connection is established and a user attempts to access the site the package first verifies that the user exists, by doing a search for the user. If the user exists we save their details and groups.
3. If the user exists then we attempt to log them in.. this returns true if they had a valid username/pass.
4. Finally, as this site can be restricted to users in a certain LDAP group, for example, we only allow users that have the "Analytics" group on their profile.
:::


{% admonition
   "note",
   "Note", 
   "The python package [python-simpleldap](https://github.com/gdub/python-simpleldap) has been customized to work with this installation, but most paramters will be accepted."
%}
