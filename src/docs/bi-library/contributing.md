---
title: Contributing | Atlas BI Library Docs
tags: BI Library
description: Learn about how you can contribute to the Atlas BI Library project. Contributions are welcome.
keywords: atlas, atlas bi library, unified report library, data governance, database, congributing, useful tools
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Contributing
  title: Contributing
  parent: BI Library
  order: 9
---

# Contributing to Atlas BI Library

Contributions to the Atlas tools are welcome! Contributions are best made through a [pull request](https://github.com/atlas-bi/atlas-bi-library/pulls) on the Github repository.

We ask that you use [`pre-commit`](https://pre-commit.com) to ensure code is formatted correctly, and cleaned, before submitting a pull request. The Atlas `pre-commit` hooks will also ensure that you database connection string is not accidentally inserted into the model context files.

`Pre-commit` is simple to use. From your terminal inside the repository, run ``pre-commit install``. Subsequently, every commit you make will automatically be checked before being committed.


## Other Useful Tools

There are a few other tools we've found useful. 

::: content
- [Sublime Text](https://www.sublimetext.com) - Visual Studio can be quite slow when editing non c# files.
- [Poetry](https://python-poetry.org) - for managing python dependencies
- [Pre-commit](https://pre-commit.com) - for reformatting and cleaning code before committing
:::
