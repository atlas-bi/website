---
title: Monitoring Windows servers - how to install and enable SSH
tags: System
description: Atlas System upgrades can easily be installed using apt update and apt install commands. Take a backup before configuring.
keywords: atlas, atlas system, extract scheduler, etl, configuration, ubuntu server
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AH Configur

  title: Windows Server
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
      - name: Monitors
        url: '{{ site.url }}/docs/system/monitors'
        position: 4
---

# Windows Server

Window server monitor uses SSH to collect data.

{% admonition
   "alert",
   "Note",
   "Powershell version >= 5.1 is required."
%}

## Enabling SSH on Windows Servers

1. Download the latest release of [OpenSSH-Win[32 or 64].zip](https://github.com/PowerShell/Win32-OpenSSH/releases)
2. Unzip the contents into `c:/Program Files/OpenSSH-Win64` (or 32 depending on your download)
3. Edit the system path to include the new folder (Control Panel > System > Advanced > Environment Variables)

Next run some of the Powershell scripts (as administrator) that are in the new folder to setup open ssh.

```ps1
.\install-sshd.ps1
.\ssh-keygen.exe -A

# check that the setup is ok

.\FixHostFilePermissions.ps1
```

Now if you have firewall enabled you can add a firewall rule to allow connections via port 22.

1. Open Control Panel > System and Security > Windows ... Firewall > Advanced Settings
2. Add a new "Inbound Rule"
3. Select type=custom
4. Select all programs
5. Select Protocol type=TCP
6. Select Local ports=Specific Ports and add `22`

Finally, edit the services to use a windows domain service account that is part of the PC's administrator group.

1. Open Services
2. Find the two `OpenSSH` services.
3. Set them both to start automatically.
4. On the Properties > Log On add your admin service account.

_Start the services!_

## Troubleshooting

**The services may fail to start.** This is normal and some security points may need to be added to your administrator group.

See [here](https://github.com/PowerShell/Win32-OpenSSH/issues/1824) for a list of specific security points to check.

**Another guide** to help with troubleshooting: https://hostadvice.com/how-to/how-to-install-an-openssh-server-client-on-a-windows-2016-server/

**EAI_AGAIN**

EAI_AGAIN error is a error in resolving the hostname. Either use IP addresses or update the host file on your server with the correct mapping (`nano /etc/hosts`)
