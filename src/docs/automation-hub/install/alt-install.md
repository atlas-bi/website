---
title: Alternate Install Method | Atlas Automation Hub Docs
tags: Automation Hub
description: Alternate installation method for Atlas Automation Hub. The app can also be installed manually using curl and a python script.
keywords: atlas, atlas automation hub, extract scheduler, etl, alternate install
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Alt Install
  title: Alternate Install
  parent: Automation Hub
  order: 7
---

# Alternate Installation Methods

## Prerequisites

:::content

- Atlas Automation Hub is setup to install on an Ubuntu server, however with a few tweaks to the install script it will work well on most Linux OS.
- curl or wget should be installed
- Ideally, you will have your own git repository, holding updated config files, and will publish from there.
  :::

An install script is provided to easily install onto your Ubuntu server. Update the `publish/install.sh` file "dns" value to be the dns of your server, and the "remote" to point to your repo path. If you plan to use ssl you can add the certs into the `publish` folder as well. Use names "cert.crt" and "cert.key".

The publish takes place over SSH from a git server. It is possible to use an accesskey when publishing from fabric.

Update username and hostname with your planned login. Commands require sudo. `sudo bash...`

| Method | Command                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| fabric | `cd publish && fab publish && cd ..`                                                                                         |
| curl   | `bash -c "$(curl -kfsSL https://raw.githubusercontent.com/Riverside-Healthcare/extract_management/main/publish/install.sh)"` |
| wget   | `bash -c "$(wget -O- https://raw.githubusercontent.com/Riverside-Healthcare/extract_management/main/publish/install.sh)"`    |

After cloning the repository the `install.sh` script will install all packages necessary to start up the app.

## Configuration

A configuration file should be created at the project root, along size the `config.py` file.

The custom configuration file should be called `config_cust.py`. Settings can be copied from `config.py` and updated as needed.

At a minimum, the `config_cust.py` should import the base configuration.

```py
from config import Config as BaseConfig

class Config(BaseConfig):
    ALLOWED_HOSTS = ["localhost"]
    ...
```

## Creating Database

```python
export FLASK_APP=web;export FLASK_DEBUG=0;export FLASK_ENV=production;
flask db init;
flask db upgrade;
flask cli seed

# add demo data in needed
# flask cli seed_demo
```

## Authentication

There are two primary authentication options -

:::content

- SAML2
- LDAP
  :::

### SAML2

The [PySAML2](https://pysaml2.readthedocs.io) library is used for SAML authentication, and all the `sp` configuration parameters are supported. See the example config file for an ADFS setup example.

{% admonition
   "note",
   "Note",
   "SAML2 requires that the [xmlsec1](https://pysaml2.readthedocs.io/en/latest/install.html#install-pysaml2) binary be present and mapped to in the config file."
%}

### LDAP

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
