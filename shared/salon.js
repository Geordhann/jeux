/* Socle commun de La Veillée et du Tapis : écrans de base (intro, accueil, règles, mentions légales)
   et parties en ligne où chacun joue sur son téléphone.
   La page définit window.APP (nom, jeux, mentions légales propres) avant de charger ce fichier,
   puis enregistre ses jeux dans MPG et appelle start(). */
const APP = window.APP;
const LEGAL = { editor: 'Geordhann', contact: 'github.com/Geordhann/jeux', year: 2026 };

/* ---------- Outils ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(APP.id + '.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(APP.id + '.' + k, JSON.stringify(v)); } catch (e) {} },
  clear() { try { Object.keys(localStorage).filter(k => k.startsWith(APP.id + '.')).forEach(k => localStorage.removeItem(k)); } catch (e) {} },
};
const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rand = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const buzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, Math.max(2200, msg.length * 70));
}
const ring = () => buzz([300, 120, 300]); // les sons eux-mêmes viennent de son.js

/* ---------- État et écrans de base ---------- */
const S = { screen: 'home', intro: true, info: null, confirm: null, adult: store.get('adult', false), mpForm: null, mpCode: '' };
const actions = {}, SCREENS = {}, MPG = {};
const rulesBtn = id => `<button class="info" data-a="info" data-v="${id}" aria-label="Règles du jeu">?</button>`;
const topbar = (title, rules) => `<div class="topbar"><button class="back" data-a="home" aria-label="Retour au menu">←</button><h2>${title}</h2>${rules ? rulesBtn(rules) : ''}</div>`;
const cardIdx = letter => `<span class="idx tl"><b>${letter}</b><i></i></span><span class="idx br"><b>${letter}</b><i></i></span>`;
const logo = cls => `<h1 class="logo ${cls}">${APP.logo[0]} <span>${APP.logo[1]}</span></h1>`;

