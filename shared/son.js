/* Sons de La Veillée et du Tapis : bruitages, musiques et ambiances.
   Tout est synthétisé en direct par le téléphone (Web Audio) : créations originales, libres de droits,
   sans aucun fichier à télécharger. Chaque appli fournit ses morceaux (APP.tunes) et ses ambiances
   (APP.ambiances) ; ce fichier fournit le moteur, les instruments, les bruitages et le bouton « Sons ». */
const SON = {
  ctx: null, out: null, bus: {}, fx: null, noise: null, brown: null,
  music: store.get('sonMusic', true), sfx: store.get('sonSfx', true), amb: store.get('sonAmb', true),
  guest: store.get('sonGuest', false), vol: store.get('sonVol', .7),
  playing: null, step: 0, next: 0, timer: null, scene: null, sceneNode: null, open: false,
};
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

function sonInit() {
  if (SON.ctx) { if (SON.ctx.state !== 'running' && !document.hidden) SON.ctx.resume().catch(() => {}); return true; }
  const C = window.AudioContext || window.webkitAudioContext;
  if (!C) return false;
  try { SON.ctx = new C(); } catch (e) { return false; }
  const c = SON.ctx, comp = c.createDynamicsCompressor();
  SON.out = c.createGain(); SON.out.gain.value = SON.vol;
  SON.out.connect(comp); comp.connect(c.destination);
  [['music', .5], ['sfx', .9], ['amb', .85]].forEach(([k, v]) => { const g = c.createGain(); g.gain.value = v; g.connect(SON.out); SON.bus[k] = g; });
  // Écho doux, partagé par la musique et certains bruitages
  SON.fx = c.createDelay(1); SON.fx.delayTime.value = .29;
  const fb = c.createGain(), lp = c.createBiquadFilter(), wet = c.createGain();
  fb.gain.value = .32; lp.type = 'lowpass'; lp.frequency.value = 2200; wet.gain.value = .3;
  SON.fx.connect(lp); lp.connect(fb); fb.connect(SON.fx); lp.connect(wet); wet.connect(SON.out);
  SON.noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = SON.noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  // Bruit brun : plus grave et plus doux, pour le vent et l'eau
  SON.brown = c.createBuffer(1, c.sampleRate * 4, c.sampleRate);
  const b = SON.brown.getChannelData(0);
  let last = 0;
  for (let i = 0; i < b.length; i++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; b[i] = last * 3.5; }
  return true;
}
const sonNow = () => SON.ctx.currentTime;

