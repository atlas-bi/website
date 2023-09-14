---
title: Publish | Learn about how to deploy Atlas Library onto your web server
tags: Library
description: Deploying the build of Atlas from your /out directory is simple. If you are doing an update or redeploying, a few services should be stopped before copying in the new build. In window services, find and stop "solr", or use this command in your cmd terminal.
keywords: atlas, atlas library, unified report library, data governance, database, publishing, iis, deploy, visual studio
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Publish
  title: Publish
  parent: BIL Deploy
  order: 3
---

# Publish

{% admonition
   "alert",
   "Attention",
   "Ensure that the destination server has the same .NET *version* `Hosting Bundle`."
%}

{% admonition
   "note",
   "Note",
   "This guide assumes you have already created the Atlas Databases, run the ETL to populate the database, and added your database connection as specified in the [`configuration guide`](/docs/library/deploy/configuration/)"
%}

## Deploy to IIS

Deploying the build of Atlas from your `/out` directory is simple. If you are doing an update or redeploying, a few services should be stopped before copying in the new build.

First, stop solr search engine.

In window services, find and stop "solr", or use this command in your cmd terminal.

```bash
net stop solr
```

Next, stop the Atlas website in IIS, or use this command in your cmd terminal.

```bash
Powershell.exe -Command "Stop-Website -Name atlas"
```

Then stop the Atlas pool in IIS, or use this command in your cmd terminal.

```bash
Powershell.exe -Command "Stop-WebAppPool -Name atlas"
```

Now, copy the contents of the `/out` folder onto the atlas website folder (probably `C:\inetpub\wwwroot\atlas`) on your server.

Turn all the services on in reverse order that you used in turning them off.

```bash
Powershell.exe -Command "Start-WebAppPool -Name atlas"
Powershell.exe -Command "Start-Website -Name atlas"
net start solr
```

{% admonition
   "note",
   "Note",
   "It is possible your app pool and website will have a different name than give here. Check your IIS Manager to see the exact names to use in your case."
%}

## Automatic Deploys

Atlas can be automatically deployed over SSH. Here's an example script from a `gitlab ci/cd` system.

{% set collapse={
title: 'Read the example script',
contents: '

```yaml
stages:
  - build
  - publish

# The build stage clones the latest code from github and adds in custom settings files.
build:
  stage: build
  image: alpine:latest
  only:
    - master
  before_script:
    - apk add --no-cache git
    - git config --global user.email "$GITLAB_USER_EMAIL"
    - git config --global user.name "$GITLAB_USER_NAME"

  script:
    - rm -rf .git
    - mkdir code && cd code
    - git clone --depth=1 -b master https://github.com/atlas-bi/atlas-bi-library.git .
    - rm -rf .git
    - rm -f .gitignore
    - git init
    - git remote add origin https://oauth2:${CI_PUSH_TOKEN}@$CI_SERVER_HOST/$CI_PROJECT_PATH.git || git remote set-url origin https://oauth2:${CI_PUSH_TOKEN}@$CI_SERVER_HOST/$CI_PROJECT_PATH.git
    - git config user.email "$GITLAB_USER_EMAIL"
    - git config user.name "$GITLAB_USER_NAME"
    - git config --global http.postBuffer 1048576000

    # move in ci (this script)
    - mv $CI_PROJECT_DIR/.gitlab-ci.yml $CI_PROJECT_DIR/code/.gitlab-ci.yml

    # move in custom config
    - mv $CI_PROJECT_DIR/appsettings.Development.json $CI_PROJECT_DIR/code/web/appsettings.cust.Development.json
    - mv $CI_PROJECT_DIR/appsettings.json $CI_PROJECT_DIR/code/web/appsettings.cust.json

    - git add . && git commit -m "build"
    # force to remove history on branch
    - export GIT_SSL_NO_VERIFY=1 && git push --force --follow-tags origin HEAD:build

# After getting code we can run a build.
build_web:
  image: mcr.microsoft.com/dotnet/sdk:7.0-alpine
  stage: build
  only:
    - build
  before_script:
    - apk add --no-cache nodejs npm
    - npm install
  script:
    - npm run dotnet:publish
  artifacts:
    paths: [\'/builds/atlas/library/web/atlas-prod-net-deploy/out/\']
    expire_in: 1 week

# Run database migrations.
migrate:
  image: mcr.microsoft.com/dotnet/sdk:7.0-alpine
  stage: build
  variables:
    ASPNETCORE_ENVIRONMENT: \'Production\'
  only:
    - build
  when: manual
  before_script:
    - dotnet tool install --global dotnet-ef
    - export PATH="$PATH:/root/.dotnet/tools"
  script:
    - dotnet ef database update --project web/web.csproj -v

# Deploy the new site.
deploy_prod:
  image: alpine:latest
  stage: publish
  only:
    - build
  when: manual
  dependencies:
    - build_web
  needs: [build_web, migrate]
  before_script:
    - apk add --no-cache openssh
    - eval $(ssh-agent -s)
    - echo "$atlas_ssh_key" | ssh-add -
    - mkdir -p ~/.ssh
    - \'[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config\'
  script:
    # stop search, website, and app pool.
    - ssh $atlas_ssh_user@$atlas_server "net stop solr" || true
    - ssh $atlas_ssh_user@$atlas_server "Powershell.exe -Command \"Stop-Website -Name atlas\"" || true
    - ssh $atlas_ssh_user@$atlas_server "Powershell.exe -Command \"Stop-WebAppPool -Name atlas\"" || true
    # backup website
    - ssh $atlas_ssh_user@$atlas_server "cd C:\inetpub\wwwroot && Xcopy atlas atlas-bk-%Date:~10,4%_%Date:~7,2%_%Date:~4,2%\ /q /s /e /r /y"
    # load new site
    - scp -r /builds/atlas/library/web/atlas-prod-net-deploy/out/* $atlas_ssh_user@$atlas_server:/c:/inetpub/wwwroot/atlas
    # start app pool, website, and search
    - ssh $atlas_ssh_user@$atlas_server "Powershell.exe -Command \"Start-WebAppPool -Name atlas\""
    - ssh $atlas_ssh_user@$atlas_server "Powershell.exe -Command \"Start-Website -Name atlas\""
    - ssh $atlas_ssh_user@$atlas_server "net start solr"
```

'
} %}

{% include "src/\_includes/components/collapse.njk" %}
