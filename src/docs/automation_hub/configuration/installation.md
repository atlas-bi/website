---
title: Installing
tags: Automation Hub
description: Atlas Docs
layout: docs_hub.njk
eleventyNavigation:
  key: AH Installing
  title: Installing
  parent: AH Configuration
  order: 2
---

# Installation

## Prerequisites

:::content
- Atlas Automation Hub is setup to install on an Ubuntu server, however with a few tweaks to the install script it will work well on most Linux OS.
- curl or wget should be installed
- Ideally, you will have your own git repository, holding updated config files, and will publish from there.
:::

An install script is provided to easily install onto your Ubuntu server. Update the ``publish/install.sh`` file "dns" value to be the dns of your server, and the "remote" to point to your repo path. If you plan to use ssl you can add the certs into the ``publish`` folder as well. Use names "cert.crt" and "cert.key".

The publish takes place over SSH from a git server. It is possible to use an accesskey when publishing from fabric.

Update username and hostname with your planned login. Commands require sudo. ``sudo bash...``

+----------+----------------------------------------------------------------------------------------------------------------------------------+
| Method   | Command                                                                                                                          |
+==========+==================================================================================================================================+
| fabric   | ``cd publish && fab publish && cd ..``                                                                                           |
+----------+----------------------------------------------------------------------------------------------------------------------------------+
| curl     | ``bash -c "$(curl -kfsSL https://raw.githubusercontent.com/Riverside-Healthcare/extract_management/main/publish/install.sh)"``   |
+----------+----------------------------------------------------------------------------------------------------------------------------------+
| wget     | ``bash -c "$(wget -O- https://raw.githubusercontent.com/Riverside-Healthcare/extract_management/main/publish/install.sh)"``      |
+----------+----------------------------------------------------------------------------------------------------------------------------------+

After cloning the repository the ``install.sh`` script will install all packages necessary to start up the app.
