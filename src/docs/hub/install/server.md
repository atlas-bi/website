---
title: Server Setup | Setup a server for Atlas Hub with Ubuntu/CentOS/Alpine
tags: Hub
description: Server setup for Ubuntu/CentOS/Alpine servers in preparation for an Atlas Hub installation.
keywords: atlas, atlas hub, extract scheduler, etl, install, guide, ubuntu server, centos, alpine
layout: docs_hub.njk
date: Last Modified
eleventyNavigation:
  key: AH Server Setup
  title: Server Setup
  parent: Hub
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
      - name: Docs
        url: '{{ site.url }}/docs/hub/'
        position: 3
---

# Prepare the Server

The primary server requirement is disk space - have enough space to hold 2x the data you plan to transfer. Atlas Hub streams all data, so the memory requirements are low, however 8 or 16gb are a good starting place.

A few system packages are needed:

- Curl: used to downloading the install
- Nginx: used as a webserver proxy
- Node 18: used for building assets
- Dotnev: used to pass variables into the site
- Lsof: (ubuntu, centos); needed to check open ports
- Git: (ubuntu, centos); needed for installs
- Grep: (apline); need to update default version
- Gnupg2: for gpg encryption
- Redis: used for caching and job storage
- Sqlite: used for connecting to sqlite databases
- Xmlsec: used for SAML request validation
- libldap2-dev: used for LDAP authentication
- unixodbc: used for database connections
- Python 3.10: use to run the website, runner and scheduler
- Poetry: used as the python package manager
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
apt-get -y install curl nginx lsof build-essential git gnupg2 \\
           nano redis-server sqlite3 libsqlite3-0 pkg-config \\
           libxml2-dev libxmlsec1-dev libxmlsec1-openssl \\
           libldap2-dev python3-dev libsasl2-dev ldap-utils \\
           libssl-dev libffi-dev unixodbc unixodbc-dev libpq-dev

curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm i -g pm2
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
apk add --no-cache curl nginx nodejs npm grep gnupg redis \\
                   sqlite sqlite-libs build-base libressl \\
                   libffi-dev libressl-dev libxslt-dev \\
                   libxml2-dev xmlsec-dev xmlsec \\
                   nano openldap-dev python3-dev wget \\
                   libffi-dev unixodbc unixodbc-dev libpq-dev
npm i -g pm2
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

# add source for xmlsec pacakges
yum install -y dnf-plugins-core
yum config-manager --set-enabled powertools

yum clean all
```

### Install Deps

```bash
yum install -y curl

curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum -y install nodejs nginx lsof git gcc gcc-c++ make gnupg2 \\
       redis sqlite sqlite-libs libxml2-devel xmlsec1-devel \\
       xmlsec1-openssl-devel libtool-ltdl-devel openssl-devel \\
       unixODBC unixODBC-devel libpq-devel nano \\
       bzip2-devel libffi-devel wget yum-utils zlib-devel

yum groupinstall "Development tools"
yum install -y openldap-devel python-devel
npm i -g pm2
pm2 install pm2-logrotate

# allow pm2 to start on reboot (need sudo if you are not running as root)
pm2 startup
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}
You can check the node version by running `node --version`.

### Install Python

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa
apt install python3.10
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
wget https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz
tar xzf Python-3.10.12.tgz
rm -f Python-3.10.12.tgz
cd Python-3.10.12
./configure --with-system-ffi --enable-optimizations --with-computed-gotos --enable-loadable-sqlite-extensions
make install
cd ..
rm -fr Python-3.10.12
```

'
},
{
name:'CentOS',
id: 'centos',
content: '

```bash
wget https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz
tar xzf Python-3.10.12.tgz
rm -f Python-3.10.12.tgz
cd Python-3.10.12
./configure --with-system-ffi --enable-optimizations --with-computed-gotos --enable-loadable-sqlite-extensions
make -j ${nproc}
make altinstall
cd ..
rm -fr Python-3.10.12
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}
You can check your python version by running `python3.10 --version`.

### Install virtualenv

```bash
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10
python3.10 -m pip install virtualenv
```

### Install Poetry

Poetry is used as the python package manager.

```bash
curl -sSL https://install.python-poetry.org | python3.10 -
```

In the installer output will be a command you can run to add poetry to your path. Run it now.

```bash
export PATH="/root/.local/bin:$PATH"
```

Check if it is installed correctly by running `poetry --version`.

### Start Redis

Start up redis if this is the first time you are using redis on the server.

```bash
systemctl enable redis-server
systemctl start redis-server

# or on docker
redis-server --daemonize yes
```

You can check if `redis` is online by running `redis-cli ping`.
