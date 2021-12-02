---
title: Atlas BI Library Docs » Development » Requirements
tags: BI Library
description: Learn about the basic development requirements needed to get Atlas BI Library running locally on your computer.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Dev Requirements
  title: System Requirements
  parent: BIL Development
  order: 1
---

# Development Requirements

The Atlas BI Library webapp is developed primarily in C# Razor Page, SASS, HTML and Javascript. 

## Setting Up Visual Studio

::: content
- Install [Visual Studio 2017+](https://visualstudio.microsoft.com/downloads/). The community edition works well.
- Visual Studio's ``SQL Server Integration Services Projects`` extension
  {% image "./src/static/img/bi-library/requirements/vs_extension.png", "Extension", "(min-width:800px) 50vw, 100vw", "boxed" %}
- ``ASP.NET and web development`` component
  {% image "./src/static/img/bi-library/requirements/dotnet.png", "asp.net component", "(min-width:800px) 50vw, 100vw", "boxed" %}
- ``Data Storage and Processing`` component
  {% image "./src/static/img/bi-library/requirements/sqlservices.png", "sql services component", "(min-width:800px) 50vw, 100vw", "boxed" %}
- ``Razor Language Services`` component
  {% image "./src/static/img/bi-library/requirements/razor.png", "razor component", "(min-width:800px) 50vw, 100vw", "boxed" %}
- [Microsoft .NET SDK 5.0.103 (x86)](https://dotnet.microsoft.com/download/dotnet/5.0)
:::
