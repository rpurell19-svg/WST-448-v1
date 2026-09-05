#!/usr/bin/env python3
"""Regenerate src/data/image-meta.ts from the photography in public/images.

Run after adding or replacing any image:
    pip install pillow && python3 scripts/generate-image-meta.py

It records each image's intrinsic size (so <Image> never causes layout shift)
and a ~12px LQIP used as the blur placeholder while the real photo loads.
"""
from PIL import Image
import glob, os, io, base64

meta = {}
for path in sorted(glob.glob("public/images/*.webp")):
    name = os.path.basename(path)
    im = Image.open(path).convert("RGB")
    thumb = im.copy()
    thumb.thumbnail((12, 12), Image.LANCZOS)
    buf = io.BytesIO()
    thumb.save(buf, "JPEG", quality=40)
    blur = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
    meta[name] = (im.width, im.height, blur)

lines = [
    "// AUTO-GENERATED — intrinsic dimensions + tiny LQIP blur placeholders for /public/images.",
    "// Regenerate with scripts/generate-image-meta.py after adding or replacing photography.",
    "",
    "export type ImageMeta = { width: number; height: number; blurDataURL: string };",
    "",
    "export const imageMeta: Record<string, ImageMeta> = {",
]
for name, (w, h, blur) in meta.items():
    lines.append(f'  "{name}": {{ width: {w}, height: {h}, blurDataURL: "{blur}" }},')
lines += ["};", ""]

os.makedirs("src/data", exist_ok=True)
with open("src/data/image-meta.ts", "w") as fh:
    fh.write("\n".join(lines))
print(f"wrote {len(meta)} entries to src/data/image-meta.ts")
