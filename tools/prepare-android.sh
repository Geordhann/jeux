#!/usr/bin/env bash
# Personnalise le projet Android généré par « npx cap add android » :
# icônes, écran de démarrage, vibreur, mode portrait et numéro de version.
# Usage : tools/prepare-android.sh [numéro de version]
set -euo pipefail
cd "$(dirname "$0")/.."
BUILD="${1:-1}"
RES=android/app/src/main/res

for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  cp android-assets/mipmap-$d/*.png "$RES/mipmap-$d/"
done
sed -i 's|<color name="ic_launcher_background">.*</color>|<color name="ic_launcher_background">#10261E</color>|' "$RES/values/ic_launcher_background.xml"
find "$RES" -name splash.png -exec cp android-assets/splash.png {} \;

MANIFEST=android/app/src/main/AndroidManifest.xml
grep -q 'android.permission.VIBRATE' "$MANIFEST" || \
  sed -i 's|<uses-permission android:name="android.permission.INTERNET" />|&\n    <uses-permission android:name="android.permission.VIBRATE" />|' "$MANIFEST"
grep -q 'screenOrientation' "$MANIFEST" || sed -i 's|<activity|<activity\n            android:screenOrientation="portrait"|' "$MANIFEST"

sed -i "s/versionCode [0-9]*/versionCode $BUILD/; s/versionName \"[^\"]*\"/versionName \"1.0.$BUILD\"/" android/app/build.gradle
echo "Projet Android prêt (version 1.0.$BUILD)"
