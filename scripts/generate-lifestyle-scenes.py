"""Place original customer artwork into the lifestyle photographs."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / "public/images"
OUT = ROOT / "lifestyle"

def perspective(image, corners, size):
    w, h = image.size
    matrix, values = [], []
    for (x, y), (u, v) in zip(corners, [(0, 0), (w, 0), (w, h), (0, h)]):
        matrix.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        values.extend([u, v])
    coeffs = np.linalg.solve(np.array(matrix), np.array(values))
    return image.transform(size, Image.Transform.PERSPECTIVE, coeffs, resample=Image.Resampling.BICUBIC)

def shadow(base, mask, offset, blur, strength):
    layer = Image.new("RGBA", base.size)
    moved = Image.new("L", base.size)
    moved.paste(mask, offset)
    layer.putalpha(moved.filter(ImageFilter.GaussianBlur(blur)).point(lambda p: int(p*strength)))
    return Image.alpha_composite(base, layer)

# Keep the printed wet-wipe face; build thin seams outside the print.
table = Image.open(OUT / "table.webp").convert("RGBA").crop((0, 115, 1448, 942))
art = Image.open(ROOT / "showcase/wipe-fronts/village-pizza.webp").convert("RGB")
packet = Image.new("RGBA", (1200, 700), (224, 220, 209, 255))
packet.paste(art.resize((1130, 670), Image.Resampling.LANCZOS), (35, 15))
foil = Image.new("RGBA", packet.size)
d = ImageDraw.Draw(foil)
for x in range(0, 34, 5):
    d.line((x, 0, x+2, 700), fill=(249, 248, 241, 150), width=2)
    d.line((1167+x, 0, 1169+x, 700), fill=(249, 248, 241, 150), width=2)
d.rectangle((34, 0, 37, 700), fill=(80, 73, 64, 70))
d.rectangle((1163, 0, 1166, 700), fill=(80, 73, 64, 70))
packet = Image.alpha_composite(packet, foil)
warped = perspective(packet, [(365, 489), (1020, 435), (1088, 686), (295, 764)], table.size)
table = shadow(table, warped.getchannel("A"), (6, 10), 18, .37)
table = shadow(table, warped.getchannel("A"), (1, 3), 4, .31)
Image.alpha_composite(table, warped).convert("RGB").save(OUT / "table-product.webp", quality=91, method=6)

# Magnet sits almost flush on steel with a short edge shadow.
fridge = Image.open(OUT / "fridge.webp").convert("RGBA").crop((181, 0, 1267, 1086))
magnet = Image.open(ROOT / "showcase/magnet-fronts/best-pizza.webp").convert("RGBA")
magnet = magnet.resize((520, 347), Image.Resampling.LANCZOS).rotate(3, Image.Resampling.BICUBIC, expand=True)
position = (330, 380)
mask = Image.new("L", fridge.size)
mask.paste(magnet.getchannel("A"), position)
fridge = shadow(fridge, mask, (4, 6), 7, .32)
fridge.alpha_composite(magnet, position)
fridge.convert("RGB").save(OUT / "fridge-product.webp", quality=90, method=6)

# Keep the exact 5.5:9 air freshener artwork, hanging below the mirror.
car = Image.open(OUT / "car.webp").convert("RGBA").crop((181, 0, 1267, 1086))
freshener = Image.open(OUT / "rinaldis-air-freshener.webp").convert("RGBA")
freshener = freshener.resize((175, 287), Image.Resampling.LANCZOS)
rounded = Image.new("L", freshener.size)
ImageDraw.Draw(rounded).rounded_rectangle((0, 0, 174, 286), radius=17, fill=255)
freshener.putalpha(rounded)
freshener = freshener.rotate(-2, Image.Resampling.BICUBIC, expand=True)
string = Image.new("RGBA", car.size)
ImageDraw.Draw(string).line((543, 359, 543, 466), fill=(42, 41, 38, 195), width=2)
car = Image.alpha_composite(car, string)
position = (450, 440)
mask = Image.new("L", car.size)
mask.paste(freshener.getchannel("A"), position)
car = shadow(car, mask, (4, 7), 12, .22)
car.alpha_composite(freshener, position)
car.convert("RGB").save(OUT / "car-product.webp", quality=90, method=6)
