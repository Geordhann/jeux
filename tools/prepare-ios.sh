#!/usr/bin/env bash
# Personnalise le projet iOS généré par « npx cap add ios » : icône, écran de démarrage et mode portrait.
# À lancer depuis le dossier qui contient ios/ (build/<appli>).
# Usage : tools/prepare-ios.sh [dossier des icônes]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/${1:-android-assets}"
XC=ios/App/App/Assets.xcassets
cp "$ASSETS/icon-square-1024.png" "$XC/AppIcon.appiconset/AppIcon-512@2x.png"
for f in splash-2732x2732.png splash-2732x2732-1.png splash-2732x2732-2.png; do cp "$ASSETS/splash-ios.png" "$XC/Splash.imageset/$f"; done
PLIST=ios/App/App/Info.plist
for key in UISupportedInterfaceOrientations "UISupportedInterfaceOrientations~ipad"; do
  /usr/libexec/PlistBuddy -c "Delete :$key" "$PLIST" 2>/dev/null || true
  /usr/libexec/PlistBuddy -c "Add :$key array" -c "Add :$key:0 string UIInterfaceOrientationPortrait" "$PLIST"
done
echo "Projet iOS prêt"
