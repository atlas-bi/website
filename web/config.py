"""Atlas.bi config."""


class Config:

    CACHE_TYPE = "SimpleCache"
    CACHE_DEFAULT_TIMEOUT = 300
    MINIFY_HTML = True

    FREEZER_RELATIVE_URLS = True
    FREEZER_IGNORE_MIMETYPE_WARNINGS = True
