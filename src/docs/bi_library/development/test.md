---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Testing
  parent: Development
---

# Testing

All Atlas tests are run with [Selenium](https://selenium-python.readthedocs.io).

If you are using ``poetry`` as your recommend package manager you can install the required packages like this:

```bash
poetry install
```

If you prefer pip, there are two packages required:

```bash
pip install selenium urllib3
```

Next, download the web drivers needed and place them in the ``testing`` directory:

::: content
- [Chrome web driver](https://chromedriver.chromium.org/downloads)
- [IE 11 web driver](https://www.microsoft.com/en-us/download/details.aspx?id=44069)
:::

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
   "The ``url_test.py`` will attempt to access several hundred URL. It is advisable to update this list to match the top hits on your instance. Run a sql query on your instance to build the list.

   ```sql
      select top 500
        concat('''',pathname , replace(search, '?EPIC=1','') ,''',')
      from
        app.Analytics
      group by
        concat('''',pathname , replace(search, '?EPIC=1','') ,''',')
      order by
        count(1) desc
   ```"
%}

Update IE 11 javascript settings to bring a popup on Javascript errors (needed to catch Hyperspace errors.) Selenium cannot pick up IE 11 console output like we can with Chrome, so it is necessary to "crash" the test to review the errors.

<div class="box is-flex is-justify-content-center">
{% image "./src/static/img/bi_library/development/ie_settings.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}
</div>

Start Atlas in Visual Studio in Debug mode.

<div class="box is-flex is-justify-content-center">
{% image "./src/static/img/bi_library/development/start_debug.png", "Start debug", "(min-width:800px) 50vw, 100vw" %}
</div>


Start python tests.

```python
python master_test.py
```
