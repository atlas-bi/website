---
title: Testing | Development | Atlas BI Library Docs
tags: BI Library
description: Learning about how to test the Atlas BI Library code. Tests are run with python and selenium and try to catch any javasript errors.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Testing
  title: Testing
  parent: BIL Deploy
  order: 5
---

# Testing

Atlas has some basic tests that can be run with [selenium](https://selenium-python.readthedocs.io). The selenium tests are used to check for any browser issues - broken links, javascript errors in IE11, etc.

Python is used as to run selenium.

## Requirements

::: content
- [Python 3.7+](https://www.python.org/downloads/)
- (Optional) [Poetry](https://python-poetry.org) - For managing dependencies
- [Chrome web driver](https://chromedriver.chromium.org/downloads)
- [IE 11 web driver](https://www.microsoft.com/en-us/download/details.aspx?id=44069)
:::

Move the two web drivers into the `testing` directory after downloading.

## Setup

Install the python packages
```bash
poetry install # if you have installed poetry, otherwise, 
pip install selenium urllib3
```

{% admonition
   "alert",
   "Attention",
   "The version of the chrome web driver **must** match the version of chrome you have installed."
%}

{% admonition
   "note",
   "Note",
   "By default tests will run in both IE11 and Chromium."
%}

{% admonition
   "note",
   "Note",
   "The ``url_test.py`` will attempt to access several hundred URL. You can update this list to match the top hits on your instance. Run a sql query on your instance to build the list.

   ```sql
      select top 500
        concat('''',pathname , replace(search, '?EPIC=1','') ,''',')
      from
        app.Analytics
      group by
        concat('''',pathname , replace(search, '?EPIC=1','') ,''',')
      order by
        count(1) desc
   ```
   "
%}

## IE 11 Settings

Update IE 11 javascript settings to bring a popup on Javascript errors (needed to catch Hyperspace errors). Selenium cannot pick up IE 11 console output like it can with Chrome, so it is necessary to "crash" the test to review the errors.

{% image "./src/static/img/bi-library/development/ie_settings.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}

## Run Tests

Run Atlas in Visual Studio in Debug mode with IIS Express.

{% image "./src/static/img/bi-library/development/start_debug.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}

Start python tests.

```python
python master_test.py
```
