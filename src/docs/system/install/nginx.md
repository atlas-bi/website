---
title: Nginx | Setup Nginx for Atlas System on Ubuntu/CentOS/Alpine servers
tags: System
description: Install Nginx on Ubuntu/CentOS/Alpine servers in preparation for an Atlas System installation.
keywords: atlas, atlas system, extract scheduler, etl, install, guide, ubuntu server
layout: docs_system.njk
date: Last Modified
eleventyNavigation:
  key: AS Nginx
  title: Nginx Install Guide
  parent: System
  order: 4
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

# Setup Nginx

## Start Nginx

{% set tabData = [
{
name:'Ubuntu',
id: 'ubuntu',
content: '

```bash
systemctl enable nginx
systemctl start nginx

# or in docker
nginx
```

'
},{
name:'Alpine',
id: 'alpine',
content: '

```bash
nginx
```

'
},{
name:'CentOS',
id: 'centos',
content: '

```bash
systemctl enable nginx
systemctl start nginx

# or in docker
nginx
```

'
}] %}

{% include 'src/\_includes/components/tabs.njk' %}

## Create a Nginx Configuration

{% admonition
   "alert",
   "Attention",
   "Ensure the name of the `nginx` file is as shown below or system will not restart correctly."
%}

Replace `example.com` with your URL

```bash
cat > /etc/nginx/sites-enabled/atlas-system.conf << EOF
server {
  server_name example.com;
  location / {
    proxy_pass http://localhost:3000;
  }
}
EOF
```

If you plan to use `https` you can add a cert (note that certs in nginx should be "full chain", not just the final cert.):

```bash
cat > /etc/nginx/sites-enabled/atlas-system.conf << EOF
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

Test and reload the config if everything looks ok.

```bash
nginx -t
nginx -s reload
```