/* ---------- Briques de son ---------- */
function env(g, t, v, a, r) {
  g.gain.setValueAtTime(.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(v, .0002), t + a);
  g.gain.exponentialRampToValueAtTime(.0001, t + a + r);
}
// Envoie un son vers une sortie (« music », « sfx », « amb » ou un nœud), avec panoramique et écho éventuels
function route(node, bus, fx, pan) {
  let n = node;
  if (pan && SON.ctx.createStereoPanner) { const p = SON.ctx.createStereoPanner(); p.pan.value = pan; n.connect(p); n = p; }
  n.connect(typeof bus === 'string' ? SON.bus[bus] : bus);
  if (fx) { const s = SON.ctx.createGain(); s.gain.value = fx; n.connect(s); s.connect(SON.fx); }
}
function tone(bus, t, f, dur, v, { type = 'sine', a = .005, fx = 0, to = 0, pan = 0, detune = 0 } = {}) {
  const c = SON.ctx, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + a + dur);
  if (detune) o.detune.value = detune;
  env(g, t, v, a, dur); o.connect(g); route(g, bus, fx, pan);
  o.start(t); o.stop(t + a + dur + .05);
}
function hiss(bus, t, dur, v, { type = 'bandpass', f = 2000, to = 0, q = 1, a = .003, fx = 0, pan = 0, buf } = {}) {
  const c = SON.ctx, src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf || SON.noise; src.loop = true;
  fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
  if (to) fl.frequency.exponentialRampToValueAtTime(to, t + a + dur);
  env(g, t, v, a, dur); src.connect(fl); fl.connect(g); route(g, bus, fx, pan);
  src.start(t, Math.random() * 1.5); src.stop(t + a + dur + .05);
}
// Note tenue (instruments de la musique)
function note(t, m, dur, v, { type = 'triangle', cut = 2400, a = .01, rel = .25, fx = .3, detune = 0, vib = 0, pan = 0, bus = 'music' } = {}) {
  const c = SON.ctx, f = c.createBiquadFilter(), g = c.createGain();
  f.type = 'lowpass'; f.frequency.value = cut;
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a);
  g.gain.setValueAtTime(v, t + Math.max(a, dur)); g.gain.exponentialRampToValueAtTime(.0001, t + dur + rel);
  f.connect(g); route(g, bus, fx, pan);
  let lfo = null;
  if (vib) { lfo = c.createOscillator(); const d = c.createGain(); lfo.frequency.value = 5.4; d.gain.value = vib; lfo.connect(d); lfo._d = d; lfo.start(t); lfo.stop(t + dur + rel + .05); }
  (detune ? [-detune, detune] : [0]).forEach(dt => {
    const o = c.createOscillator(); o.type = type; o.frequency.value = mtof(m); o.detune.value = dt;
    if (lfo) lfo._d.connect(o.detune);
    o.connect(f); o.start(t); o.stop(t + dur + rel + .05);
  });
}
const INST = {
  bass: (t, m, dur, v) => note(t, m, dur, v, { cut: 420, a: .012, rel: .12, fx: 0 }),
  // Guitare : attaque nette, extinction rapide
  pluck(t, m, v, dur = .35) {
    const c = SON.ctx, f = c.createBiquadFilter(), g = c.createGain(), o = c.createOscillator(), o2 = c.createOscillator();
    f.type = 'lowpass'; f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(700, t + dur);
    o.type = 'triangle'; o2.type = 'sawtooth'; o.frequency.value = o2.frequency.value = mtof(m);
    const g2 = c.createGain(); g2.gain.value = .25;
    env(g, t, v, .003, dur); o.connect(f); o2.connect(g2); g2.connect(f); f.connect(g); route(g, 'music', .35);
    [o, o2].forEach(x => { x.start(t); x.stop(t + dur + .1); });
  },
  // Accordéon musette : deux anches légèrement désaccordées et un vibrato
  musette: (t, m, dur, v) => note(t, m, dur, v, { type: 'square', cut: 1700, a: .035, rel: .18, fx: .35, detune: 11, vib: 6 }),
  // Piano électrique de bar
  ep(t, m, dur, v) { tone('music', t, mtof(m), dur, v, { a: .004, fx: .35 }); tone('music', t, mtof(m) * 2, dur * .5, v * .22, { a: .002 }); },
  vibe(t, m, dur, v) { note(t, m, dur, v, { type: 'sine', cut: 5000, a: .004, rel: .6, fx: .5, vib: 12 }); },
  brush: (t, dur, v) => hiss('music', t, dur, v, { f: 5200, q: .6, a: .04, to: 3500 }),
  ride: (t, v) => { hiss('music', t, .16, v, { type: 'highpass', f: 7500 }); tone('music', t, 5200, .12, v * .25); },
  kick: (t, v) => tone('music', t, 120, .25, v, { to: 45 }),
};

