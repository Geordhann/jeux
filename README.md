# La Tournée

Jeux de soirée sur un seul téléphone qui fait le tour de la table. Ouvre `index.html` dans un navigateur, rien à installer.

## Navigation
Intro animée au lancement, puis 4 onglets en bas de l'écran : **Jeux** (la liste des jeux et un résumé de la soirée), **Joueurs** (la bande et les affinités), **Soirée** (lieu, alcool, conducteur, packs, musique) et **Plus** (récap, classement, cartes perso, règle d'or, mentions légales).

## Les jeux
- **Action ou Vérité** : 5 niveaux (Soft, Piquant, Hot, Intense, Sans limite), joker à 2 gorgées.
- **La Bouteille** : la bouteille tourne, désigne ton duo et vous donne un défi à deux.
- **Speed Dating** : tête-à-tête H/F chronométrés avec une question imposée, puis vote secret. Seuls les matchs réciproques sont révélés.
- **Undercover** : environ 190 paires de mots du quotidien, undercovers, Mr White, option « mots coquins ».
- **Paranoïa** : une question montrée en secret à son voisin, un prénom à voix haute, pile ou face pour la révéler.
- **La Roue** : roue des gages (selon niveau, lieu, alcool), « qui paie la tournée ? » ou roue perso.
- **Je n'ai jamais**, **Qui pourrait…**, **Tu préfères** : paquets de cartes en 5 niveaux, avec « Qui boit ? » pour compter les gorgées.

## Réglages
- **Musique d'ambiance** : Chill, Soirée, Sensuel ou Auto (suit le niveau). Composée en direct par l'appli (synthèse Web Audio) : création originale libre de droits, aucun fichier, fonctionne hors ligne. Bouton flottant en bas à droite pour lancer ou couper.
- **Qui conduit ?** : le conducteur ne boit jamais. Ses défis et jokers passent en version sans alcool, ses gorgées deviennent des points de gage.
- **Packs à thème** : Road trip, Halloween, Noël & Nouvel An, Été & vacances, Anniversaire (cartes et mots Undercover en plus).
- **Pas de répétition** : les cartes déjà vues sont mémorisées d'une soirée à l'autre et ne reviennent qu'une fois le paquet entier joué (« Revoir toutes les cartes » dans le Classement).
- **Récap de soirée** : cartes jouées, jeux, titres, matchs du Speed Dating, résultats Undercover, à copier pour le groupe. « Nouvelle soirée » remet les compteurs à zéro.
- **La soirée** : *En voiture* (défis faisables assis + défis spécial voiture), *Chez quelqu'un* (tous les défis) ou *Dehors* (rien qui oblige à se déshabiller en public). *Avec* ou *sans alcool* : sans alcool, les gorgées deviennent des gages et des points.
- **Joueurs H/F**, et option « défis avec le sexe opposé » ou « avec tout le monde ».
- **Affinités** :
  - *Préférences* : « plutôt filles » ou « plutôt mecs ». À partir de Piquant, environ 4 défis sur 5 tombent sur le sexe préféré, les autres sont adoucis (Piquant maximum).
  - *Couples* : à partir de Piquant, les couples ne font leurs défis qu'entre eux (désactivable).
  - *Liste noire secrète* : chacun exclut des personnes, aucun défi ne les réunira.
- **Cartes perso** : ajoute tes propres cartes à n'importe quel jeu et niveau (`{x}` = un autre joueur).
- **Classement** : gorgées, jokers et défis réalisés, avec titres de fin de soirée.
- **Chrono** : apparaît dès qu'un défi a une durée (« 30 secondes », « 7 minutes »…), sonne et vibre à la fin.

Les niveaux Intense et Sans limite demandent une confirmation (tout le monde majeur et d'accord) : c'est osé, jamais porno.

## Règles et mentions légales
- Le bouton **i** en haut de chaque jeu affiche ses règles (elles s'adaptent au mode avec ou sans alcool).
- **Mentions légales** en bas de l'accueil : éditeur, hébergeurs, public majeur, alcool et sécurité, responsabilité, propriété intellectuelle, données personnelles (tout reste sur le téléphone, bouton « Effacer toutes mes données »). L'éditeur et le contact se modifient dans la constante `LEGAL` de `index.html`.

## Appli Android (hors ligne)

Chaque modification du jeu compile automatiquement un APK (GitHub Actions, `.github/workflows/android.yml`) et le publie dans les **Releases** du dépôt.

1. Sur le téléphone, ouvre la dernière release et télécharge `La-Tournee.apk`.
2. Ouvre le fichier et autorise l'installation depuis cette source si Android le demande.
3. L'appli fonctionne ensuite sans connexion (polices incluses). Pour mettre à jour, installe la nouvelle version par-dessus : joueurs et réglages sont conservés.

Fichiers liés : `capacitor.config.json`, `package.json`, `fonts/`, `android-assets/` (icônes, écran de démarrage, clé de signature de l'APK) et `tools/` (`make_icons.py` régénère les icônes, `prepare-android.sh` personnalise le projet Android).
