"""Atlas.bi config."""


class Config:

    CACHE_TYPE = "SimpleCache"
    CACHE_DEFAULT_TIMEOUT = 300
    MINIFY_HTML = True

    FREEZER_DESTINATION = "../build"
    FREEZER_RELATIVE_URLS = True