/* ---------- Bruitages ---------- */
// Instants d'un ralentissement (roue qui freine) : rapides au début, de plus en plus espacés
function easeTicks(t, T, K, fn) { for (let k = 1; k <= K; k++) fn(t + T * (1 - Math.cbrt(1 - k / K)), k / K); }
function bell(t, f, v, dur) { tone('sfx', t, f, dur, v, { fx: .4 }); tone('sfx', t, f * 2.01, dur * .6, v * .4, { fx: .4 }); tone('sfx', t, f * 3.98, dur * .3, v * .15); }
function clack(t, v) { hiss('sfx', t, .035, v, { f: 2600, q: 6 }); tone('sfx', t, 1700 + rand(500), .05, v * .35, { type: 'triangle' }); }
const SFX = {
  deal(t) { hiss('sfx', t, .13, .35, { f: 2600, to: 700, q: .9 }); },
  flip(t) { hiss('sfx', t, .03, .32, { type: 'highpass', f: 2500 }); hiss('sfx', t + .05, .05, .22, { f: 1500, q: 1.5 }); },
  shuffle(t) { for (let i = 0; i < 10; i++) hiss('sfx', t + i * .045 + Math.random() * .012, .03, .2, { type: 'highpass', f: 3000 + rand(1500) }); },
  chip(t) {
    [0, .055].forEach((d, i) => {
      hiss('sfx', t + d, .04, .28 - i * .1, { f: 3800, q: 5 });
      tone('sfx', t + d, 2650 + rand(300), .07, .07 - i * .02, { type: 'triangle' });
      tone('sfx', t + d, 4300 + rand(300), .05, .035);
    });
  },
  chips(t) { for (let i = 0; i < 4; i++) SFX.chip(t + i * .07 + Math.random() * .02); },
  ping(t) { tone('sfx', t, 880, .25, .11, { fx: .3 }); tone('sfx', t + .09, 1318.5, .35, .09, { fx: .3 }); },
  pop(t) { tone('sfx', t, 320, .09, .16, { to: 900, type: 'triangle' }); },
  join(t) { tone('sfx', t, 660, .12, .07, { type: 'triangle' }); tone('sfx', t + .08, 990, .18, .06, { type: 'triangle' }); },
  tick(t) { hiss('sfx', t, .012, .22, { type: 'highpass', f: 4000 }); tone('sfx', t, 1900, .02, .05); },
  send(t) { tone('sfx', t, 520, .08, .1, { to: 1040, type: 'triangle' }); tone('sfx', t + .07, 1560, .2, .05, { fx: .4 }); },
  win(t) { [72, 76, 79, 84].forEach((m, i) => bell(t + i * .09, mtof(m), .11, .9)); },
  tada(t) {
    [60, 64, 67, 72, 76].forEach((m, i) => bell(t + i * .07, mtof(m), .09, 1.2));
    for (let i = 0; i < 6; i++) tone('sfx', t + .4 + i * .07, 2000 + rand(2500), .25, .025, { fx: .6, pan: Math.random() * 1.6 - .8 });
  },
  lose(t) { tone('sfx', t, mtof(67), .28, .09, { type: 'triangle' }); tone('sfx', t + .22, mtof(62), .55, .08, { type: 'triangle' }); },
  // Roue qui tourne et ralentit : un clic à chaque case
  wheel(t, ms = 3400) { easeTicks(t, ms / 1000, 52, (s, p) => { hiss('sfx', s, .012, .3 * (1 - p * .4), { type: 'highpass', f: 3500 }); tone('sfx', s, 1350, .02, .045); }); },
  // Roulette : la bille roule, ralentit, tombe, rebondit sur les cases puis se pose
  roulette(t, ms = 5200) {
    const c = SON.ctx, T = ms / 1000;
    const src = c.createBufferSource(), bp = c.createBiquadFilter(), am = c.createGain(), g = c.createGain(), lfo = c.createOscillator(), depth = c.createGain();
    src.buffer = SON.noise; src.loop = true;
    bp.type = 'bandpass'; bp.Q.value = 2.5;
    bp.frequency.setValueAtTime(3400, t); bp.frequency.exponentialRampToValueAtTime(1300, t + T * .72);
    am.gain.value = .55; depth.gain.value = .45;
    lfo.frequency.setValueAtTime(17, t); lfo.frequency.exponentialRampToValueAtTime(4.5, t + T * .74);
    lfo.connect(depth); depth.connect(am.gain);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.32, t + .15);
    g.gain.exponentialRampToValueAtTime(.09, t + T * .7); g.gain.exponentialRampToValueAtTime(.0001, t + T * .8);
    src.connect(bp); bp.connect(am); am.connect(g); route(g, 'sfx', .12);
    src.start(t); src.stop(t + T); lfo.start(t); lfo.stop(t + T);
    hiss('sfx', t, T * .95, .13, { type: 'lowpass', f: 210, a: .35 }); // le cylindre en bois qui tourne
    const drop = t + T * .74;
    [0, .17, .29, .38, .45].forEach((d, i) => clack(drop + d, .34 * Math.pow(.72, i)));
    easeTicks(drop + .5, Math.max(.3, t + T - drop - .6), 9, (s, p) => clack(s, .06 * (1 - p * .6)));
    clack(t + T - .02, .1);
    // La musique se fait discrète pendant le tirage
    if (SON.bus.music) { const mg = SON.bus.music.gain; mg.setTargetAtTime(.18, t, .2); mg.setTargetAtTime(.5, t + T + .3, .6); }
  },
  // Cloche de l'église du village au lever du jour
  bell(t) {
    for (let k = 0; k < 3; k++) [[.5, .5, 3], [1, 1, 2.6], [1.19, .55, 2], [1.5, .4, 1.6], [2, .45, 1.4], [2.51, .25, 1], [3.01, .2, .8]]
      .forEach(([r, v, d]) => tone('sfx', t + k * 1.7, 294 * r, d, .06 * v, { a: .004, fx: .5 }));
  },
  // Chouette à la tombée de la nuit
  owl(t, bus = 'sfx', v = 1) {
    const hoo = (s, d, a) => tone(bus, s, 392, d, a * v, { to: 355, a: .08, fx: .5, pan: -.4 });
    hoo(t, .45, .13); hoo(t + .75, .18, .085); hoo(t + .98, .5, .115);
  },
  death(t) {
    [55, 82.4, 110, 164.8].forEach((f, i) => tone('sfx', t, f, 2.6 - i * .4, .15 / (i + 1), { a: .01, fx: .3 }));
    hiss('sfx', t, .5, .22, { type: 'lowpass', f: 300 });
  },
  reveal(t) { [84, 88, 91, 96].forEach((m, i) => tone('sfx', t + i * .05, mtof(m), .4, .035, { fx: .6 })); },
};
function sfx(name, ...args) {
  if (!SON.sfx || !SFX[name] || !sonInit()) return;
  try { SFX[name](sonNow() + .02, ...args); } catch (e) {}
}

