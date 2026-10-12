#!/usr/bin/env python3
"""Generate media-index.json from files placed in the repository's media/ folder."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "media"
OUTPUT = ROOT / "media-index.json"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
VIDEO_EXTS = {".mp4", ".webm", ".ogg", ".mov"}
items = []
if MEDIA.exists():
    for path in sorted(MEDIA.rglob("*")):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTS | VIDEO_EXTS:
            rel = path.relative_to(ROOT).as_posix()
            name = path.stem.replace("_", " ").replace("-", " ").strip()
            items.append({
                "name": path.name,
                "title": name.title(),
                "path": rel,
                "url": rel
            })
OUTPUT.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Indexed {len(items)} media file(s) into {OUTPUT.name}")
