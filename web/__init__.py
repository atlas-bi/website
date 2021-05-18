"""Atlas.bi init website."""

from datetime import datetime

from flask import Flask

from web.extensions import cache, compress, htmlmin


def create_app():
    """Create app.

    :returns: app.
    """
    this_app = Flask(__name__)

    this_app.config.from_object("web.config.Config")

    compress.init_app(this_app)
    cache.init_app(this_app)
    cache.clear()
    htmlmin.init_app(this_app)

    with this_app.app_context():

        from web import assets  # noqa: F401
        from web.views import filters, index

        assets.init(this_app)
        this_app.register_blueprint(index.index_bp)
        this_app.register_blueprint(filters.filters_bp)

        @this_app.context_processor
        def inject_now():
            return {"now": datetime.utcnow()}

        return this_app


app = create_app()


if __name__ == "__main__":
    app.run()
