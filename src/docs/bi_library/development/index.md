---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Development
  parent: BI Library
  order: 3
---

# Development


See `Development Requirements` before getting started.

## Other Useful Tools

::: content
- [Pyenv](https://github.com/pyenv/pyenv) for managing python environments
- [Poetry](https://python-poetry.org) for managing dependencies
- [Precommit](https://pre-commit.com)  for reformating code before committing
- [Tox](https://tox.readthedocs.io/en/latest/index.html)  running tests, verifying code
:::

## Basic Process

### Prepare to make changes

The code is revision controlled with [git](https://git-scm.com). You will also have a code server to safely store the code.

{% admonition
   "note",
   "Note",
   "Having private repositories make it easier to manage passwords. If you do not already have a git server setup, [GitLab](https://about.gitlab.com/install/) or [Gitea](https://gitea.com) are both free and very simple to setup and manage.

GitLab includes ``GitLab Runner`` which can be used for auto testing and deploys. Gitea is more lightweight but integrates very nicely with [Drone-Ci](https://www.drone.io)."
%}

The code most likely ended up on your workstation from the [Github repository](https://github.com/Riverside-Healthcare/Atlas-of-Information-Management). For the sake of this guide we will assume that it is your code server.

```bash
# you've create an empty folder and are now inside it
git init
git remote add origin git@github.com:Riverside-Healthcare/Atlas-of-Information-Management.git
git pull origin master

# you have already installed pre-commit, right?
# we can now add the git hooks for it.
pre-commit install
```

{% admonition
   "note",
   "Why Pre-Commit?",
   "Pre-Commit is used to automatically run formatting tests after you make code changes. Check out the ``.pre-commit-config.yaml`` for all tests.

::: content
- reformat c# code
- reformat and check json config files
- reformat and check toml and yaml python config files
- fix end of files for consistency
- reformat python code for consistency
- reformat & check js & css code
:::"
%}

### Make some updates

Now, assume you've made some changes to the code. You've:

::: content
- tweaked one of the c# helper functions
- changed some colors in the UI
- modified the analytics javascript
- fixed some spelling errors in the docs
:::

Visually test your changes by running the website locally -

<div class="box is-flex is-justify-content-center">
{% image "./src/static/img/bi_library/development/iisexpress.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}
</div>

The first time you start up the app there will most likely be two SSL prompts.

<div class="block tile">
    <div class="box tile md">
        {% image "./src/static/img/bi_library/development/ssl_warning.png", "ssl warning", "(min-width:800px) 50vw, 100vw" %}
    </div>
    <div class="box tile md">
        {% image "./src/static/img/bi_library/development/ssl_confirm.png", "ssl confirm", "(min-width:800px) 50vw, 100vw" %}
    </div>
</div>

::: content
- it is wise to run the Selenium tests to check for browser issues
- next you can commit your code, since you've installed pre-commit your code will be validated.
:::

```bash
git add . && git commit -m "did some cool updates" && git push
````

If you have CI turned on on your git server, you can auto generate the new documentation. Take a look in ``.gitlab-ci.yml`` for the steps to do that in Gitlab Runner, or ``.github/workflows`` for how to do it in Github or Drone-CI.

### Deploy

If you changes have tested nicely you can ``deploy`` the updates.

It is strongly recommended to have two instances of Atlas (Atlas and Atlas-Test).

First, ``deploy`` to test, and if user testing is ok, then ``deploy`` to prod.
