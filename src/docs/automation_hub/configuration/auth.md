---
title: Authentication
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: Authentication
  parent: Configuration
  order: 5
---

# Authentication


EM2 has two primary authentication options -

* SAML2
* LDAP

The flask-login module is used to handle the user session once we have verified their account.

## SAML2


The `PySAML2 <https://pysaml2.readthedocs.io>`_ library is used for SAML authentication, and all the ``sp`` configuration parameters are supported. See the example config file for an ADFS setup example.

.. note:: SAML2 requires that the `xmlsec1 <https://pysaml2.readthedocs.io/en/latest/install.html#install-pysaml2>`_ binary be present and mapped to in the config file.

## LDAP


LDAP login follows this basic process:

1. config.py file holds the general connection info. A connection to the ldap server is made with the service account credentials supplied in the config file.
2. Once a connection is established and a user attempts to access the site the package first verifies that the user exists, by doing a search for the user. If the user exists we save their details and groups.
3. If the user exists then we attempt to log them in.. this returns true if they had a valid username/pass.
4. Finally, as this site can be restricted to users in a certain LDAP group, for example, we only allow users that have the "Analytics" group on their profile.



.. note:: The python package `python-simpleldap <https://github.com/gdub/python-simpleldap>`_ has been customized to work with this installation, but most paramters will be exceptioed.