function intro() {
  const gate = APP.adult && !S.adult;
  return `<div class="intro" ${gate ? '' : 'data-a="intro-go"'}>
    <div class="deal" aria-hidden="true">${APP.deal.map((c, i) => `<span class="c c${i + 1} ${i === 1 ? 'b' : ''}"><b>${c}</b></span>`).join('')}</div>
    ${logo('intro-logo')}
    <p class="intro-tag">${APP.tagline}</p>
    <p class="intro-hook">${APP.hooks[rand(APP.hooks.length)]}</p>
    ${gate ? `<p class="intro-tag">${APP.adultNote}</p><button class="btn big intro-btn" data-a="adult-ok">J'ai 18 ans ou plus</button>`
      : `<button class="btn big intro-btn" data-a="intro-go">C'est parti</button>`}
  </div>`;
}
function home() {
  const resume = mpSaved();
  return `<header class="home-head">${logo('small')}<p class="tag">${APP.tagline}</p></header>
  ${resume ? `<div class="notice"><b>Partie ${esc(resume.code)} en cours (${mpGameName(resume.game)})</b><span>Tu l'avais créée sur ce téléphone.</span>
    <div class="row"><button class="btn red" data-a="mp-resume">Reprendre</button><button class="btn ghost" data-a="mp-forget" style="color:var(--ink);border-color:var(--ink)">Oublier</button></div></div>` : ''}
  <h3 class="sec-title"><span>Créer une partie</span><span>chacun son téléphone</span></h3>
  <section class="games">
    ${APP.games.map(g => `<div class="game-row" style="--tile:${g.color || 'var(--gold)'}"><button class="game" data-a="mp-new" data-v="${g.id}">
      <span class="suit emo" aria-hidden="true">${g.icon}</span>
      <span>${g.when ? `<small class="when">${g.when}</small>` : ''}<b>${g.name}</b><small>${g.desc}</small><small class="players">👥 ${g.players}</small></span>
      <span class="go" aria-hidden="true">›</span></button>${rulesBtn(g.id)}</div>`).join('')}
  </section>
  <button class="btn big" data-a="mp-joinform">Rejoindre une partie</button>
  <p class="hint">Connexion internet nécessaire. Celui qui crée la partie donne un code à 4 lettres aux autres. Touche « ? » pour lire les règles, et le bouton en bas à droite pour régler les sons.</p>
  ${APP.homeNote ? `<p class="rule">${APP.homeNote}</p>` : ''}
  <footer class="foot"><button class="link" data-a="open" data-v="legal">Mentions légales</button><span>${LEGAL.year} © ${APP.name}. Tous droits réservés.</span></footer>`;
}
function rules() {
  const r = (MPG[S.info] ? MPG[S.info].rules : APP.rules[S.info])();
  return `<div class="topbar"><button class="back" data-a="info-close" aria-label="Fermer les règles">←</button><h2>Règles</h2></div>
  <div class="card legal-card"><p class="kind">Comment jouer</p><h3 class="rules-title">${r.title}</h3>
    <ol class="steps">${r.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
    ${r.tips.length ? `<ul class="tips">${r.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div>
  <button class="btn big" data-a="info-close">Compris</button>`;
}
function legal() {
  const sec = (h, body) => `<section class="legal"><h2>${h}</h2>${body}</section>`, L = APP.legal;
  return `${topbar('Mentions légales')}
  <div class="legal-wrap">
  ${sec('Mentions légales', `<p>L'application ${APP.name} (version Android et version web) ${L.what}, gratuite et non commerciale, éditée à titre personnel par ${esc(LEGAL.editor)} (ci-après « l'Éditeur »).</p>
    <p>Éditeur : ${esc(LEGAL.editor)}, particulier</p><p>Contact : ${esc(LEGAL.contact)}</p><p>Statut : projet personnel, sans activité commerciale</p>
    <p>Hébergement du code et des fichiers d'installation : GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis (github.com)</p>`)}
  ${L.sections.map(([h, b]) => sec(h, b)).join('')}
  ${sec('Responsabilité', `<p>${APP.name} est un divertissement destiné à un usage privé entre amis. Chaque joueur reste seul responsable de ses actes et du respect de la loi.</p>
    <p>Le jeu en ligne dépend de la connexion internet des joueurs et de services tiers gratuits (mise en relation). L'Éditeur ne peut être tenu responsable de l'usage fait de l'application, ni des éventuelles erreurs, coupures ou indisponibilités.</p>`)}
  ${sec('Propriété intellectuelle', `<p>Les textes, le design et le code ${APP.of} sont la propriété de l'Éditeur, sauf mention contraire, et ne peuvent être reproduits sans autorisation préalable. Les dessins et textes créés pendant une partie appartiennent à leurs auteurs.</p>
    ${L.ip}
    <p>La musique, les ambiances et les bruitages sont composés en direct par l'application (synthèse sonore) : ce sont des créations originales, sans morceau ni enregistrement d'œuvre tierce.</p>
    <p>Polices Bagel Fat One, Figtree et Fraunces : licence SIL Open Font License 1.1. Application Android construite avec Capacitor (Ionic), licence MIT. Connexion entre téléphones : PeerJS, licence MIT.</p>`)}
  ${sec('Jeu en ligne et données personnelles', `<p>${APP.name} ne collecte aucune donnée personnelle pour l'Éditeur : pas de compte, pas de cookie, pas de publicité, pas de statistiques.</p>
    <p>Pendant une partie, les téléphones se connectent directement entre eux (WebRTC, connexion chiffrée). Le prénom que tu choisis et les actions de jeu${L.dataExtra || ''} circulent uniquement entre les téléphones de la partie. L'Éditeur ne les reçoit pas et ne les conserve pas.</p>
    <p>Pour que les téléphones se trouvent, l'application utilise le service gratuit de mise en relation PeerJS (0.peerjs.com), qui voit l'adresse IP de chaque téléphone et un identifiant technique temporaire, mais pas le contenu de la partie. Si une connexion directe est impossible (certains réseaux mobiles), les échanges chiffrés passent par un serveur relais de PeerJS.</p>
    <p>Sur ton téléphone sont enregistrés : ton prénom, tes réglages et, si tu crées la partie, l'état de la partie en cours (6 heures au plus) pour pouvoir la reprendre. Dans la version web, les polices peuvent être chargées depuis Google Fonts, ce qui transmet ton adresse IP à Google.</p>
    <p>Tu peux tout effacer à tout moment avec le bouton ci-dessous, ou en désinstallant l'appli.</p>
    ${S.confirm === 'wipe' ? `<div class="row"><button class="btn red" data-a="wipe-ok">Oui, tout effacer</button><button class="btn ghost" data-a="wipe-no">Annuler</button></div>`
      : `<button class="btn ghost" data-a="wipe">Effacer toutes mes données</button>`}`)}
  </div>
  <footer class="foot"><span>${LEGAL.year} © ${APP.name}. Tous droits réservés.</span><span>@${esc(LEGAL.editor)}</span></footer>`;
}
Object.assign(SCREENS, { home, legal, mp, mpjoin });

/* ---------- Rendu et gestes ---------- */
let lastScreen = null;
function render(scroll = true) {
  const s = S.screen;
  app.innerHTML = S.intro ? intro() : S.info ? rules() : SCREENS[s]();
  document.body.classList.toggle('on-intro', S.intro);
  // En partie, chaque nouvelle étape (mises, tirage, résultats…) repart du haut de l'écran
  const step = s === 'mp' && MP ? (MP.role === 'host' ? MP.H.step : MP.view && MP.view.step) : '';
  const key = (S.intro && 'intro') || (S.info && 'info') || s + (step ? '-' + step : '');
  if ((scroll || step) && key !== lastScreen) window.scrollTo(0, 0);
  lastScreen = key;
  if (s === 'mp' && !S.intro && !S.info) mpAfter();
  if (APP.decor) APP.decor();
  if (typeof sonUpdate === 'function') sonUpdate();
}
Object.assign(actions, {
  home() { S.info = null; S.confirm = null; S.screen = 'home'; render(); },
  'intro-go'() { if (!S.intro) return; S.intro = false; render(); sfx('reveal'); },
  'adult-ok'() { S.adult = true; store.set('adult', true); S.intro = false; render(); sfx('reveal'); },
  info(v) { S.info = v; render(); },
  'info-close'() { S.info = null; render(); },
  open(v) { S.screen = v; S.confirm = null; render(); },
  wipe() { S.confirm = 'wipe'; render(false); },
  'wipe-no'() { S.confirm = null; render(false); },
  'wipe-ok'() {
    mpClose(true); store.clear();
    try { sessionStorage.clear(); } catch (e) {}
    location.reload();
  },
});
app.addEventListener('click', e => {
  const b = e.target.closest('[data-a]');
  if (!b || b.disabled || !actions[b.dataset.a]) return;
  actions[b.dataset.a](b.dataset.v);
});
app.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id !== 'joinForm') return;
  const name = mpCleanName(document.getElementById('jName').value), ci = document.getElementById('jCode');
  const code = ci ? ci.value.toUpperCase().replace(/[^A-Z]/g, '') : '';
  if (ci && code.length !== 4) { toast('Le code fait 4 lettres.'); return; }
  if (!name) { toast('Écris ton prénom.'); return; }
  store.set('mpLast', { ...store.get('mpLast', {}), name });
  if (ci) { S.mpCode = code; mpJoin(code, name); } else mpHost(S.mpForm, { name });
});
// Appli Android : le bouton retour revient en arrière au lieu de quitter
const capApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
if (capApp) capApp.addListener('backButton', () => {
  if (S.info) actions['info-close']();
  else if (S.intro) { if (!APP.adult || S.adult) actions['intro-go'](); else capApp.exitApp(); }
  else if (S.screen === 'mp') actions[S.confirm === 'mpquit' ? 'mp-quit-no' : 'mp-quit']();
  else if (S.screen !== 'home') actions.home();
  else capApp.exitApp();
});
function start() {
  // Lien d'invitation : ...?code=ABCD ouvre directement l'écran pour rejoindre
  const code = (new URLSearchParams(location.search).get('code') || '').toUpperCase().replace(/[^A-Z]/g, '');
  if (code.length === 4) { S.intro = APP.adult && !S.adult; S.mpCode = code; S.mpForm = 'join'; S.screen = 'mpjoin'; }
  render();
}

/* ---------- Parties en ligne ---------- */
// Le téléphone qui crée la partie sert de serveur : les autres s'y connectent en direct (WebRTC, via PeerJS)
// avec un code à 4 lettres. L'hôte garde tout l'état et n'envoie à chaque téléphone que ce qu'il doit voir.
const MP_PREFIX = 'gjeux-' + APP.id + '-v1-';
const MP_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ'; // sans I, L, O : pas de confusion avec 1 et 0
const MP_LOCAL = /[?&]local(=|&|$)/.test(location.search); // tests : partie entre onglets d'un même navigateur, sans réseau
const MP_CID = (() => { // identifiant de ce téléphone : il retrouve sa place (et sa carte) après une coupure
  const k = APP.id + '.cid', mk = () => Math.random().toString(36).slice(2, 12);
  try { const box = MP_LOCAL ? sessionStorage : localStorage; let c = box.getItem(k); if (!c) { c = mk(); box.setItem(k, c); } return c; } catch (e) { return mk(); }
})();
let MP = null, mpLock = null;

const mpCode = () => Array.from({ length: 4 }, () => MP_CHARS[rand(MP_CHARS.length)]).join('');
const mpCleanName = s => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 20);
const mpGameName = id => (APP.games.find(g => g.id === id) || {}).name || 'Partie en ligne';
function mpLoadLib() {
  if (MP_LOCAL || window.Peer) return Promise.resolve();
  return new Promise((ok, ko) => {
    const s = document.createElement('script');
    s.src = 'shared/peerjs.min.js'; s.onload = ok; s.onerror = ko;
    document.head.appendChild(s);
  });
}
const mpNewPeer = id => MP_LOCAL ? localPeer(id) : id ? new Peer(id, { debug: 0 }) : new Peer({ debug: 0 });

// Imite la petite partie de l'API PeerJS utilisée ici, avec un BroadcastChannel (mode ?local)
function localPeer(id) {
  const me = id || 'g' + Math.random().toString(36).slice(2, 9), bc = new BroadcastChannel(APP.id + '-mp');
  const h = {}, conns = {}, post = m => bc.postMessage({ ...m, from: me });
  const mk = other => {
    const ev = {}, c = conns[other] = {
      peer: other, open: false, on(e, f) { ev[e] = f; },
      send(d) { post({ k: 'data', to: other, d }); },
      close() { post({ k: 'close', to: other }); c.drop(); },
      drop() { if (c.dead) return; c.dead = true; c.open = false; delete conns[other]; ev.close && ev.close(); },
      up() { c.open = true; ev.open && ev.open(); }, ev,
    };
    return c;
  };
  const peer = {
    id: me, destroyed: false, disconnected: false, on(e, f) { h[e] = f; }, reconnect() {},
    connect(to) {
      const c = mk(to);
      setTimeout(() => post({ k: 'open', to }), 0);
      setTimeout(() => { if (!c.open && !c.dead && h.error) h.error({ type: 'peer-unavailable' }); }, 2500);
      return c;
    },
    destroy() { peer.destroyed = true; Object.values(conns).forEach(c => c.close()); bc.close(); },
  };
  bc.onmessage = ({ data: m }) => {
    if (m.to !== me || peer.destroyed) return;
    if (m.k === 'open') { const c = mk(m.from); h.connection && h.connection(c); post({ k: 'ack', to: m.from }); setTimeout(() => c.up(), 0); }
    else if (m.k === 'ack') { const c = conns[m.from]; c && c.up(); }
    else if (m.k === 'data') { const c = conns[m.from]; c && c.ev.data && c.ev.data(m.d); }
    else if (m.k === 'close') { const c = conns[m.from]; c && c.drop(); }
  };
  setTimeout(() => h.open && h.open(me), 0);
  return peer;
}

function mpWake() {
  try { if (navigator.wakeLock && !mpLock) navigator.wakeLock.request('screen').then(l => { mpLock = l; l.addEventListener('release', () => { if (mpLock === l) mpLock = null; }); }).catch(() => {}); } catch (e) {}
}
function mpClose(forget) {
  const m = MP;
  if (!m) return;
  MP = null;
  [m.retry, m.wd].forEach(clearTimeout);
  Object.values(m.timers || {}).forEach(clearTimeout);
  if (m.role === 'host') {
    m.conns.forEach(c => { try { c.send({ t: 'bye' }); } catch (e) {} });
    if (forget) store.set('mpHost', null);
  }
  setTimeout(() => { try { m.peer && m.peer.destroy(); } catch (e) {} }, 300);
  if (mpLock) { mpLock.release().catch(() => {}); mpLock = null; }
}
// Minuteur propre à une partie : annulé automatiquement quand la partie se ferme
function mpTimer(k, fn, ms) {
  const m = MP;
  if (!m) return;
  m.timers = m.timers || {};
  clearTimeout(m.timers[k]);
  if (fn) m.timers[k] = setTimeout(() => { if (MP === m) fn(); }, ms);
}
function mpFail(msg) { if (!MP) return; MP.status = 'error'; MP.err = msg; mpRefresh(); }
const NET_ERR = "Impossible de joindre le serveur de parties. Vérifie ta connexion internet.";

/* --- Hôte --- */
function mpHost(game, opts = {}) {
  mpClose();
  const resume = opts.resume;
  MP = { role: 'host', game, code: resume ? resume.code : mpCode(), status: 'connecting', conns: new Map(), H: resume ? resume.H : MPG[game].init(opts.name), resumed: !!resume, tries: 0 };
  if (resume) { MP.H.players.forEach(p => { p.on = p.cid === MP_CID; }); MPG[game].resume && MPG[game].resume(); }
  S.screen = 'mp'; S.confirm = null; render();
  const m = MP;
  mpLoadLib().then(() => MP === m && mpHostPeer(), () => mpFail(NET_ERR));
  mpWake();
}
function mpHostPeer() {
  const m = MP, peer = m.peer = mpNewPeer(MP_PREFIX + m.code);
  peer.on('open', () => { if (MP !== m || m.peer !== peer) return; m.status = 'open'; m.tries = 0; mpSave(); mpRefresh(); });
  peer.on('connection', conn => mpAccept(m, conn));
  peer.on('disconnected', () => setTimeout(() => { try { if (MP === m && peer.disconnected && !peer.destroyed) peer.reconnect(); } catch (e) {} }, 2000));
  peer.on('error', e => {
    if (MP !== m || m.peer !== peer) return;
    if (e.type === 'unavailable-id') {
      // Code déjà pris. En reprise de partie, l'ancien salon met quelques secondes à se libérer : on insiste.
      try { peer.destroy(); } catch (x) {}
      if (!m.resumed || m.tries++ > 15) { m.resumed = false; m.code = mpCode(); }
      setTimeout(() => MP === m && mpHostPeer(), m.resumed ? 2500 : 50);
    } else if (m.status !== 'open') { try { peer.destroy(); } catch (x) {} mpFail(NET_ERR); }
  });
}
function mpAccept(m, conn) {
  conn.on('data', d => { if (MP === m) mpHostRecv(conn, d); });
  conn.on('close', () => {
    if (MP !== m || !conn.cid || m.conns.get(conn.cid) !== conn) return;
    m.conns.delete(conn.cid);
    const p = mpP(conn.cid);
    if (p) p.on = false;
    mpPush();
  });
  conn.on('error', () => {});
}
const mpP = cid => MP.H.players.find(p => p.cid === cid);
function mpRefuse(conn, msg) { try { conn.send({ t: 'refuse', msg }); } catch (e) {} setTimeout(() => { try { conn.close(); } catch (e) {} }, 800); }
function mpHostRecv(conn, d) {
  if (!d || typeof d !== 'object') return;
  const H = MP.H;
  if (d.t === 'hello') {
    const cid = String(d.cid || '').slice(0, 24), name = mpCleanName(d.name);
    if (!cid || !name || cid === MP_CID) return mpRefuse(conn, "Impossible de rejoindre ta propre partie depuis le même téléphone.");
    let p = mpP(cid);
    if (!p) {
      if (H.step !== 'lobby' && !MPG[MP.game].lateJoin) return mpRefuse(conn, 'La partie a déjà commencé. Attends la prochaine !');
      const max = MPG[MP.game].max || 20;
      if (H.players.length >= max) return mpRefuse(conn, `La partie est complète (${max} joueurs maximum).`);
      let nm = name, k = 2;
      while (H.players.some(x => x.name.toLowerCase() === nm.toLowerCase())) nm = `${name} ${k++}`;
      p = { cid, name: nm }; MPG[MP.game].join && MPG[MP.game].join(p); H.players.push(p);
      toast(`${nm} a rejoint la partie.`);
    }
    const old = MP.conns.get(cid);
    if (old && old !== conn) { old.cid = null; try { old.close(); } catch (e) {} }
    conn.cid = cid; MP.conns.set(cid, conn); p.on = true;
    mpPush();
    return;
  }
  if (!conn.cid || MP.conns.get(conn.cid) !== conn) return;
  if (d.t === 'ping') { try { conn.send({ t: 'pong' }); } catch (e) {} return; }
  MPG[MP.game].act(conn.cid, d);
}
function mpPush() {
  if (!MP || MP.role !== 'host') return;
  const g = MPG[MP.game];
  MP.conns.forEach((conn, cid) => { if (conn.open) try { conn.send({ t: 'state', v: g.view(cid) }); } catch (e) {} });
  mpSave(); mpRefresh();
}
const mpBroadcast = msg => MP.conns.forEach(c => { if (c.open) try { c.send(msg); } catch (e) {} });
// La partie est gardée sur le téléphone de l'hôte : s'il recharge ou ferme l'appli, il peut la reprendre
function mpSave() { if (MP && MP.role === 'host') store.set('mpHost', { game: MP.game, code: MP.code, H: MP.H, at: Date.now() }); }
function mpSaved() { const s = store.get('mpHost', null); return s && MPG[s.game] && Date.now() - s.at < 6 * 3600e3 ? s : null; }

/* --- Invité --- */
function mpJoin(code, name) {
  mpClose();
  MP = { role: 'guest', code, name, status: 'connecting', view: null, ever: false, last: Date.now() };
  S.screen = 'mp'; S.confirm = null; render();
  const m = MP;
  mpLoadLib().then(() => MP === m && mpGuestConnect(), () => mpFail(NET_ERR));
  mpWake();
}
function mpGuestConnect() {
  const m = MP;
  [m.retry, m.wd].forEach(clearTimeout);
  if (m.peer) { const old = m.peer; setTimeout(() => { try { old.destroy(); } catch (e) {} }, 0); }
  m.conn = null;
  const peer = m.peer = mpNewPeer();
  peer.on('open', () => {
    if (MP !== m || m.peer !== peer) return;
    const conn = m.conn = peer.connect(MP_PREFIX + m.code, { reliable: true });
    conn.on('open', () => { if (MP === m && m.conn === conn) conn.send({ t: 'hello', cid: MP_CID, name: m.name }); });
    conn.on('data', d => { if (MP === m && m.conn === conn) mpGuestRecv(d); });
    conn.on('close', () => { if (MP === m && m.conn === conn) mpLost(); });
    conn.on('error', () => {});
    m.wd = setTimeout(() => { if (MP === m && m.conn === conn && m.status !== 'open') mpLost(); }, 12000);
  });
  peer.on('error', e => {
    if (MP !== m || m.peer !== peer) return;
    if (e.type === 'peer-unavailable' && !m.ever) {
      m.status = 'error'; m.err = `Aucune partie ouverte avec le code ${m.code}. Vérifie le code avec l'hôte.`;
      mpRefresh(); return;
    }
    mpLost();
  });
}
function mpLost() {
  const m = MP;
  if (!m || m.role !== 'guest' || ['refused', 'ended'].includes(m.status)) return;
  m.conn = null;
  if (!m.ever) { m.status = 'error'; m.err = m.err || NET_ERR; mpRefresh(); return; }
  m.status = 'lost'; mpRefresh();
  clearTimeout(m.retry);
  m.retry = setTimeout(() => MP === m && mpGuestConnect(), 3000);
}
function mpGuestRecv(d) {
  const m = MP;
  if (!d || typeof d !== 'object') return;
  m.last = Date.now();
  if (d.t === 'state' && d.v && MPG[d.v.game]) {
    clearTimeout(m.wd);
    const prev = m.view;
    m.ever = true; m.status = 'open'; m.view = d.v; m.game = d.v.game;
    store.set('mpLast', { code: m.code, name: m.name });
    MPG[m.game].notify && MPG[m.game].notify(prev, d.v);
    mpRefresh();
  } else if (d.t === 'refuse' || d.t === 'bye') {
    m.status = d.t === 'bye' ? 'ended' : 'refused';
    m.err = d.t === 'bye' ? "L'hôte a fermé la partie." : String(d.msg || '').slice(0, 200);
    m.conn = null; clearTimeout(m.retry);
    try { m.peer.destroy(); } catch (e) {}
    mpRefresh();
  } else if (MPG[m.game] && MPG[m.game].onHost) MPG[m.game].onHost(d);
}
// Le téléphone envoie un message à l'hôte (ou se le traite lui-même s'il est l'hôte)
function mpSend(msg) {
  if (!MP) return;
  if (MP.role === 'host') MPG[MP.game].act(MP_CID, msg);
  else if (MP.conn && MP.conn.open) try { MP.conn.send(msg); } catch (e) {}
}
setInterval(() => {
  const m = MP;
  if (!m || m.role !== 'guest' || m.status !== 'open' || !m.conn) return;
  try { m.conn.send({ t: 'ping' }); } catch (e) {}
  if (Date.now() - m.last > 15000) mpLost();
}, 4000);
document.addEventListener('visibilitychange', () => {
  const m = MP;
  if (document.visibilityState !== 'visible' || !m) return;
  mpWake();
  if (m.role === 'guest' && (m.status === 'lost' || (m.status === 'open' && Date.now() - m.last > 9000))) mpGuestConnect();
  if (m.role === 'host' && m.peer && m.peer.disconnected && !m.peer.destroyed) try { m.peer.reconnect(); } catch (e) {}
});

