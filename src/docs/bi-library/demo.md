---
title: Demo | Atlas BI Library Docs
tags: BI Library
description: Watch a demo of the Atlas BI Library and learn about the features of the app. A demo can also be run locally with docker.
layout: docs_library.njk
eleventyNavigation:
  key: BIL Demo
  title: Demo
  parent: BI Library
  order: 1
---

# Atlas Demo

Try Atlas out! Its easy to start up, you won't look back!

[Watch a demo here.](/bi-library#demo)

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="local">Local Demo</a></li>
    <li><a tab="online">Online Demo</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab"id="online">

Atlas can be run in an [online playground](https://labs.play-with-docker.com/).

Create an Instance by clicking "Settings" > 1 Manager and 1 Worker

{% image "./src/static/img/bi-library/demo/demo1.png", "Create an instance", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% image "./src/static/img/bi-library/demo/demo2.png", "Create an instance", "(min-width:800px) 50vw, 100vw", "boxed" %}

Click on the Manager instance. It seems to allow more space/ram. Paste in the docker command and hit "enter".

```python
docker run -i -t -p 1234:1234 -e PORT=1234  -u 0 christopherpickering/rmc-atlas-demo:latest
```

{% image "./src/static/img/bi-library/demo/demo3.png", "Task list", "(min-width:800px) 50vw, 100vw", "boxed" %}

{% admonition
   "note",
   "Note",
   "Wait about 1-2 mins for app to download and startup. Output will say ``Now listening on: http://[::]:1234`` when ready."
%}

Click "Open Port" and type ``1234``

App will open in new tab. The URL should be valid for 3-4 hrs.
   </div>
   <div class="tab is-active"id="local">


There is a dockerized Atlas demo available, it can be run with a single command -

```bash
docker run -i -t -p 1234:1234 -e PORT=1234  -u 0 christopherpickering/rmc-atlas-demo:latest
```

After starting up, you can access the website at [`http://localhost:1234`](http://localhost:1234).
   </div>
</div>
