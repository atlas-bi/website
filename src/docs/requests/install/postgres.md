---
title: Postgres
tags: Requests
description: How to install Atlas Requests. Easily download and install with our ppa through apt!
keywords: atlas, atlas requests, extract scheduler, etl, install, guide, ubuntu server
layout: docs_requests.njk
date: Last Modified
eleventyNavigation:
  key: AS Postgres
  title: Postgres Install Guide
  parent: Requests
  order: 3
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Requests
        url: '{{ site.url }}/docs/requests/'
        position: 3
---

# Setup Postgres

Atlas Requests uses a Postgres database. The database can be shared and on another server. Here's a short install guide if you would like to set everything on the same server.

After setting up the database you should revisit the postgres config and tune it to work best on your server.

## Install Packages

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
apt install -y postgresql postgresql-contrib
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
apk add postgresql postgresql-contrib
```

'
},
{
name:'CentOS',
id: 'centos',
content: '

```bash
# on new servers the mirror streams may need to be updated.
sed -i \'s/mirrorlist/#mirrorlist/g\' /etc/yum.repos.d/CentOS-Linux-*
sed -i \'s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g\' /etc/yum.repos.d/CentOS-Linux-*

# find latest version
dnf module list postgresql

# install latest version
dnf module enable -y postgresql:13
yum install -y postgresql-server postgresql-contrib
```

'
}] %}

{% include "src/\_includes/components/tabs.njk" %}

## Start Postgres

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
systemctl start postgresql

# let it start on reboot
systemctl enable postgresql
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
mkdir /run/postgresql
chown postgres:postgres /run/postgresql/

# next switch over to the postgres non-root user.
# run commands individually and not as a batch.
su postgres -
mkdir /var/lib/postgresql/data
chmod 0700 /var/lib/postgresql/data
initdb -D /var/lib/postgresql/data
pg_ctl start -D /var/lib/postgresql/data
exit

```

'
},
{
name:'CentOS',
id: 'centos',
content: '

```bash
systemctl start postgresql

# let it start on reboot
systemctl enable postgresql

# initialize postgres
postgresql-setup --initdb
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}

### If you are running in Docker...

If you are demoing in docker you will need run different commands to get it started as docker doesn't include `systemd`.

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
apt install -y sudo
/etc/init.d/postgresql start
```

'
},{
name:'Alpine',
id: 'alpine',
content: 'No extra steps needed.'
},
{
name:'CentOS',
id: 'centos',
content: '

```bash
yum install -y sudo
sudo -u postgres /usr/bin/initdb /var/lib/pgsql/data/ --no-locale --encoding=UTF8
sudo -u postgres /usr/bin/pg_ctl start -D /var/lib/pgsql/data -s -o "-p 5432" -w -t 300
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}

## Create a user and database

```bash
# create a web user
su - postgres -c "psql --command \"CREATE USER web_user WITH PASSWORD '1234_with_single_quotes';\""

# give user access to a db
su - postgres -c "createdb -O web_user atlas-requests"
```
