#!/usr/bin/env bash
# Prépare une appli dans build/<appli>/ : fichiers web (www/), config Capacitor et dépendances,
# prêts pour « npx cap add android ». La version web se teste en servant build/<appli>/www.
# Usage : tools/build-www.sh tournee|veillee|tapis
set -euo pipefail
cd "$(dirname "$0")/.."
APP="${1:?Usage : tools/build-www.sh tournee|veillee|tapis}"
OUT="build/$APP"
rm -rf "$OUT" && mkdir -p "$OUT/www"
cp package.json package-lock.json "$OUT/"
if [ "$APP" = tournee ]; then
  cp capacitor.config.json "$OUT/"
  cp index.html "$OUT/www/"
else
  [ -d "apps/$APP" ] || { echo "Appli inconnue : $APP" >&2; exit 1; }
  cp "apps/$APP/capacitor.config.json" "$OUT/"
  cp "apps/$APP/index.html" "$OUT/www/"
  cp -r shared "$OUT/www/"
fi
cp -r fonts "$OUT/www/"
# Hors ligne : les polices sont incluses, pas besoin de Google Fonts
sed -i '/fonts.googleapis.com\|fonts.gstatic.com/d' "$OUT/www/index.html"
echo "Appli $APP prête dans $OUT"
