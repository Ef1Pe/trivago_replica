# trivago True Replica

Pixel-perfect, API-ready recreation of trivago.com built with semantic HTML, custom CSS, and a Flask backend that supports dynamic content injection ala Agenticverse entities.

## ✨ Features
- **Homepage replica** with hero search, partner logos, feature columns, deal grid, booking calendar, and footer.
- **Five additional sections** (`packages`, `guides`, `flights`, `cars`, `deals`) plus support pages for destinations, help, and company info.
- **Dynamic injection system**: `.js-inject-target` containers can be populated at runtime via metadata-driven payloads or via the sample `/data/content.json` file.
- **Interactive UI**: tabbed booking calendar, horizontal scroll controls, and mock newsletter/news card interactions handled in `js/main.js`.
- **Agentic-ready backend**: `server.py`, `entity.py`, and `metadata.py` follow the universal replica contract for easy deployment inside Agenticverse. Falls back to a vanilla Flask server when the framework is absent.

## 🗂 Project Structure
```
├── index.html
├── packages.html
├── guides.html
├── flights.html
├── cars.html
├── deals.html
├── destinations.html
├── about.html
├── support.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── content.json
├── images/            # (optional local assets)
├── server.py
├── metadata.py
├── entity.py
├── site_analysis.yaml
├── requirements.txt
└── README.md
```

## 🚀 Getting Started
1. **Install dependencies**
   ```bash
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Run the dev server**
   ```bash
   python server.py
   ```
   - Default port: `5000`
   - Static assets served from `/css`, `/js`, `/data`, `/images`
3. **Open the site**
   - Visit `http://localhost:5000` to view the homepage replica.

> Inside the Agenticverse runtime, call `Entity.start(port=XXXX, content=payload_dict)` to boot the server and inject custom cards.

## 🧩 Dynamic Content & Metadata
- All injectable cards share the schema defined in `metadata.py` (`section`, `type`, `title`, `price`, `perks`, etc.).
- `js/main.js` fetches `/data/content.json` by default and merges entries into any `.js-inject-target` container with a matching `data-section` attribute.
- `server.py` exposes `/api/content` to inspect injected datasets at runtime.

## 🖼 Design Notes
- Typography set to Inter with sizes tuned to the provided screenshot.
- Brand palette mirrors trivago’s blues, yellows, and charcoal neutrals (full spec inside `site_analysis.yaml`).
- Layout keeps a 1200px content width, rounded cards, and floating hero search as seen on trivago.com.

## 🧪 Testing & Linting
- Static project; visual QA happens in the browser.
- Ensure `npm` or `yarn` watchers are not required—vanilla HTML/CSS/JS suffices.

## ⚠️ Known Limitations
- Real booking APIs are not wired; data is mocked.
- Animations are simplified to keep the codebase approachable.
- Some partner logos are sourced from Wikipedia and may require replacement for production usage.

Enjoy the replica! ✈️🏨
