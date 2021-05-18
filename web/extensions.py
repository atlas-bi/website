"""Atlas.bi basic initialization."""
import logging

from flask_caching import Cache
from flask_compress import Compress
from flask_htmlmin import HTMLMIN

cache = Cache()
compress = Compress()
htmlmin = HTMLMIN(remove_empty_space=True)
logging.basicConfig(level=logging.WARNING)