/* --- Écrans communs --- */
function mpCount() {
  const list = MP && (MP.role === 'host' ? MP.H && MP.H.players : MP.view && MP.view.players);
  return list ? list.filter(p => p.on !== false).length : 0;
}
const mpTop = (title, rules) => {
  const n = mpCount();
  return `<div class="topbar"><button class="back" data-a="mp-quit" aria-label="Quitter la partie">←</button><h2>${title}</h2>
    ${n ? `<span class="pcount" aria-label="${n} joueur${n > 1 ? 's' : ''} connecté${n > 1 ? 's' : ''}">👥 ${n}<small>/${(MPG[MP.game] || {}).max || 20}</small></span>` : ''}${rules ? rulesBtn(rules) : ''}</div>`;
};
function mpSound() {
  const g = MP && MP.game && MPG[MP.game];
  const v = g && (MP.role === 'host' ? g.view(MP_CID) : MP.view);
  if (!v) return;
  const prev = MP.lastView;
  MP.lastView = v;
  if (!prev || typeof sfx !== 'function') return;
  if (v.step === 'lobby' && v.players.length > prev.players.length) sfx('join');
  if (g.sound) try { g.sound(prev, v); } catch (e) {}
}
function mpRefresh() {
  mpSound();
  if (S.screen !== 'mp' || S.info || S.intro) return;
  const g = MP.game && MPG[MP.game];
  if (g && g.patch && g.patch()) return; // mise à jour légère, sans effacer ce que le joueur est en train de faire
  render(false);
}
function mpQuitBox() {
  if (S.confirm !== 'mpquit') return '';
  const host = MP && MP.role === 'host';
  return `<div class="banner"><p>${host ? 'Fermer la partie pour tout le monde ?' : 'Quitter la partie ?'}${host ? ' Tu pourras la reprendre depuis l\'onglet Jeux.' : ''}</p></div>
  <div class="row"><button class="btn red" data-a="mp-quit-ok">${host ? 'Fermer la partie' : 'Quitter'}</button><button class="btn ghost" data-a="mp-quit-no">Rester</button></div>`;
}
function roomBox(host) {
  const m = MP;
  if (m.status === 'connecting') return `<section class="room"><small>${host ? 'Ouverture de la partie' : 'Connexion'}</small><strong class="code wait">${esc(m.code)}</strong><span class="hint">Un instant…</span></section>`;
  return `<section class="room"><small>Code de la partie</small><strong class="code">${esc(m.code)}</strong>
    <span class="hint">${host ? `Les autres ouvrent ${APP.name} › « Rejoindre une partie » et tapent ce code.` : 'Tu es dans la partie.'}</span></section>`;
}
function mp() {
  const m = MP;
  if (!m) return `${topbar('Partie en ligne')}<p class="howto">Cette partie est terminée.</p><button class="btn big" data-a="home">Retour au menu</button>`;
  const title = mpGameName(m.game), rules = m.game;
  if (m.status === 'error' && !(m.role === 'guest' && m.ever)) return `${mpTop(title, rules)}
    <div class="card"><p class="kind">Oups</p><p class="text">${esc(m.err || NET_ERR)}</p></div>
    <div class="row"><button class="btn" data-a="mp-retry">Réessayer</button><button class="btn ghost" data-a="mp-quit-ok">Menu</button></div>`;
  if (m.status === 'refused' || m.status === 'ended') return `${mpTop(title, rules)}
    <div class="card"><p class="kind">${m.status === 'ended' ? 'Partie terminée' : 'Pas possible'}</p><p class="text">${esc(m.err)}</p></div>
    <button class="btn big" data-a="mp-quit-ok">Retour au menu</button>`;
  if (m.role === 'guest' && !m.view) return `${mpTop('Partie en ligne')}${roomBox(false)}<p class="howto">Connexion à la partie ${esc(m.code)}…</p>${mpQuitBox()}`;
  const lost = m.role === 'guest' && m.status === 'lost' ? `<div class="banner">Connexion perdue, reconnexion en cours…</div>` : '';
  return mpTop(title, rules) + lost + mpQuitBox() + MPG[m.game].screen();
}
function mpjoin() {
  const last = store.get('mpLast', {}), host = S.mpForm !== 'join';
  return `${topbar(host ? mpGameName(S.mpForm) : 'Rejoindre une partie')}
  <form class="panel" id="joinForm">
    ${host ? '' : `<label class="hint" for="jCode">Code de la partie</label>
    <input id="jCode" class="code-in" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD" value="${esc(S.mpCode || '')}">`}
    <label class="hint" for="jName">Ton prénom</label>
    <input id="jName" maxlength="20" autocomplete="off" placeholder="Prénom" value="${esc(last.name || '')}">
    <button class="btn big" type="submit">${host ? 'Créer la partie' : 'Rejoindre'}</button>
  </form>
  <p class="howto">Chacun joue sur son téléphone, avec une connexion internet. ${host ? 'Tu recevras un code à donner aux autres.' : "Demande le code à l'hôte de la partie."}</p>`;
}
function mpAfter() {
  if (!MP || S.screen !== 'mp') return;
  const g = MPG[MP.game];
  if (g && g.after) g.after();
}

Object.assign(actions, {
  'mp-new'(v) {
    if (MPG[v].narrator) { mpHost(v); return; } // le maître du jeu ne joue pas : pas besoin de son prénom
    S.mpForm = v; S.screen = 'mpjoin'; render();
  },
  'mp-joinform'() { S.mpForm = 'join'; S.screen = 'mpjoin'; render(); },
  'mp-resume'() { const s = mpSaved(); if (s) mpHost(s.game, { resume: s }); else { toast('Partie introuvable.'); render(); } },
  'mp-forget'() { store.set('mpHost', null); render(false); },
  'mp-retry'() {
    const m = MP;
    if (!m) return;
    m.status = 'connecting'; m.err = null; render(false);
    mpLoadLib().then(() => { if (MP !== m) return; if (m.role === 'host') mpHostPeer(); else mpGuestConnect(); }, () => mpFail(NET_ERR));
  },
  'mp-quit'() { S.confirm = 'mpquit'; render(false); },
  'mp-quit-no'() { S.confirm = null; render(false); },
  'mp-quit-ok'() { mpClose(true); S.confirm = null; S.screen = 'home'; render(); },
  'mp-kick'(cid) {
    const H = MP.H, conn = MP.conns.get(cid);
    if (H.step !== 'lobby') return;
    H.players = H.players.filter(p => p.cid !== cid);
    if (conn) { MP.conns.delete(cid); mpRefuse(conn, "L'hôte t'a retiré de la partie."); }
    mpPush();
  },
});
