"""Atlas.bi static assets build script."""
from pathlib import Path

from flask import Flask
from flask_assets import Bundle, Environment


def init(app=None):
    """Define asset files."""
    app = app or Flask(__name__)
    with app.app_context():
        env = Environment(app)
        env.load_path = [Path(__file__).parent / "static"]
        env.auto_build = False
        env.manifest = "file"

        css_font = Bundle(
            "./font/Inter/stylesheet.css", filters="rcssmin", output="css/inter.min.css"
        )
        env.register("css_font", css_font)

        css_site = Bundle(
            "./css/site.css", filters="rcssmin", output="css/site.min.css"
        )
        env.register("css_site", css_site)

        js_site = Bundle("./js/site.js", filters="jsmin", output="js/site.min.js")
        env.register("js_site", js_site)

        return [css_font, css_site, js_site]


if __name__ == "__main__":
    bundles = init()
    for bundle in bundles:
        bundle.build()
