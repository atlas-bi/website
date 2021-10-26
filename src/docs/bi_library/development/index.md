---
title: Development
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: BIL Development
  title: Development
  parent: BI Library
  order: 3
---

# Development


See `Development Requirements` before getting started.

## Code Management

The code is revision controlled with [git](https://git-scm.com). You will also have a code server to safely store the code.

{% admonition
   "note",
   "Note",
   "Having private repositories make it easier to manage passwords. If you do not already have a git server setup, [GitLab](https://about.gitlab.com/install/) or [Gitea](https://gitea.com) are both free and very simple to setup and manage.

GitLab includes ``GitLab Runner`` which can be used for auto testing and deploys. Gitea is more lightweight but integrates very nicely with [``Drone-Ci``](https://www.drone.io)."
%}

The code most likely ended up on your workstation from the [Github repository](https://github.com/atlas-bi/atlas-bi-library). For the sake of this guide we will assume that it is your code server.

```bash
# you've create an empty folder and are now inside it
git init
git remote add origin git@github.com:atlas-bi/atlas-bi-library.git
git pull origin master
```

## Make some updates

Now, assume you've made some changes to the code. Maybe you've:

::: content
- changed one of the c# helper functions
- tweak the colors in the UI
- modified some javascript
:::

Visually test your changes by running the website locally -

<div class="box is-flex is-justify-content-center">
{% image "./src/static/img/bi_library/development/iisexpress.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}
</div>

The first time you start up the app there will most likely be two SSL prompts.

<div class="block tile">
    <div class="box is-flex is-justify-content-center tile mr-3">
        {% image "./src/static/img/bi_library/development/ssl_warning.png", "ssl warning", "(min-width:800px) 50vw, 100vw" %}
    </div>
    <div class="box is-flex is-justify-content-center tile mr-3">
        {% image "./src/static/img/bi_library/development/ssl_confirm.png", "ssl confirm", "(min-width:800px) 50vw, 100vw" %}
    </div>
</div>

::: content
- it is wise to run the [Selenium tests](/docs/bi_library/development/testing) to check for browser issues
- next you can commit your code, since you've installed pre-commit your code will be validated.
:::

```bash
git add . && git commit -m "did some cool updates" && git push
````

## Deploy

If you changes have tested nicely you can [deploy](/docs/bi_library/deploy) the updates.

It is strongly recommended to have two instances of Atlas (Atlas and Atlas-Test).

First, [deploy](/docs/bi_library/deploy) to test, and if user testing is ok, then [deploy](/docs/bi_library/deploy) to prod.
