---
title: Server Setup
tags: System
description: How to install Atlas System. Easily download and install with our ppa through apt!
keywords: atlas, atlas system, extract scheduler, etl, install, guide, ubuntu server
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AS Server Setup
  title: Server Setup
  parent: System
  order: 2
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

# Prepare the Server

A few system packages are needed:

- Curl: used to downloading the install
- Nginx: used as a webserver proxy
- Pm2: used as the system runner
- Node 18: the website is build in node
- Dotnev: used to pass variables into the site
- Lsof: (ubuntu, centos); needed to check open ports
- Git: (ubuntu, centos); needed for installs
- Grep: (apline); need to update default version
- System build tools

{% admonition
   "note",
   "Note",
   "Many of the commands below require root access. If you are not a root user, run them with `sudo`."
%}

### Install Deps

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
apt-get update
apt-get -y install curl nginx lsof build-essential git
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm i -g pm2 dotenv-cli
pm2 install pm2-logrotate

# allow pm2 to start on reboot (need sudo if you are not running as root)
pm2 startup
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
apk add --no-cache curl nginx nodejs npm grep
npm i -g pm2 dotenv-cli
pm2 install pm2-logrotate

# allow pm2 to start on reboot (need sudo if you are not running as root)
pm2 startup
```

'
},
{
name:'CentOS',
id: 'centos',
content: '

### Update Report Lists

```bash
# mirror streams may need to be updated.
sed -i \'s/mirrorlist/#mirrorlist/g\' /etc/yum.repos.d/CentOS-Linux-*
sed -i \'s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g\' /etc/yum.repos.d/CentOS-Linux-*

# add source for latest curl (default older curl is missing flags)
cat > /etc/yum.repos.d/city-fan.repo << EOF
[CityFan]
name=City Fan Repo
baseurl=http://www.city-fan.org/ftp/contrib/yum-repo/rhel\\\$releasever/\\\$basearch/
enabled=1
gpgcheck=0
EOF

yum clean all
yum install -y curl

curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum -y install nodejs nginx lsof git gcc gcc-c++ make
npm i -g pm2 dotenv-cli
pm2 install pm2-logrotate

# allow pm2 to start on reboot (need sudo if you are not running as root)
pm2 startup
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}
You can check the node version by running `node --version`.
