---
title: Dev Requirements
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Dev Requirements
  parent: Development
  order: 1
---

# Dev Requirements

Doing development on Atlas is fairly simple. The Web App is developed using [Visual Studio 2017+](https://visualstudio.microsoft.com/downloads/). 

Tests are run with Python + Selenium.

## Visual Studio Requirements

::: content
- Full install of [Visual Studio 2017+](https://visualstudio.microsoft.com/downloads/)
- Visual Studio's ``SQL Server Integration Services Projects`` extension
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/vs_extension.png", "Extension", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``ASP.NET and web development`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/dotnet.png", "asp.net component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``Data Storage and Processing`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/sqlservices.png", "sql services component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- ``Razor Language Services`` component
  <div class="box is-flex is-justify-content-center">
  {% image "./src/static/img/bi_library/requirements/razor.png", "razor component", "(min-width:800px) 50vw, 100vw" %}
  </div>
- [Python 3.7+](https://www.python.org/downloads/) 
- [Microsoft .NET SDK 5.0.103 (x86)](https://dotnet.microsoft.com/download/dotnet/5.0)
:::


## Other Useful Tools

::: content
- [Pyenv](https://github.com/pyenv/pyenv) for managing python environments
- [Poetry](https://python-poetry.org) for managing dependencies
- [Precommit](https://pre-commit.com)  for reformating code before committing
- [Tox](https://tox.readthedocs.io/en/latest/index.html)  running tests, verifying code
:::
