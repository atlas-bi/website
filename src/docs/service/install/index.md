---
title: Install
tags: Service
description: How to install Atlas Service. Easily download and install with our ppa through apt!
keywords: atlas, atlas service, extract scheduler, etl, install, guide, ubuntu server
layout: docs_service.njk
date: Last Modified
eleventyNavigation:
  key: AS Install
  title: Install Guide
  parent: Service
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
      - name: Docs
        url: '{{ site.url }}/docs/service/'
        position: 3
---

# Install Guide

## Install Packages

A few system and npm packages are needed.

- Curl: used to downloading the install
- Nginx: used as a webserver proxy
- Pm2: used as the service runner
- Dotnev: used to pass variables into the site
- Lsof: (ubuntu, centos); needed to check open ports
- Git: (ubuntu, centos); needed for installs
- Grep: (apline); need to update default version
- System build tools

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
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
apk add --no-cache curl nginx nodejs npm grep
npm i -g pm2 dotenv-cli
```

'
},
{
name:'CentOS',
id: 'centos',
content: '

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
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}

## Setup the Project Directory

```bash
mkdir -p /home/websites/atlas/service
cd /home/websites/atlas/service
```

## Create a Nginx Configuration

{% admonition
   "alert",
   "Attention",
   "Ensure the name of the `nginx` file is as shown below or services will not restart correctly."
%}

Replace `example.com` with your URL and add a certificate for `https` if needed.

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
# start nginx
systemctl enable nginx
systemctl start nginx

# or in docker
nginx

# add a config
cat > /etc/nginx/sites-enabled/atlas-service.conf << EOF
server {
  server_name example.com;
  location / {
    proxy_pass http://localhost:3000;
  }
}
EOF

# test the config
nginx -t

# reload
nginx -s reload

```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
# start nginx
nginx

cat > /etc/nginx/http.d/atlas-service.conf << EOF
server {
  server_name example.com;
  location / {
    proxy_pass http://localhost:3000;
  }
}
EOF

# test the config
nginx -t

# reload
nginx -s reload
```

'
},{
name:'CentOS',
id: 'centos',
content: '

```bash
# start nginx
systemctl enable nginx
systemctl start nginx

# or in docker
nginx

# add a config
cat > /etc/nginx/conf.d/atlas-service.conf << EOF
server {
  server_name example.com;
  location / {
    proxy_pass http://localhost:3000;
  }
}
EOF

# test the config
nginx -t

# reload nginx
nginx -s reload
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}

Here's an example config for `https`:

```bash
cat > /etc/nginx/sites-enabled/atlas-service.conf << EOF
server {
  server_name example.com;
  location / {
    proxy_pass http://localhost:3000;
  }

    listen 443 ssl;
    ssl_certificate /etc/certs/fullchain.pem;
    ssl_certificate_key /etc/certs/privkey.pem;
}
server {
    if (\$host = example.com) {
        return 301 https://\$host\$request_uri;
    }
  listen 80;
  server_name example.com;
    return 404;
}
EOF
```

## Make a .env file

```bash
cat > .env << EOF
DATABASE_URL="postgresql://web_user:1234_with_single_quotes@localhost:5432/atlas-service"
EOF
```

## Run the Installer

```bash
curl https://atlas.bi/installers/service.sh | bash -
```

{% set collapse={
title: 'Read the installer source code',
contents: '

```bash
{% include "src/installers/service.njk" %}
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
