---
title: Contributing
tags: Library
description: Learn about how you can contribute to the Atlas Library project. Contributions are welcome.
keywords: atlas, atlas library, unified report library, data governance, database, congributing, useful tools
layout: docs_library.njk
date: Last Modified
eleventyNavigation:
  key: BIL Contributing
  title: Contributing
  parent: Library
  order: 10
eleventyComputed:
  meta:
    breadcrumbs:
      - name: Atlas
        url: '{{ site.url }}'
        position: 1
      - name: Docs
        url: '{{ site.url }}/docs/'
        position: 2
      - name: Library
        url: '{{ site.url }}/docs/library/'
        position: 3
---

# Contributing to Atlas Library

Contributions to the Atlas tools are welcome! Contributions are best made through a [pull request](https://github.com/atlas-bi/Library/pulls) on the Github repository.

When possible commit using `npm run commit` to help us create semantic change notes.

## Database Updates

Database changes are all done through `ef` migrations.

After editing the model files a new migration can be added with `dotnet ef migrations add <DescriptiveText> --project web/web.csproj` and then applied to the database with `dotnet ef database update --project web/web.csproj -v`
