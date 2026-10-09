"""Génère l'icône et l'écran de démarrage de l'appli Android dans android-assets/.

Usage : python3 tools/make_icons.py
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

FELT, PAPER, EDGE, RED, GOLD = (16, 38, 30), (244, 236, 219), (217, 204, 176), (201, 58, 63), (231, 181, 82)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'android-assets')
DISPLAY = os.path.join(ROOT, 'fonts', 'BagelFatOne-normal-400.woff2')


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


def card(size):
    """Carte à jouer (cœur + « LT ») sur fond transparent, inclinée."""
    s = size
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    cw, ch = int(s * .62), int(s * .84)
    c = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, cw - 1, ch - 1], radius=int(cw * .12), fill=PAPER, outline=EDGE, width=max(2, int(cw * .02)))
    heart(d, cw / 2, ch * .44, cw * .62, RED)
    f = ImageFont.truetype(DISPLAY, int(ch * .17))
    d.text((cw / 2, ch * .82), 'LT', font=f, fill=RED, anchor='mm')
    c = c.rotate(-8, resample=Image.BICUBIC, expand=True)
    img.alpha_composite(c, ((s - c.width) // 2, (s - c.height) // 2))
    return img


def full_icon(size, round_=False):
    big = 1024
    bg = Image.new('RGBA', (big, big), FELT + (255,))
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
    img = Image.new('RGBA', (w, h), FELT + (255,))
    art = card(520)
    img.alpha_composite(art, ((w - 520) // 2, int(h * .30)))
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(DISPLAY, 150)
    d.text((w / 2, h * .66), 'La Tournée', font=f, fill=GOLD, anchor='mm')
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
