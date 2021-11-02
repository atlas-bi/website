---
title: Configuration
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: AH Configuration
  title: Configuration
  parent: Automation Hub
  order: 9
---

# Setting Up Atlas Hub

## Getting Started

A configuration file should be created at the project root, along size the ``config.py`` file.

The custom configuration file should be called ``config_cust.py``. Settings can be copied from ``config.py`` and updated as needed.

## Creating Database

```python
flask db init
flask db migrate
flask db upgrade
flask cli seed

# add demo data in needed
# flask cli seed_demo
```
## Tips

If you use hostnames vs IP addresses in your config files be sure to update hosts file ``nano /etc/hosts`` to include the ip address of any internal domain hosts you will use. For example, LDAP server, GIT server, any databases you plan to query, etc.
