#!/usr/bin/env python3
"""Compatibility entry point; delegates to scripts/generate_media_index.py."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).resolve().parent / "scripts" / "generate_media_index.py"), run_name="__main__")
