"""Génère les icônes et l'écran de démarrage des applis Android.

Usage : python3 tools/make_icons.py [tournee|veillee|tapis]
  tournee (défaut) -> android-assets/
  veillee, tapis   -> apps/<appli>/android-assets/
"""
import math
import os
import sys
from PIL import Image, ImageDraw, ImageFont

FELT, PAPER, EDGE, RED, GOLD = (16, 38, 30), (244, 236, 219), (217, 204, 176), (201, 58, 63), (231, 181, 82)
NIGHT, BORDEAUX, INK = (18, 26, 51), (26, 16, 18), (34, 28, 23)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = sys.argv[1] if len(sys.argv) > 1 else 'tournee'
OUT = os.path.join(ROOT, 'android-assets') if APP == 'tournee' else os.path.join(ROOT, 'apps', APP, 'android-assets')
DISPLAY = os.path.join(ROOT, 'fonts', 'BagelFatOne-normal-400.woff2')
BG, TITLE = {'tournee': (FELT, 'La Tournée'), 'veillee': (NIGHT, 'La Veillée'), 'tapis': (BORDEAUX, 'Le Tapis')}[APP]


def heart(d, cx, cy, w, color):
    """Deux lobes + les tangentes qui descendent jusqu'à la pointe."""
    r = w / 4
    cy -= r * .5
    px, py = cx, cy + 2.4 * r
    pts = []
    for sx in (-1, 1):
        ccx = cx + sx * r
        dx, dy = px - ccx, py - cy
        dist = math.hypot(dx, dy)
        a = math.atan2(dy, dx) - sx * math.acos(r / dist)
        pts.append((ccx + r * math.cos(a), cy + r * math.sin(a)))
        d.ellipse([ccx - r, cy - r, ccx + r, cy + r], fill=color)
    d.polygon([(cx - r, cy), pts[0], (px, py), pts[1], (cx + r, cy)], fill=color)


def moon(d, cx, cy, r, color, bg):
    """Croissant de lune : un disque mangé par un disque de la couleur du fond."""
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    o = r * .42
    d.ellipse([cx - r + o, cy - r - o * .55, cx + r + o, cy + r - o * .55], fill=bg)


def spade(d, cx, cy, w, color):
    """Pique : un cœur à l'envers et un pied."""
    layer = Image.new('RGBA', (int(w * 2), int(w * 2)), (0, 0, 0, 0))
    heart(ImageDraw.Draw(layer), w, w * 1.05, w, color)
    layer = layer.rotate(180)
    d._image.alpha_composite(layer, (int(cx - w), int(cy - w * 1.05)))
    d.polygon([(cx, cy - w * .25), (cx - w * .2, cy + w * .62), (cx + w * .2, cy + w * .62)], fill=color)


def card(size):
    """Carte à jouer inclinée sur fond transparent, motif propre à chaque appli."""
    s = size
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    cw, ch = int(s * .62), int(s * .84)
    c = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, cw - 1, ch - 1], radius=int(cw * .12), fill=PAPER, outline=EDGE, width=max(2, int(cw * .02)))
    f = ImageFont.truetype(DISPLAY, int(ch * .17))
    if APP == 'veillee':
        moon(d, cw * .5, ch * .42, cw * .3, GOLD, PAPER)
        d.text((cw / 2, ch * .82), 'LV', font=f, fill=NIGHT, anchor='mm')
    elif APP == 'tapis':
        spade(d, cw / 2, ch * .36, cw * .58, INK)
        r = cw * .17
        x, y = cw * .5, ch * .8
        d.ellipse([x - r, y - r, x + r, y + r], fill=RED, outline=PAPER, width=max(2, int(r * .18)))
        d.ellipse([x - r * .55, y - r * .55, x + r * .55, y + r * .55], outline=PAPER, width=max(2, int(r * .12)))
    else:
        heart(d, cw / 2, ch * .44, cw * .62, RED)
        d.text((cw / 2, ch * .82), 'LT', font=f, fill=RED, anchor='mm')
    c = c.rotate(-8, resample=Image.BICUBIC, expand=True)
    img.alpha_composite(c, ((s - c.width) // 2, (s - c.height) // 2))
    return img


def full_icon(size, round_=False):
    big = 1024
    bg = Image.new('RGBA', (big, big), BG + (255,))
    bg.alpha_composite(card(int(big * .86)), (int(big * .07), int(big * .07)))
    mask = Image.new('L', (big, big), 0)
    md = ImageDraw.Draw(mask)
    if round_:
        md.ellipse([0, 0, big - 1, big - 1], fill=255)
    else:
        md.rounded_rectangle([0, 0, big - 1, big - 1], radius=int(big * .18), fill=255)
    bg.putalpha(mask)
    return bg.resize((size, size), Image.LANCZOS)


def foreground(size):
    # Icône adaptative : le motif doit tenir dans les 66 % centraux
    big = 1080
    img = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    art = card(int(big * .62))
    img.alpha_composite(art, ((big - art.width) // 2, (big - art.height) // 2))
    return img.resize((size, size), Image.LANCZOS)


def splash(w=1080, h=1920):
    img = Image.new('RGBA', (w, h), BG + (255,))
    art = card(520)
    img.alpha_composite(art, ((w - 520) // 2, int(h * .30)))
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(DISPLAY, 150)
    d.text((w / 2, h * .66), TITLE, font=f, fill=GOLD, anchor='mm')
    return img.convert('RGB')


DENSITIES = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
for dens, k in DENSITIES.items():
    folder = os.path.join(OUT, f'mipmap-{dens}')
    os.makedirs(folder, exist_ok=True)
    full_icon(int(48 * k)).save(os.path.join(folder, 'ic_launcher.png'))
    full_icon(int(48 * k), round_=True).save(os.path.join(folder, 'ic_launcher_round.png'))
    foreground(int(108 * k)).save(os.path.join(folder, 'ic_launcher_foreground.png'))
full_icon(512).save(os.path.join(OUT, 'icon-512.png'))
splash().save(os.path.join(OUT, 'splash.png'))
print('ok')
