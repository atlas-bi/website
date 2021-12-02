---
title: Atlas Automation Hub Docs » Development
tags: Automation Hub
description: Learn about the Atlas Automation Hub development process, and how to test the code.
layout: docs_hub.njk
eleventyNavigation:
  key: AH Development
  title: Development
  parent: Automation Hub
  order: 14
---

# Development

Atlas Hub is developed using python and a few helpful tools:

## Primary Tools

:::content
- `Pyenv <https://github.com/pyenv/pyenv>`_ for managing python environments
- `Poetry <https://python-poetry.org>`_ for managing dependencies
- `Precommit <https://pre-commit.com>`_  for reformating code before committing
- `Tox <https://tox.readthedocs.io/en/latest/index.html>`_  running tests, verifying code
:::

## Precommit Setup

To setup precommit hooks:

``` bash
precommit install
```

## Testing

Tests can be run with tox:

``` bash
tox
```

### Running Pytests

With Poetry:

``` bash
export FLASK_APP=em_web; export FLASK_ENV=test; poetry run python -m pytest --disable-warnings
```

With tox:

``` bash
tox -e clean,py39,cov

# or 

poetry run tox -e clean,py39,cov
```
