#!/usr/bin/env python3
"""Prépare la version web des trois applis dans site/ (publiée sur GitHub Pages).

Sur iPhone : Safari › Partager › « Sur l'écran d'accueil » installe chaque appli comme une vraie appli
(plein écran, icône, hors ligne pour La Tournée). Les iPhone jouent avec les téléphones Android.
Usage : python3 tools/build-web.py
"""
import json, os, shutil, subprocess, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
APPS = {
    'tournee': ('La Tournée', 'Tournée', '#10261e', 'android-assets', "Jeux de soirée sur un seul téléphone qui fait le tour de la table."),
    'veillee': ('La Veillée', 'Veillée', '#08161a', 'apps/veillee/android-assets', "Loup-Garou, Téléphone dessiné, Tu préfères, Action ou Vérité : chacun sur son téléphone."),
    'tapis': ('Le Tapis', 'Tapis', '#120c1e', 'apps/tapis/android-assets', "Poker, Blackjack, Roulette et Machine à sous entre amis, jetons fictifs, chacun sur son téléphone."),
}
VERSION = time.strftime('%Y%m%d%H%M%S')

shutil.rmtree(SITE, ignore_errors=True)
os.makedirs(SITE)
for app, (name, short, color, assets, desc) in APPS.items():
    subprocess.run([os.path.join(ROOT, 'tools/build-www.sh'), app], check=True, stdout=subprocess.DEVNULL)
    out = os.path.join(SITE, app)
    shutil.copytree(os.path.join(ROOT, 'build', app, 'www'), out)
    for n in (180, 192, 512):
        shutil.copy(os.path.join(ROOT, assets, f'icon-square-{n}.png'), os.path.join(out, f'icon-{n}.png'))
    json.dump({'name': name, 'short_name': short, 'description': desc, 'lang': 'fr', 'start_url': './', 'scope': './',
               'display': 'standalone', 'orientation': 'portrait', 'background_color': color, 'theme_color': color,
               'icons': [{'src': f'icon-{n}.png', 'sizes': f'{n}x{n}', 'type': 'image/png', 'purpose': 'any'} for n in (192, 512)]},
              open(os.path.join(out, 'manifest.webmanifest'), 'w'), ensure_ascii=False, indent=1)
    # Service worker : l'appli s'ouvre même sans réseau (les parties en ligne ont toujours besoin d'internet)
    files = sorted(os.path.relpath(os.path.join(d, f), out) for d, _, fs in os.walk(out) for f in fs if f != 'sw.js')
    sw = open(os.path.join(ROOT, 'web', 'sw.js')).read().replace('__VERSION__', f'{app}-{VERSION}').replace('__FILES__', json.dumps(['./'] + files))
    open(os.path.join(out, 'sw.js'), 'w').write(sw)
    page = os.path.join(out, 'index.html')
    html = open(page).read()
    head = ('<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-180.png">\n'
            '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n')
    html = html.replace('<title>', head + '<title>', 1)
    html = html.replace('</body>', "<script>if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});</script>\n</body>", 1)
    open(page, 'w').write(html)
shutil.copy(os.path.join(ROOT, 'web', 'index.html'), os.path.join(SITE, 'index.html'))
for app, (_, _, _, assets, _) in APPS.items():
    shutil.copy(os.path.join(ROOT, assets, 'icon-square-180.png'), os.path.join(SITE, f'icon-{app}.png'))
open(os.path.join(SITE, '.nojekyll'), 'w').close()
print('Version web prête dans site/')
