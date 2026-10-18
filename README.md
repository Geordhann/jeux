# Jeux de soirée

Trois applis, un seul dépôt :

| Appli | Jeux | Comment on joue |
| --- | --- | --- |
| **La Tournée** | Action ou Vérité, Undercover, Paranoïa, La Roue… | Un seul téléphone qui fait le tour de la table, hors ligne |
| **La Veillée** | Tu préfères, Loup-Garou (version ultime, jusqu'à 47 joueurs), Téléphone dessiné, Action ou Vérité | Chacun sur son téléphone, en ligne |
| **Le Tapis** | Poker, Blackjack, Roulette (jetons fictifs, 18+) | Chacun sur son téléphone, en ligne |

Chaque appli a son icône, son APK et ses mentions légales.

```
index.html, android-assets/, capacitor.config.json   La Tournée
apps/veillee/   La Veillée (page, config Capacitor, icônes)
apps/tapis/     Le Tapis (page, config Capacitor, icônes)
shared/         socle commun de La Veillée et du Tapis : design (salon.css),
                accueil, règles, mentions légales et parties en ligne (salon.js),
                sons, musiques et ambiances (son.js), PeerJS
fonts/          polices incluses (hors ligne)
tools/          build-www.sh (prépare une appli), prepare-android.sh, make_icons.py
tests/          banc d'essai automatique (banc.js) et téléphones virtuels (telephones.html)
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

Une veillée au cœur de la forêt : décor de village de nuit dans sa clairière (sapins, lune, brume, lucioles, fenêtres allumées), qui passe à l'aube pendant le jour du Loup-Garou. Celui qui crée la partie reçoit un **code à 4 lettres** et un **QR code** ; les autres scannent le QR code avec l'appareil photo (ça ouvre la version web, iPhone compris, avec le code rempli), ou touchent **Rejoindre une partie** puis « Scanner le QR code », ou tapent le code (lien direct : `index.html?code=ABCD`). Chacun peut ajouter **sa photo** en rejoignant : elle s'affiche à côté de son prénom chez tout le monde (et en grand quand c'est son tour à Action ou Vérité).

- **Tu préfères** (début de soirée) : la question s'affiche sur tous les téléphones, chacun vote en secret, les résultats tombent avec les noms, la minorité prend un gage. Niveaux Soft et Piquant.
- **Loup-Garou, version ultime** : tous les personnages des boîtes en cartes (jeu de base, Nouvelle Lune, Personnages, Le Village : 47 cartes), de 4 à **47 joueurs**, plus le meneur.
  - Composition rapide (Découverte, Classique, Complet, Ultime) ou à la main, nombre de loups conseillé, cartes du voleur et rôles du comédien gérés.
  - **Ordre d'appel officiel** de la nuit, filtré selon les rôles en jeu : Voleur, Comédien, Cupidon, Chien-loup, Voyante, Renard, Amoureux, Juge bègue, Sœurs, Frères, Enfant sauvage, Montreur d'ours, Corbeau, Pyromane, Salvateur, Loups-garous (et la petite fille qui espionne), Infect père, Grand méchant loup (tant qu'aucun loup n'est mort), Loup blanc (une nuit sur deux), Sorcière, Gitane, Joueur de flûte, Charmés. Les rôles de la première nuit disparaissent ensuite ; les morts sont appelés quand même, en silence.
  - Les pouvoirs se jouent sur les téléphones : la voyante voit la carte choisie, Cupidon désigne les amoureux, le salvateur protège, la sorcière sauve ou empoisonne, le renard flaire, le corbeau désigne, le joueur de flûte charme, le voleur échange sa carte, le chien-loup et l'enfant sauvage choisissent… Le meneur voit tout et peut toujours corriger.
  - Le matin, protections, potions, infection et Ancien sont appliqués automatiquement, puis les morts sont annoncés (avec des annonces rigolotes en option).
  - **Le maire** est élu par vote : il porte une écharpe tricolore bleu-blanc-rouge sur tous les écrans, sa voix compte double et, s'il meurt, il désigne son successeur.
  - Votes secrets sur les téléphones (corbeau, égalité et bouc émissaire, second vote du juge bègue, idiot gracié), victoires de chaque camp détectées (village, loups, amoureux, joueur de flûte, loup blanc, ange, sectaire, pyromane). La partie **s'arrête toute seule** : le village gagne quand le dernier loup tombe, les loups dès qu'ils sont aussi nombreux que les autres vivants. Chaque téléphone affiche alors **Victoire** ou **Défaite** selon le camp du joueur (les morts gagnent avec leur camp), puis toutes les cartes. Si un chasseur vient de mourir, le meneur attend son tir et annonce la fin lui-même.
- **Téléphone dessiné** (3 joueurs minimum) : chacun écrit une phrase, le voisin la dessine, le suivant devine le dessin, et ainsi de suite. À la fin, l'hôte fait défiler les albums sur tous les téléphones. Chrono au choix.
- **Qui pourrait…** (pour rire) : la question s'affiche sur tous les téléphones, chacun touche en secret le prénom de la personne qui colle le mieux, le plus désigné prend un gage. Niveaux Soft, **WTF** (plus de 50 questions absurdes) et Piquant.
- **Couples** : dans le salon de Tu préfères, Qui pourrait et Action ou Vérité, l'hôte touche deux prénoms pour former un couple (gardés pour les soirées suivantes). Avec « les couples restent entre eux », on ne vote jamais pour soi ni pour son couple à Qui pourrait, et en Piquant les défis d'Action ou Vérité avec un autre joueur se font avec son ou sa partenaire (comme dans La Tournée).
- **Action ou Vérité** (fin de soirée) : chacun son tour, le joueur choisit sur son téléphone, la carte s'affiche chez tout le monde, chacun réagit (rire, feu, peur, bravo), joker = un gage. Niveaux Soft et Piquant, cartes reprises de La Tournée (qui garde sa version sur un seul téléphone).

# Le Tapis

Poker, Blackjack, Roulette et Machine à sous entre amis, chacun sur son téléphone, avec 1 000 jetons **fictifs** par joueur (recave possible) : jamais d'argent réel. Réservé aux majeurs (confirmation au premier lancement). On peut rejoindre la table entre deux mains.
- **Poker** (Texas Hold'em sans limite, 2 à 10 joueurs) : deux cartes secrètes sur ton téléphone, le tapis au centre (flop, turn, river), blindes au choix (5/10, 10/20, 25/50). L'appli gère le bouton, les relances, les tapis, les pots partagés et l'abattage.
- **Blackjack** : tout le monde contre la banque tenue par l'appli (sabot de 6 jeux, la banque tire jusqu'à 17, blackjack payé 3 pour 2, doubler possible). Gages de soirée au choix : aucun, gorgées ou gages.
- **Roulette** (européenne, un seul zéro) : chacun pose ses jetons sur le tapis de son téléphone (pleins, rouge/noir, pair/impair, manque/passe, douzaines, colonnes), puis la bille est lancée et la roue tourne en même temps sur tous les téléphones. Historique des derniers numéros, « rejouer mes mises », gages en option.
- **Machine à sous** : chacun sa machine néon sur son téléphone (mise de 5 à 50, levier, trois rouleaux qui s'arrêtent l'un après l'autre). Trois pareils de 5 à 100 fois la mise, deux cerises 2 fois, trois 7 = **jackpot commun** qui grossit à chaque tirage de n'importe qui et s'annonce sur tous les téléphones. Classement en direct, mode **tournoi** (10, 20 ou 30 tirages chacun, podium à la fin) et gages en option.

## Icônes
Toutes les icônes sont dessinées pour les applis (SVG dans `shared/icones.js`, `shared/ic-veillee.js` et `shared/ic-tapis.js`), à la place des émojis : style enluminure médiévale pour La Veillée (les 33 personnages du Loup-Garou en médaillons, teintés selon leur camp), néon années 80 pour Le Tapis. Dans un texte, `[[loup]]` devient l'icône à l'affichage. Planche complète : [`docs/icones.png`](docs/icones.png).

## Sons et ambiances (La Veillée et Le Tapis)
Tout est composé en direct par l'appli (synthèse Web Audio, `shared/son.js`) : créations originales, libres de droits, rien à télécharger. Le bouton en bas à droite règle la musique, l'ambiance, les bruitages et le volume.
- **La Veillée** : musique au choix, feu de camp (guitare et flûte) ou guinguette (accordéon). Pendant le Loup-Garou, ambiance de forêt : la nuit, vent dans les arbres, ruisseau, grillons, crapaud, chouette et loups qui hurlent au loin ; le jour, cigales, oiseaux et brise. La cloche sonne au réveil du village, la chouette à la tombée de la nuit, les loups hurlent quand le meneur les appelle, une fanfare salue le nouveau maire.
- **Le Tapis** : couleurs de Las Vegas années 80 (nuit violette, néons rose et turquoise adoucis, or). Musique au choix : jazz lounge ou Vegas 80 (synthés et boîte à rythmes). Bruit de la roulette (la bille roule, ralentit, rebondit et se pose), levier et rouleaux de la machine à sous, pluie de pièces du jackpot, cartes distribuées, jetons, gains et pertes.
- En partie, la musique et l'ambiance jouent sur le téléphone de l'hôte (pour ne pas avoir 20 musiques décalées) ; chaque invité peut les activer chez lui. Les bruitages jouent sur tous les téléphones.
- Le « ? » de chaque jeu (accueil et en partie) ouvre ses règles ; le nombre de joueurs connectés s'affiche en haut pendant la partie.

## Fonctionnement en ligne (La Veillée et Le Tapis)
Chacun installe l'APK de l'appli sur son téléphone. L'hôte crée la partie et donne le code, les autres le tapent : **jusqu'à 20 téléphones par partie** (47 pour le Loup-Garou). Connexion internet nécessaire. Le téléphone de l'hôte sert de serveur ; les autres s'y connectent en direct (WebRTC via [PeerJS](https://peerjs.com), inclus dans `shared/`, avec le service gratuit de mise en relation de PeerJS). Un téléphone qui se met en veille se reconnecte tout seul et retrouve sa place ; si l'hôte ferme l'appli, il peut reprendre la partie depuis l'accueil.

Pour tester sur un ordinateur : `tools/build-www.sh veillee` (ou `tapis`), puis servir le dossier `build/veillee/www` (par exemple `python3 -m http.server`). Avec `index.html?local`, plusieurs onglets du même navigateur jouent ensemble sans réseau.

Les mentions légales propres à chaque appli (public, alcool, absence d'argent réel pour Le Tapis…) se trouvent dans `window.APP.legal` de sa page ; l'éditeur et le contact, communs, dans la constante `LEGAL` de `shared/salon.js`.

## Sur iPhone

- **Version web (le plus simple, gratuit)** : https://geordhann.github.io/jeux/ — ouvre la page dans Safari, touche une appli, puis Partager › « Sur l'écran d'accueil ». L'appli s'ouvre en plein écran avec son icône, et les iPhone jouent avec les Android dans les mêmes parties. Publiée automatiquement à chaque modification (`.github/workflows/web.yml`, branche `gh-pages`, préparée par `tools/build-web.py`). À activer une seule fois : Settings › Pages › « Deploy from a branch » › `gh-pages` / `(root)`. En attendant, la même version passe par https://raw.githack.com/Geordhann/jeux/gh-pages/index.html (gratuit, une page d'avertissement s'affiche avant).
- **Appli iOS native** : GitHub compile les trois applis pour iPhone sur un Mac (`.github/workflows/ios.yml`) et publie des fichiers `.ipa` **non signés** dans les Releases (`veillee-ios-v1.0.N`…). Apple n'autorise pas l'installation d'une appli non signée : il faut la signer avec un identifiant Apple depuis un ordinateur (Sideloadly ou AltStore, gratuit, à refaire tous les 7 jours), ou passer par TestFlight / l'App Store avec un compte développeur Apple (99 € par an). Icônes et écran de démarrage : `make_icons.py`, `tools/prepare-ios.sh`.

## Tester avant de jouer

- **Banc d'essai automatique** : `npm test` (après `npm ci`). Des téléphones virtuels jouent chaque jeu en ligne du début à la fin : Loup-Garou complet (pouvoirs, maire, votes, fin automatique avec victoire ou défaite), charge maximale à 47 joueurs, Téléphone dessiné, Tu préfères, Qui pourrait (couples respectés), Action ou Vérité, Poker (aucun jeton perdu), Blackjack et Roulette (paiements vérifiés, 20 joueurs), Machine à sous (tournoi à 6, jackpot, taux de gain simulé sur un million de tirages), reconnexion et sons. Il mesure les temps de réponse et écrit `tests/rapport.md`. `npm test -- lg rl` ne lance que certains essais. Il tourne aussi sur GitHub à chaque modification (onglet Actions, « Banc d'essai des jeux en ligne »).
- **Téléphones virtuels** : `npm run telephones`, puis ouvre l'adresse affichée (http://localhost:8080). Jusqu'à 8 téléphones côte à côte, reliés sans internet : le téléphone 1 crée la partie, les autres la rejoignent (code et prénom déjà remplis), « ⟳ » redémarre un téléphone pour tester la reconnexion.

## Applis Android

Chaque modification compile automatiquement les trois APK (GitHub Actions, `.github/workflows/android.yml`) et les publie dans les **Releases** du dépôt : `La-Tournee.apk`, `La-Veillee.apk` et `Le-Tapis.apk`.

1. Sur le téléphone, ouvre la dernière release de l'appli voulue et télécharge son APK.
2. Ouvre le fichier et autorise l'installation depuis cette source si Android le demande.
3. Pour mettre à jour, installe la nouvelle version par-dessus : réglages conservés. La Tournée fonctionne sans connexion ; La Veillée et Le Tapis ont besoin d'internet pour jouer.

Fichiers liés : `capacitor.config.json` et `apps/*/capacitor.config.json`, `package.json`, `fonts/`, `android-assets/` et `apps/*/android-assets/` (icônes, écran de démarrage ; la clé de signature des APK est dans `android-assets/`) et `tools/` (`build-www.sh <appli>` prépare une appli dans `build/`, `make_icons.py <appli>` régénère ses icônes, `prepare-android.sh` personnalise le projet Android).
