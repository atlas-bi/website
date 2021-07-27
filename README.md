[![Netlify Status](https://api.netlify.com/api/v1/badges/bc69cb13-667b-4e6e-8762-081c31169988/deploy-status)](https://app.netlify.com/sites/gallant-ptolemy-d1eb76/deploys)

# Atlas Website

Website is built in flask and freezes to a static site.

## Run for development

Dependencies are managed with poetry. Run `poetry install` to install them.

```bash
export FLASK_ENV=development \
&& export FLASK_DEBUG=1 \
&& export FLASK_APP=web \
&& poetry run flask run 
```

## Build for publishing

1. Build assets

```bash
poetry run python -m web.assets
```

2. Freeze site

```bash
poetry run python -m freeze
```