/* ---------- Musique ---------- */
function musicTick() {
  const tune = APP.tunes && APP.tunes[SON.playing];
  if (!tune) return;
  const sd = 60 / tune.bpm / tune.div;
  while (SON.next < sonNow() + .2) {
    try { tune.play(SON.step, SON.next, sd); } catch (e) {}
    SON.next += sd; SON.step++;
  }
}
function musicStart(name) {
  if (!sonInit()) return;
  SON.playing = name; SON.step = 0; SON.next = sonNow() + .1;
  const g = SON.bus.music.gain; g.cancelScheduledValues(sonNow()); g.setValueAtTime(.0001, sonNow()); g.exponentialRampToValueAtTime(.5, sonNow() + 1.5);
  clearInterval(SON.timer); SON.timer = setInterval(musicTick, 30);
}
function musicStop() {
  clearInterval(SON.timer); SON.timer = null; SON.playing = null;
  if (SON.ctx) { const g = SON.bus.music.gain; g.cancelScheduledValues(sonNow()); g.setTargetAtTime(.0001, sonNow(), .15); }
}

/* ---------- Ambiances (fondu enchaîné d'un décor sonore à l'autre) ---------- */
function sonScene(name) {
  const old = SON.sceneNode;
  SON.scene = name; SON.sceneNode = null;
  if (old) { old.gain.gain.setTargetAtTime(.0001, sonNow(), .8); setTimeout(() => old.stop(), 4000); }
  if (!name || !APP.ambiances || !APP.ambiances[name] || !sonInit()) return;
  const gain = SON.ctx.createGain();
  gain.gain.setValueAtTime(.0001, sonNow()); gain.gain.setTargetAtTime(1, sonNow(), 1.2);
  gain.connect(SON.bus.amb);
  const parts = [];
  try { APP.ambiances[name](gain, parts); } catch (e) {}
  SON.sceneNode = { gain, stop() { parts.forEach(p => { try { typeof p === 'number' ? clearInterval(p) : p.stop(); } catch (e) {} }); gain.disconnect(); } };
}
// Sources continues pour les ambiances : bruit en boucle filtré, avec un souffle lent (LFO)
function loopNoise(out, parts, { buf, type = 'lowpass', f = 500, q = .7, v = .1, lfoF = 0, lfoDepth = 0, lfoV = 0, pan = 0 } = {}) {
  const c = SON.ctx, src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf || SON.brown; src.loop = true;
  fl.type = type; fl.frequency.value = f; fl.Q.value = q; g.gain.value = v;
  src.connect(fl); fl.connect(g); route(g, out, 0, pan);
  src.start(sonNow(), Math.random() * 2); parts.push(src);
  if (lfoF) { const l = c.createOscillator(), d = c.createGain(); l.frequency.value = lfoF; d.gain.value = lfoDepth; l.connect(d); d.connect(fl.frequency); l.start(); parts.push(l); }
  if (lfoV) { const l = c.createOscillator(), d = c.createGain(); l.frequency.value = lfoF * .7 || .05; d.gain.value = lfoV; l.connect(d); d.connect(g.gain); l.start(); parts.push(l); }
  return { fl, g };
}
// Événements ponctuels d'une ambiance : fn(t) appelée à intervalles aléatoires entre min et max secondes
function every(parts, min, max, fn) {
  let next = sonNow() + min * Math.random();
  parts.push(setInterval(() => {
    if (!SON.ctx || SON.ctx.state !== 'running') return;
    if (next < sonNow() - 1) next = sonNow() + Math.random() * min; // retour de veille : on ne rattrape pas
    while (next < sonNow() + .3) { try { fn(next); } catch (e) {} next += min + Math.random() * (max - min); }
  }, 100));
}

