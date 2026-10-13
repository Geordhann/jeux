# Jeux de soirée

Trois applis, un seul dépôt :

| Appli | Jeux | Comment on joue |
| --- | --- | --- |
| **La Tournée** | Action ou Vérité, Undercover, Paranoïa, La Roue… | Un seul téléphone qui fait le tour de la table, hors ligne |
| **La Veillée** | Loup-Garou, Téléphone dessiné | Chacun sur son téléphone, en ligne |
| **Le Tapis** | Poker, Blackjack (jetons fictifs, 18+) | Chacun sur son téléphone, en ligne |

Chaque appli a son icône, son APK et ses mentions légales.

```
index.html, android-assets/, capacitor.config.json   La Tournée
apps/veillee/   La Veillée (page, config Capacitor, icônes)
apps/tapis/     Le Tapis (page, config Capacitor, icônes)
shared/         socle commun de La Veillée et du Tapis : design (salon.css),
                accueil, règles, mentions légales et parties en ligne (salon.js), PeerJS
fonts/          polices incluses (hors ligne)
tools/          build-www.sh (prépare une appli), prepare-android.sh, make_icons.py
```

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

Le niveau Sans limite demande une confirmation (tout le monde majeur et d'accord) : c'est osé, jamais porno.

## Règles et mentions légales
- Le bouton **i** en haut de chaque jeu affiche ses règles (elles s'adaptent au mode avec ou sans alcool).
- **Mentions légales** en bas de l'accueil : éditeur, hébergeurs, public majeur, alcool et sécurité, responsabilité, propriété intellectuelle, données personnelles (tout reste sur le téléphone, bouton « Effacer toutes mes données »). L'éditeur et le contact se modifient dans la constante `LEGAL` de `index.html`.

# La Veillée

Jeux où chaque joueur utilise son propre téléphone. Celui qui crée la partie reçoit un **code à 4 lettres** ; les autres ouvrent La Veillée › **Rejoindre une partie** et tapent ce code (ou ouvrent un lien `index.html?code=ABCD`).
- **Loup-Garou** : le créateur est le maître du jeu (il ne joue pas). Il choisit les cartes (loups automatiques ou à la main, Voyante, Sorcière, Chasseur, Cupidon, Petite fille, Salvateur, Ancien, Idiot du village, Loup blanc), lance la roue, et chacun reçoit sa carte en secret sur son téléphone. Le MJ pilote ensuite la partie : déroulé de la nuit à lire à voix haute, victimes (☠), amoureux (💘), potions, réveil du village avec annonce des morts, votes, et révélation de toutes les cartes à la fin. Les loups voient leurs complices et les amoureux leur partenaire (désactivable).
- **Téléphone dessiné** (3 joueurs minimum) : chacun écrit une phrase, le voisin la dessine, le suivant devine le dessin, et ainsi de suite. À la fin, l'hôte fait défiler les albums sur tous les téléphones. Chrono au choix.

# Le Tapis

Poker et Blackjack entre amis, chacun sur son téléphone, avec 1 000 jetons **fictifs** par joueur (recave possible) : jamais d'argent réel. Réservé aux majeurs (confirmation au premier lancement). On peut rejoindre la table entre deux mains.
- **Poker** (Texas Hold'em sans limite, 2 à 10 joueurs) : deux cartes secrètes sur ton téléphone, le tapis au centre (flop, turn, river), blindes au choix (5/10, 10/20, 25/50). L'appli gère le bouton, les relances, les tapis, les pots partagés et l'abattage.
- **Blackjack** : tout le monde contre la banque tenue par l'appli (sabot de 6 jeux, la banque tire jusqu'à 17, blackjack payé 3 pour 2, doubler possible). Gages de soirée au choix : aucun, gorgées ou gages.

## Fonctionnement en ligne (La Veillée et Le Tapis)
Connexion internet nécessaire. Le téléphone de l'hôte sert de serveur ; les autres s'y connectent en direct (WebRTC via [PeerJS](https://peerjs.com), inclus dans `shared/`, avec le service gratuit de mise en relation de PeerJS). Un téléphone qui se met en veille se reconnecte tout seul et retrouve sa place ; si l'hôte ferme l'appli, il peut reprendre la partie depuis l'accueil.

Pour tester sur un ordinateur : `tools/build-www.sh veillee` (ou `tapis`), puis servir le dossier `build/veillee/www` (par exemple `python3 -m http.server`). Avec `index.html?local`, plusieurs onglets du même navigateur jouent ensemble sans réseau.

Les mentions légales propres à chaque appli (public, alcool, absence d'argent réel pour Le Tapis…) se trouvent dans `window.APP.legal` de sa page ; l'éditeur et le contact, communs, dans la constante `LEGAL` de `shared/salon.js`.

## Applis Android

Chaque modification compile automatiquement les trois APK (GitHub Actions, `.github/workflows/android.yml`) et les publie dans les **Releases** du dépôt : `La-Tournee.apk`, `La-Veillee.apk` et `Le-Tapis.apk`.

1. Sur le téléphone, ouvre la dernière release de l'appli voulue et télécharge son APK.
2. Ouvre le fichier et autorise l'installation depuis cette source si Android le demande.
3. Pour mettre à jour, installe la nouvelle version par-dessus : réglages conservés. La Tournée fonctionne sans connexion ; La Veillée et Le Tapis ont besoin d'internet pour jouer.

Fichiers liés : `capacitor.config.json` et `apps/*/capacitor.config.json`, `package.json`, `fonts/`, `android-assets/` et `apps/*/android-assets/` (icônes, écran de démarrage ; la clé de signature des APK est dans `android-assets/`) et `tools/` (`build-www.sh <appli>` prépare une appli dans `build/`, `make_icons.py <appli>` régénère ses icônes, `prepare-android.sh` personnalise le projet Android).
