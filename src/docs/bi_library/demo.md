---
title: Atlas Business Intelligence Library
tags: BI Library
description: Atlas Docs
layout: docs_library.njk
eleventyNavigation:
  key: Demo
  parent: BI Library
  order: 1
---

# Atlas Demo

Try Atlas out! Its easy to start up, you won't look back!

<div class="block video_wrapper" style="padding-bottom: 56.250000%; padding-top: 30px; position: relative; width: 100%">
<iframe allowfullscreen="true" src="https://www.youtube.com/embed/d_IGbnuXvJ8" style="border: 0; height: 100%; left: 0; position: absolute; top: 0; width: 100%">
</iframe></div>

<div class="tabs">
   <ul>
    <li class="is-active"><a tab="online">Online Demo</a></li>
    <li><a tab="local">Local Demo</a></li>
  </ul>
</div>
<div class="tab-container">
   <div class="tab is-active"id="online">
Atlas can be run online [online playground](https://labs.play-with-docker.com/) you can demo in.

Create an Instance by clicking "Settings" > 1 Manager and 1 Worker

<div class="tile">
    <div class="box is-flex is-justify-content-center tile">
        {% image "./src/static/img/bi_library/demo/demo1.png", "Create an instance", "(min-width:800px) 50vw, 100vw" %}
    </div>
    <div class="box is-flex is-justify-content-center tile">
        {% image "./src/static/img/bi_library/demo/demo2.png", "Create an instance", "(min-width:800px) 50vw, 100vw" %}
    </div>
</div>

Click on the Manager instance. It seems to allow more space/ram. Paste in the docker command and hit "enter".

```python
docker run -i -t -p 1234:1234 -e PORT=1234  -u 0 christopherpickering/rmc-atlas-demo:latest
```

<div class="box is-flex is-justify-content-center">
{% image "./src/static/img/bi_library/demo/demo3.png", "Task list", "(min-width:800px) 50vw, 100vw" %}
</div>

{% admonition
   "note",
   "Note",
   "Wait about 1-2 mins for app to download and startup. Output will say ``Now listening on: http://[::]:1234`` when ready."
%}

Click "Open Port" and type ``1234``

App will open in new tab. The URL should be valid for 3-4 hrs.
   </div>
   <div class="tab "id="local">


There is a dockerized Atlas demo available, it can be run with a single command -

```bash
docker run -i -t -p 1234:1234 -e PORT=1234  -u 0 christopherpickering/rmc-atlas-demo:latest
```
Alternatively, you can clone the repository and build your own docker image -

```bash
docker build  --tag atlas_demo .
docker run -i -t -p 1234:1234 -e PORT=1234  -u 0 atlas_demo:latest
# web app will be running @ http://localhost:1234
# see Dockerfile for db access
```
   </div>
</div>
