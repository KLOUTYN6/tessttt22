#!/usr/bin/env python3
"""Generate media-index.json for the KLOZ Studio static website."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA_DIR = ROOT / "media"
OUTPUT = ROOT / "media-index.json"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".ogg", ".mov"}
SUPPORTED = IMAGE_EXTENSIONS | VIDEO_EXTENSIONS

items = []
if MEDIA_DIR.exists():
    for path in sorted(MEDIA_DIR.rglob("*")):
        if path.is_file() and path.suffix.lower() in SUPPORTED:
            relative = path.relative_to(ROOT).as_posix()
            items.append({"name": path.name, "title": path.stem.replace("-", " ").replace("_", " ").title(), "path": relative, "url": relative})
OUTPUT.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Wrote {len(items)} media item(s) to {OUTPUT.name}")