/* ---------- Ce qui doit jouer maintenant ---------- */
// En partie, la musique et l'ambiance jouent sur le téléphone de l'hôte ; les invités peuvent les activer chez eux.
function sonUpdate() {
  if (!SON.ctx) return;
  const guest = S.screen === 'mp' && MP && MP.role === 'guest';
  const allowed = !S.intro && (!guest || SON.guest);
  const scene = allowed && SON.amb && APP.scene ? APP.scene() : null;
  const tune = allowed && SON.music && !scene && APP.tune ? APP.tune() : null;
  if (scene !== SON.scene) sonScene(scene);
  if (tune !== SON.playing) { musicStop(); if (tune) musicStart(tune); }
  sonFab();
}
document.addEventListener('visibilitychange', () => {
  if (!SON.ctx) return;
  if (document.hidden) SON.ctx.suspend().catch(() => {});
  else { SON.ctx.resume().catch(() => {}); SON.next = sonNow() + .1; }
});
// Le navigateur n'autorise le son qu'après un premier geste
document.addEventListener('pointerdown', () => { if (sonInit()) sonUpdate(); }, { passive: true });

/* ---------- Bouton et réglages « Sons » ---------- */
const fab = document.createElement('button');
fab.className = 'son-fab'; fab.type = 'button'; fab.setAttribute('aria-label', 'Réglages des sons');
fab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="w1" d="M15.5 9a4.2 4.2 0 0 1 0 6"/><path class="w2" d="M18 6.5a8 8 0 0 1 0 11"/></svg>';
const sheet = document.createElement('div');
sheet.className = 'son-sheet'; sheet.hidden = true; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-label', 'Sons');
document.body.append(fab, sheet);
function sonFab() {
  const on = (SON.music && !!SON.playing) || (SON.amb && !!SON.scene) || SON.sfx;
  fab.classList.toggle('on', !!on);
  document.body.classList.toggle('son-hidden', !!S.intro);
}
function sonSheet() {
  const guest = S.screen === 'mp' && MP && MP.role === 'guest';
  const row = (k, label, hint) => `<div class="toggle"><span><b>${label}</b><br><span class="hint">${hint}</span></span><button data-s="${k}" aria-pressed="${!!SON[k]}" aria-label="${label}"></button></div>`;
  sheet.innerHTML = `<div class="son-head"><b>Sons</b><button class="x" data-s="close" aria-label="Fermer">✕</button></div>
    ${row('music', 'Musique', APP.tuneLabel || 'Musique d\'ambiance')}
    ${APP.ambiances ? row('amb', 'Ambiance', APP.ambLabel || 'Bruits de fond') : ''}
    ${row('sfx', 'Bruitages', APP.sfxLabel || 'Cartes, jetons, roue…')}
    ${guest ? row('guest', 'Musique sur ce téléphone aussi', "En partie, la musique joue d'habitude seulement chez l'hôte.") : ''}
    <label class="son-vol"><span>Volume</span><input type="range" id="sonVol" min="0" max="1" step=".05" value="${SON.vol}"></label>
    <p class="hint">Sons composés en direct par l'appli : rien à télécharger, libres de droits.</p>`;
}
fab.addEventListener('click', () => { sonInit(); SON.open = !SON.open; sheet.hidden = !SON.open; if (SON.open) sonSheet(); sonUpdate(); });
sheet.addEventListener('click', e => {
  const b = e.target.closest('[data-s]');
  if (!b) return;
  const k = b.dataset.s;
  if (k === 'close') { SON.open = false; sheet.hidden = true; return; }
  SON[k] = !SON[k];
  store.set({ music: 'sonMusic', sfx: 'sonSfx', amb: 'sonAmb', guest: 'sonGuest' }[k], SON[k]);
  sonInit(); sonUpdate(); sonSheet();
  if (k === 'sfx' && SON.sfx) sfx('ping');
});
sheet.addEventListener('input', e => {
  if (e.target.id !== 'sonVol') return;
  SON.vol = +e.target.value; store.set('sonVol', SON.vol);
  if (SON.out) SON.out.gain.setTargetAtTime(SON.vol, sonNow(), .05);
});
