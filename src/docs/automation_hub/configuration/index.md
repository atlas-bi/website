---
title: Configuration
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: Configuration
  parent: Automation Hub
  order: 5
---

# Setting Up EM2


## Getting Started


EM2's configuration files are in three places:

* ``em_web/config.py``
* ``em_scheduler/config.py``
* ``em_runner/config.py``

These files need to be updated with parameters specific to you.

## Creating Database

.. code:: python

    flask db init
    flask db migrate
    flask db upgrade
    flask cli seed

    # add demo data in needed
    # flask cli seed_demo

## Tips


If you use hostnames vs IP addresses in your config files be sure to update hosts file ``nano /etc/hosts`` to include the ip address of any internal domain hosts you will use. For example, LDAP server, GIT server, any databases you plan to query, etc.
