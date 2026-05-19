#!/usr/bin/env bash
# Serve the catalog locally for development. Opens at http://localhost:8000.
# Required because `fetch()` of data/tools.json fails under file:// protocol;
# any local static-file server will do — this is just the lowest-friction option.

set -e
PORT="${1:-8000}"
echo "Serving on http://localhost:${PORT} — Ctrl+C to stop."
exec python3 -m http.server "${PORT}"
