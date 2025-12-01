"""Flask server for the trivago True replica."""
from __future__ import annotations

from pathlib import Path
from typing import Dict, List

from flask import Flask, Response, send_file, send_from_directory

BASE_DIR = Path(__file__).parent
STATIC_FOLDERS = {"css": "css", "js": "js", "images": "images", "data": "data"}

injected_content: List[Dict] = []


def build_content_card(item: Dict) -> str:
    """Return HTML snippet that mirrors the static cards on the site."""
    card_type = item.get("type", "deal")
    perks = item.get("perks") or []
    perk_html = "<ul>" + "".join(f"<li>{perk}</li>" for perk in perks) + "</ul>" if perks else ""
    base_image = item.get("image", "https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?auto=format&fit=crop&w=700&q=80")

    if card_type == "package":
        return f"""
        <article class=\"package-card injected\">
            <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
            <div class=\"card-body\">
                <p class=\"eyebrow\">{item.get('duration', 'Flexible package')} </p>
                <h3>{item.get('title', '')}</h3>
                {perk_html}
                <div class=\"price-row\">
                    <span class=\"price\">{item.get('price', '$--')} </span>
                    <button class=\"primary-btn\">Customize</button>
                </div>
            </div>
        </article>
        """

    if card_type == "guide":
        return f"""
        <article class=\"guide-card injected\">
            <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
            <div class=\"card-body\">
                <p class=\"eyebrow\">{item.get('author', 'trivago editors')} </p>
                <h3>{item.get('title', '')}</h3>
                <p>{item.get('summary', '')}</p>
                <button class=\"ghost-btn\">Read guide</button>
            </div>
        </article>
        """

    if card_type == "flight":
        return f"""
        <article class=\"flight-card injected\">
            <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
            <div class=\"card-body\">
                <p class=\"eyebrow\">{item.get('duration', 'Flexible fare')}</p>
                <h3>{item.get('title', '')}</h3>
                {perk_html}
                <div class=\"price-row\">
                    <span class=\"price\">{item.get('price', '$--')} </span>
                    <button class=\"ghost-btn\">Track price</button>
                </div>
            </div>
        </article>
        """

    if card_type == "car":
        return f"""
        <article class=\"car-card injected\">
            <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
            <div class=\"card-body\">
                <p class=\"eyebrow\">{item.get('duration', 'Rental car')}</p>
                <h3>{item.get('title', '')}</h3>
                {perk_html}
                <div class=\"price-row\">
                    <span class=\"price\">{item.get('price', '$--')} </span>
                    <button class=\"ghost-btn\">Reserve</button>
                </div>
            </div>
        </article>
        """

    if card_type == "destination":
        return f"""
        <article class=\"destination-card injected\">
            <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
            <div class=\"card-body\">
                <h3>{item.get('title', '')}</h3>
                <p>{item.get('summary', '')}</p>
                <button class=\"ghost-btn\">View stays</button>
            </div>
        </article>
        """

    # default to deal card
    return f"""
    <article class=\"deal-card injected\">
        <img src=\"{base_image}\" alt=\"{item.get('title', '')}\">
        <div class=\"deal-body\">
            <div class=\"deal-meta\">
                <span class=\"rating\">{item.get('rating', '8.5 Great')}</span>
                <span>{item.get('location', '')}</span>
            </div>
            <h3>{item.get('title', '')}</h3>
            {perk_html}
            <div class=\"price-row\">
                <div>
                    <span class=\"price\">{item.get('price', '$--')}</span>
                    <span class=\"per\"> per night</span>
                </div>
                <button class=\"ghost-btn\">Check deal</button>
            </div>
        </div>
    </article>
    """


def inject_content_into_html(html: str, item: Dict) -> str:
    marker = 'class="js-inject-target"'
    start = html.find(marker)
    if start == -1:
        return html
    insert_pos = html.find('>', start) + 1
    return html[:insert_pos] + build_content_card(item) + html[insert_pos:]


def create_app() -> Flask:
    app = Flask(__name__, static_folder=None)

    @app.route("/css/<path:filename>")
    def serve_css(filename: str):
        return send_from_directory(BASE_DIR / STATIC_FOLDERS["css"], filename)

    @app.route("/js/<path:filename>")
    def serve_js(filename: str):
        return send_from_directory(BASE_DIR / STATIC_FOLDERS["js"], filename)

    @app.route("/data/<path:filename>")
    def serve_data(filename: str):
        return send_from_directory(BASE_DIR / STATIC_FOLDERS["data"], filename)

    @app.route("/images/<path:filename>")
    def serve_images(filename: str):
        return send_from_directory(BASE_DIR / STATIC_FOLDERS["images"], filename)

    def render_page(page: str):
        html_path = BASE_DIR / f"{page}.html"
        if not html_path.exists():
            return Response("Page not found", status=404)

        html_text = html_path.read_text(encoding="utf-8")
        for content in injected_content:
            if content.get("section") == page:
                html_text = inject_content_into_html(html_text, content)
        return html_text

    @app.route("/")
    @app.route("/index.html")
    def index():
        return render_page("index")

    @app.route("/<page>.html")
    def section(page: str):
        return render_page(page)

    @app.route("/api/content")
    def api_content():
        return {"count": len(injected_content), "content": injected_content}

    return app


def start_server(port: int = 5000, threaded: bool = False, content_data: Dict | None = None):
    if content_data and isinstance(content_data, dict):
        injected_content.append(content_data)
        print(f"[trivago-replica] Injected card for section {content_data.get('section')}")

    app = create_app()
    try:
        from agenticverse_entities.base.server_base import start_server as base_start

        return base_start(app, port=port, threaded=threaded)
    except ModuleNotFoundError:
        from werkzeug.serving import run_simple

        print("[trivago-replica] agenticverse not found, running vanilla Flask server")
        return run_simple("0.0.0.0", port, app, use_debugger=False, use_reloader=False)


if __name__ == "__main__":
    # Allow local development without the agentic runtime.
    from werkzeug.serving import run_simple

    flask_app = create_app()
    run_simple("0.0.0.0", 5000, flask_app, use_debugger=True, use_reloader=True)
