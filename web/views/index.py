"""Atlas.bi urls and views."""
import os

from flask import Blueprint
from flask import current_app as app
from flask import render_template, send_from_directory

index_bp = Blueprint("index", __name__)


@index_bp.route("/")
def index():
    """Return home page."""
    return render_template("home.html.j2")


@index_bp.route("/about")
def about():
    """Return home page."""
    return render_template("home.html.j2")


@index_bp.route("/pricing")
def pricing():
    """Return pricing page."""
    return render_template("pricing.html.j2")


@index_bp.route("/favicon.ico")
def favicon():
    """Return favicon."""
    return send_from_directory(
        os.path.join(app.root_path, "static", "img"),
        "favicon.ico",
        mimetype="image/x-icon",
    )


@index_bp.route("/robots.txt")
def robots():
    """Return robots."""
    return """User-agent: *
Allow: /"""
