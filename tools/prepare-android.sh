#!/usr/bin/env bash
# Personnalise le projet Android généré par « npx cap add android » :
# icônes, écran de démarrage, vibreur, caméra, mode portrait et numéro de version.
# À lancer depuis le dossier qui contient android/ (racine du dépôt ou build/<appli>).
# Usage : tools/prepare-android.sh [numéro de version] [dossier des icônes] [couleur de fond]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD="${1:-1}"
ASSETS="$ROOT/${2:-android-assets}"
BG="${3:-#10261E}"
RES=android/app/src/main/res

for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  cp "$ASSETS"/mipmap-$d/*.png "$RES/mipmap-$d/"
done
sed -i "s|<color name=\"ic_launcher_background\">.*</color>|<color name=\"ic_launcher_background\">$BG</color>|" "$RES/values/ic_launcher_background.xml"
find "$RES" -name splash.png -exec cp "$ASSETS/splash.png" {} \;

MANIFEST=android/app/src/main/AndroidManifest.xml
grep -q 'android.permission.VIBRATE' "$MANIFEST" || \
  sed -i 's|<uses-permission android:name="android.permission.INTERNET" />|&\n    <uses-permission android:name="android.permission.VIBRATE" />|' "$MANIFEST"
# Caméra : scanner le QR code d'une partie et prendre sa photo de profil (demandée seulement au moment voulu)
grep -q 'android.permission.CAMERA' "$MANIFEST" || \
  sed -i 's|<uses-permission android:name="android.permission.INTERNET" />|&\n    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />|' "$MANIFEST"
grep -q 'screenOrientation' "$MANIFEST" || sed -i 's|<activity|<activity\n            android:screenOrientation="portrait"|' "$MANIFEST"

sed -i "s/versionCode [0-9]*/versionCode $BUILD/; s/versionName \"[^\"]*\"/versionName \"1.0.$BUILD\"/" android/app/build.gradle
echo "Projet Android prêt (version 1.0.$BUILD)"
