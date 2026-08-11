#!/usr/bin/env python3
import http.server, socketserver, os, webbrowser
from pathlib import Path

PORT = int(os.environ.get("PORT", "8765"))
ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)
class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"Serving {ROOT} at {url}")
    try: webbrowser.open(url)
    except Exception: pass
    httpd.serve_forever()
