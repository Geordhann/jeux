#!/usr/bin/env node
/* Banc d'essai des jeux en ligne (La Veillée et Le Tapis).
   Des téléphones virtuels (onglets Chromium en mode ?local, reliés sans réseau) jouent chaque jeu du début à la fin.
   On vérifie que tout s'enchaîne, on mesure les temps de réponse, la charge maximale et la reconnexion,
   puis on écrit tests/rapport.md.
   Usage : npm test            (tous les essais)
           npm test -- lg rl   (seulement certains essais) */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ONLY = process.argv.slice(2);
const results = [];

/* ---------- Serveur local et préparation des applis ---------- */
for (const a of ['veillee', 'tapis']) execFileSync(path.join(ROOT, 'tools/build-www.sh'), [a], { stdio: 'ignore' });
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

/* ---------- Outils de test ---------- */
class Fail extends Error {}
function ctxFor(browser, app) {
  const t = { errors: [], metrics: {}, pages: [] };
  t.check = (ok, msg) => { if (!ok) throw new Fail(msg); };
  t.metric = (k, v) => { t.metrics[k] = v; };
  t.phone = async (n) => {
    const ctx = t.ctx || (t.ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }));
    const p = await ctx.newPage();
    p.on('pageerror', e => t.errors.push(`téléphone ${n} : ${e.message}`));
    await p.goto(`${t.url}/build/${app}/www/index.html?local&phone=${n}`);
    await p.click('[data-a=adult-ok]', { timeout: 1500 }).catch(() => {});
    await p.click('[data-a=intro-go]', { timeout: 1500 }).catch(() => {});
    t.pages.push(p);
    return p;
  };
  // L'hôte crée la partie ; renvoie [page, code]
  t.host = async (game, narrator) => {
    const p = await t.phone(1);
    await p.click(`[data-a=mp-new][data-v=${game}]`);
    if (!narrator) { await p.fill('#jName', 'Hôte'); await p.click('#joinForm button[type=submit]'); }
    await p.waitForSelector('.room .code:not(.wait)', { timeout: 8000 });
    return [p, (await p.textContent('.room .code')).trim()];
  };
  t.join = async (n, code, name) => {
    const p = await t.phone(n);
    await p.click('[data-a=mp-joinform]');
    await p.fill('#jCode', code); await p.fill('#jName', name);
    const t0 = Date.now();
    await p.click('#joinForm button[type=submit]');
    await p.waitForFunction(() => MP && MP.status === 'open' && MP.view, null, { timeout: 8000 });
    return [p, Date.now() - t0];
  };
  // Temps pour qu'un changement chez l'hôte arrive sur tous les téléphones
  t.until = async (pages, fn, arg, ms = 8000) => { const t0 = Date.now(); await Promise.all(pages.map(p => p.waitForFunction(fn, arg, { timeout: ms }))); return Date.now() - t0; };
  t.eval = (p, fn, arg) => p.evaluate(fn, arg);
  return t;
}
async function scenario(id, title, app, fn) {
  if (ONLY.length && !ONLY.includes(id)) return;
  const browser = await chromium.launch();
  const t = ctxFor(browser, app);
  t.url = `http://127.0.0.1:${server.address().port}`;
  const t0 = Date.now();
  let ok = true, why = '';
  process.stdout.write(`• ${title}… `);
  try { await fn(t); } catch (e) { ok = false; why = e instanceof Fail ? e.message : (e.message || String(e)).split('\n')[0]; }
  if (t.errors.length) { ok = false; why = why || t.errors[0]; }
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(ok ? `✅ ${secs} s` : `❌ ${why}`);
  results.push({ id, title, ok, why, secs, metrics: t.metrics, phones: t.pages.length });
  await browser.close();
}
const avg = l => Math.round(l.reduce((a, b) => a + b, 0) / Math.max(1, l.length));

/* ---------- Les essais ---------- */
async function run() {
  await scenario('lg', 'Loup-Garou : partie complète, pouvoirs sur les téléphones, maire, votes', 'veillee', async t => {
    const [mj, code] = await t.host('lg', true);
    const names = ['Léa', 'Hugo', 'Inès', 'Tom', 'Zoé', 'Max', 'Lina', 'Noé'], ph = {}, joins = [];
    for (let i = 0; i < names.length; i++) { const [p, ms] = await t.join(i + 2, code, names[i]); ph[names[i]] = p; joins.push(ms); }
    t.metric('connexion d\'un téléphone (moyenne)', avg(joins) + ' ms');
    await t.eval(mj, () => { MP.H.cfg.roles = ['voyante', 'sorciere', 'cupidon', 'salvateur', 'chasseur']; MP.H.cfg.loups = 2; mpPush(); });
    await mj.click('[data-a=lg-spin]');
    const deal = await t.until(Object.values(ph), () => MP.view && MP.view.step === 'deal' && MP.view.me);
    t.metric('roue + distribution des cartes', deal + ' ms');
    const roles = await t.eval(mj, () => Object.fromEntries(MP.H.players.map(p => [p.name, p.role])));
    t.check(Object.values(roles).filter(r => r === 'loup').length === 2, 'il devrait y avoir 2 loups');
    const who = r => Object.keys(roles).find(n => roles[n] === r);
    await mj.click('[data-a=lg-start]');
    const order = await t.eval(mj, () => lgSteps(MP.H).map(s => s.id).join(','));
    t.check(order === 'cupidon,voyante,amoureux,salvateur,loups,sorciere', 'ordre de la nuit 1 inattendu : ' + order);
    const victim = names.find(n => roles[n] !== 'loup');
    for (const step of order.split(',')) {
      await mj.click('[data-a=lg-next]');
      if (step === 'cupidon') { const p = ph[who('cupidon')]; const ms = await t.until([p], () => !!MP.view.ask); t.metric('appel du meneur → téléphone du joueur', ms + ' ms'); await p.locator('[data-a=lg-pick]').nth(0).click(); await p.locator('[data-a=lg-pick]').nth(1).click(); await p.click('[data-a=lg-do]'); }
      if (step === 'voyante') { const p = ph[who('voyante')]; await t.until([p], () => !!MP.view.ask); await p.locator('[data-a=lg-pick]').nth(0).click(); await p.click('[data-a=lg-do]'); await t.until([p], () => !!MP.view.res); }
      if (step === 'salvateur') { const p = ph[who('salvateur')]; await t.until([p], () => !!MP.view.ask); await p.click(`[data-a=lg-pick][data-v="${victim}"]`); await p.click('[data-a=lg-do]'); }
      if (step === 'loups') { const k = await t.eval(mj, n => MP.H.players.findIndex(p => p.name === n), victim); await mj.locator('.plist li').nth(k).locator('[data-a=lg-target]').click(); }
      if (step === 'sorciere') { const p = ph[who('sorciere')]; await t.until([p], () => !!MP.view.ask); await p.click('[data-a=lg-witch]'); }
      await mj.waitForTimeout(150);
    }
    const lovers = await t.eval(mj, () => MP.H.lovers.length);
    t.check(lovers === 2, 'Cupidon aurait dû désigner 2 amoureux');
    await mj.click('[data-a=lg-dawn]');
    const saved = await t.eval(mj, n => MP.H.players.find(p => p.name === n).alive, victim);
    t.check(saved, 'la victime protégée par le salvateur aurait dû survivre');
    // Maire puis vote d'élimination, sur tous les téléphones
    await mj.click('[data-a=lg-vote-start][data-v=maire]');
    await t.until(Object.values(ph), () => MP.view.vote && MP.view.vote.choices.length);
    for (const n of names) await ph[n].click(`[data-a=lg-vote][data-v="${n === 'Léa' ? 'Hugo' : 'Léa'}"]`);
    await mj.waitForFunction(() => Object.keys(MP.H.vote.ballots).length === 8);
    await mj.click('[data-a=lg-vote-reveal]'); await mj.click('[data-a=lg-mayor]');
    const sash = await t.until(Object.values(ph), () => MP.view.players.some(p => p.mayor && p.name === 'Léa'));
    t.metric('élection du maire visible partout', sash + ' ms');
    await mj.click('[data-a=lg-vote-start][data-v=exil]');
    await t.until(Object.values(ph), () => MP.view.vote && MP.view.vote.kind === 'exil');
    const target = names.find(n => roles[n] === 'loup');
    for (const n of names) if (n !== target) await ph[n].click(`[data-a=lg-vote][data-v="${target}"]`);
    await mj.waitForFunction(() => Object.keys(MP.H.vote.ballots).length === 7);
    await mj.click('[data-a=lg-vote-reveal]');
    await mj.click('[data-a=lg-kill].btn');
    t.check(!(await t.eval(mj, n => MP.H.players.find(p => p.name === n).alive, target)), 'le loup désigné aurait dû être éliminé');
    await mj.click('[data-a=lg-night]');
    const order2 = await t.eval(mj, () => lgSteps(MP.H).map(s => s.id).join(','));
    t.check(!order2.includes('cupidon') && order2.includes('loups'), 'nuit 2 : Cupidon ne devrait plus être appelé');
    t.metric('taille d\'un message envoyé à un joueur', await t.eval(mj, () => (JSON.stringify(MPG.lg.view(MP.H.players[0].cid)).length / 1024).toFixed(1) + ' Ko'));
  });

  await scenario('lgfin', 'Loup-Garou : fin automatique, victoire ou défaite selon le camp', 'veillee', async t => {
    const [mj, code] = await t.host('lg', true);
    const names = ['Léa', 'Hugo', 'Inès', 'Tom', 'Zoé'], ps = [];
    for (let i = 0; i < names.length; i++) ps.push((await t.join(i + 2, code, names[i]))[0]);
    // Partie 1 : le village élimine le dernier loup
    const deal = async loups => {
      await t.eval(mj, n => { MP.H.cfg.roles = ['voyante']; MP.H.cfg.loups = n; mpPush(); }, loups);
      await mj.click('[data-a=lg-spin]');
      await t.until(ps, () => MP.view && MP.view.me);
      await mj.click('[data-a=lg-start]');
      await t.eval(mj, () => { MP.H.phase = 'day'; mpPush(); });
    };
    await deal(1);
    const wolf = await t.eval(mj, () => MP.H.players.find(p => p.role === 'loup').cid);
    await t.eval(mj, c => actions['lg-kill'](c), wolf);
    await t.until(ps, () => MP.view.step === 'end');
    let r = await Promise.all(ps.map(p => t.eval(p, () => [MP.view.winner, MP.view.won, MP.view.me.wolf, !!document.querySelector('.lg-end.' + (MP.view.won ? 'win' : 'lose'))])));
    t.check(r.every(([w, won, isWolf, shown]) => w === 'village' && won === !isWolf && shown), 'victoire du village mal affichée : ' + JSON.stringify(r));
    // Partie 2 : les loups deviennent aussi nombreux que les villageois
    await mj.click('[data-a=lg-again]');
    await deal(2);
    const vill = await t.eval(mj, () => MP.H.players.filter(p => p.role !== 'loup').map(p => p.cid));
    t.check(await t.eval(mj, () => MP.H.step) !== 'end', 'fin trop tôt (2 loups contre 3)');
    await t.eval(mj, c => actions['lg-kill'](c), vill[0]); // 2 loups contre 2 : le village ne peut plus gagner
    await t.until(ps, () => MP.view.step === 'end');
    r = await Promise.all(ps.map(p => t.eval(p, () => [MP.view.winner, MP.view.won, MP.view.me.wolf])));
    t.check(r.every(([w, won, isWolf]) => w === 'loups' && won === isWolf), 'victoire des loups mal attribuée : ' + JSON.stringify(r));
  });

  await scenario('lg47', 'Loup-Garou : charge maximale, 47 joueurs + le meneur', 'veillee', async t => {
    const [mj, code] = await t.host('lg', true);
    // 47 joueurs : 3 vrais téléphones et 44 téléphones « robots » légers (connexion réelle, sans écran)
    for (let i = 0; i < 3; i++) await t.join(i + 2, code, 'Vrai ' + (i + 1));
    const bots = await t.phone(99);
    const t0 = Date.now();
    await t.eval(bots, ({ code, n }) => new Promise(ok => {
      window.BOTS = [];
      for (let i = 0; i < n; i++) {
        const peer = localPeer(), b = { states: 0, last: null };
        peer.on('open', () => { const c = peer.connect(MP_PREFIX + code); c.on('open', () => c.send({ t: 'hello', cid: 'robot' + i, name: 'Robot ' + (i + 1) })); c.on('data', d => { if (d.t === 'state') { b.states++; b.last = d.v; } }); b.c = c; });
        BOTS.push(b);
      }
      const w = setInterval(() => { if (BOTS.every(b => b.states)) { clearInterval(w); ok(); } }, 50);
    }), { code, n: 44 });
    t.metric('47 téléphones connectés en', (Date.now() - t0) + ' ms');
    t.check(await t.eval(mj, () => MP.H.players.length) === 47, '47 joueurs attendus');
    // Un 48e joueur doit être refusé
    await t.eval(bots, code => { const peer = localPeer(); window.REFUS = null; peer.on('open', () => { const c = peer.connect(MP_PREFIX + code); c.on('open', () => c.send({ t: 'hello', cid: 'robot48', name: 'Robot 48' })); c.on('data', d => { if (d.t === 'refuse') REFUS = d.msg; }); }); }, code);
    await bots.waitForFunction(() => REFUS, null, { timeout: 5000 });
    t.check(await t.eval(mj, () => MP.H.players.length) === 47, 'le 48e joueur aurait dû être refusé');
    await mj.click('[data-a=lg-preset][data-v=ultime]');
    const cards = await t.eval(mj, () => { const d = lgCards(MP.H); return [d.cards.length, d.err, MP.H.cfg.roles.length]; });
    t.check(!cards[1], 'composition ultime refusée : ' + cards[1]);
    t.metric('composition « Ultime »', `${cards[0]} cartes, ${cards[2]} rôles spéciaux`);
    const t1 = Date.now();
    await mj.click('[data-a=lg-spin]');
    await bots.waitForFunction(() => BOTS.every(b => b.last && b.last.step === 'deal' && b.last.me), null, { timeout: 10000 });
    t.metric('distribution à 47 téléphones', (Date.now() - t1) + ' ms (roue comprise)');
    await mj.click('[data-a=lg-start]');
    const t2 = Date.now(); await mj.click('[data-a=lg-next]');
    await bots.waitForFunction(() => BOTS.every(b => b.last && b.last.step === 'game'), null, { timeout: 10000 });
    t.metric('un appel de nuit arrive sur 47 téléphones en', (Date.now() - t2) + ' ms');
    t.metric('ordre de la nuit 1 (version ultime)', (await t.eval(mj, () => lgSteps(MP.H).length)) + ' appels');
  });

  await scenario('gp', 'Téléphone dessiné : 4 manches et les albums', 'veillee', async t => {
    const [host, code] = await t.host('gp');
    const ps = [host];
    for (const [i, n] of ['Léa', 'Hugo', 'Inès'].entries()) ps.push((await t.join(i + 2, code, n))[0]);
    await host.click('[data-a=gp-secs][data-v="0"]'); await host.click('[data-a=gp-start]');
    for (let r = 0; r < 4; r++) {
      for (const p of ps) {
        await p.waitForSelector('#gpCompose', { timeout: 5000 });
        if (await p.$('#gpCanvas')) { const b = await (await p.$('#gpCanvas')).boundingBox(); await p.mouse.move(b.x + 40, b.y + 40); await p.mouse.down(); for (let k = 0; k < 15; k++) await p.mouse.move(b.x + 40 + k * 15, b.y + 60 + k * 9); await p.mouse.up(); }
        else await p.fill('#gpText', `Phrase ${r}`);
        await p.click('[data-a=gp-send]');
      }
    }
    await t.until(ps, () => MP && (MP.role === 'host' ? MP.H.step : MP.view.step) === 'album');
    for (let k = 0; k < 16; k++) await host.click('[data-a=gp-next]');
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'end');
    const img = await t.eval(host, () => MP.H.chains.flat().filter(e => e.k === 'img').map(e => e.v.length));
    t.check(img.length === 8 && img.every(l => l > 1000), 'les 8 dessins devraient être arrivés');
    t.metric('poids moyen d\'un dessin', (avg(img) / 1024).toFixed(0) + ' Ko');
  });

  await scenario('tp', 'Tu préfères : votes secrets et gage de la minorité', 'veillee', async t => {
    const [host, code] = await t.host('tp');
    const ps = [host];
    for (const [i, n] of ['Léa', 'Hugo', 'Inès'].entries()) ps.push((await t.join(i + 2, code, n))[0]);
    await host.click('[data-a=tp-start]');
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'vote');
    for (const [i, p] of ps.entries()) await p.click(`[data-a=tp-vote][data-v="${i === 0 ? 1 : 0}"]`);
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'reveal');
    t.check(await t.eval(host, () => !!MP.H.gage && MP.H.players[0].gages === 1), 'la minorité (1 contre 3) aurait dû prendre un gage');
  });

  await scenario('qp', 'Qui pourrait : votes secrets, les couples ne votent pas l\'un pour l\'autre', 'veillee', async t => {
    const [host, code] = await t.host('qp');
    const names = ['Léa', 'Hugo', 'Inès', 'Tom'], ps = [host];
    for (let i = 0; i < names.length; i++) ps.push((await t.join(i + 2, code, names[i]))[0]);
    // L'hôte déclare le couple Léa ♥ Hugo en touchant les deux prénoms
    await host.click('[data-a=vg-cp][data-v="Léa"]'); await host.click('[data-a=vg-cp][data-v="Hugo"]');
    t.check(await host.$('.pairs li') !== null, 'couple non affiché');
    await host.click('[data-a=qp-level][data-v=wtf]');
    await host.click('[data-a=qp-start]');
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'vote');
    t.check(await ps[1].$('[data-a=qp-vote][data-v="Hugo"]:disabled') !== null, 'Léa peut voter pour son couple');
    // Même en forçant, l'hôte refuse le vote pour le partenaire
    await t.eval(ps[1], () => mpSend({ t: 'qp-vote', to: 'Hugo' }));
    await ps[1].waitForTimeout(300);
    t.check(await t.eval(host, () => !Object.keys(MP.H.votes).length), 'vote pour le couple accepté');
    for (const p of ps) await p.locator('[data-a=qp-vote]:not([disabled])').first().click();
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'reveal');
    const r = await t.eval(host, () => ({ rows: MP.H.rows, couple: Object.entries(MP.H.votes).some(([c, to]) => { const n = mpP(c).name; return (n === 'Léa' && to === 'Hugo') || (n === 'Hugo' && to === 'Léa'); }) }));
    t.check(r.rows.reduce((s, x) => s + x.votes, 0) === 5 && !r.couple, 'votes incohérents : ' + JSON.stringify(r));
    t.check(await t.eval(host, () => QP_CARDS.wtf.length) >= 50, 'pas assez de questions WTF');
  });

  await scenario('av', 'Action ou Vérité : 6 tours, réactions et jokers', 'veillee', async t => {
    const [host, code] = await t.host('av');
    const ps = { 'Hôte': host };
    for (const [i, n] of ['Léa', 'Hugo', 'Inès'].entries()) ps[n] = (await t.join(i + 2, code, n))[0];
    await host.click('[data-a=av-start]');
    for (let k = 0; k < 6; k++) {
      const cur = await t.eval(host, () => avCur(MP.H).name);
      const p = ps[cur];
      await t.until([p], () => (MP.role === 'host' ? MPG.av.view(MP_CID) : MP.view).myTurn);
      await p.click(`[data-a=av-pick][data-v=${['action', 'verite', 'random'][k % 3]}]`);
      await host.waitForFunction(() => MP.H.step === 'card');
      await ps['Léa'].click('[data-a=av-react][data-v="😂"]');
      await p.click(k % 2 ? '[data-a=av-joker]' : '[data-a=av-done]');
      await host.waitForFunction(() => MP.H.step === 'after');
      await host.click('[data-a=av-next]');
    }
    const s = await t.eval(host, () => MP.H.players.reduce((a, p) => a + (p.done || 0) + (p.jokers || 0), 0));
    t.check(s === 6, '6 tours attendus, ' + s + ' comptés');
  });

  await scenario('pk', 'Poker : 30 mains au hasard, aucun jeton perdu ni créé', 'tapis', async t => {
    const [host, code] = await t.host('pk');
    const ps = [host];
    for (const [i, n] of ['Léa', 'Hugo', 'Inès'].entries()) ps.push((await t.join(i + 2, code, n))[0]);
    t.check(await t.eval(host, () => [pkName(pkBest('As Ks Qs Js Ts 2d 3c'.split(' '))), Math.sign(pkCmp(pkBest('Ah 2d 3c 4s 5h'.split(' ')), pkBest('2h 3d 4c 5s 6h'.split(' '))))].join()) === 'Quinte flush royale,-1', 'classement des mains incorrect');
    await host.click('[data-a=pk-start]');
    let hands = 0, guard = 0;
    while (hands < 30 && guard++ < 3000) {
      const st = await t.eval(host, () => { const H = MP.H; const inPot = H.hand && H.step === 'hand' ? H.hand.seats.reduce((s, c) => s + (H.hand.total[c] || 0), 0) : 0; return { step: H.step, sum: H.players.reduce((s, p) => s + p.chips, 0) + inPot, re: H.players.reduce((s, p) => s + (p.re || 0), 0) }; });
      t.check(st.sum === 4000 + st.re * 1000, `jetons incohérents : ${st.sum}`);
      if (st.step === 'show') { hands++; for (const p of ps) { const r = await p.$('[data-a=pk-rebuy]'); if (r) await r.click(); } await host.click('[data-a=pk-next]'); continue; }
      for (const p of ps) {
        if (!(await p.$('[data-a=pk-act]'))) continue;
        const r = Math.random(), sel = r < .12 ? 'fold' : r < .8 ? null : 'raise';
        const b = sel ? await p.$(`[data-a=pk-act][data-v=${sel}]`) : (await p.$('[data-a=pk-act][data-v=call]')) || (await p.$('[data-a=pk-act][data-v=check]'));
        await (b || (await p.$('[data-a=pk-act]'))).click(); break;
      }
      await host.waitForTimeout(40);
    }
    t.check(hands === 30, `seulement ${hands} mains jouées`);
    t.metric('mains jouées', hands);
  });

  await scenario('bj', 'Blackjack : 8 mains, paiements vérifiés', 'tapis', async t => {
    const [host, code] = await t.host('bj');
    const ps = [host];
    for (const [i, n] of ['Léa', 'Hugo'].entries()) ps.push((await t.join(i + 2, code, n))[0]);
    await host.click('[data-a=bj-open]');
    for (let h = 0; h < 8; h++) {
      const before = await t.eval(host, () => MP.H.players.map(p => p.chips));
      for (const p of ps) { const r = await p.$('[data-a=bj-rebuy]'); if (r) await r.click(); await p.click('[data-a=bj-clear]'); await p.click('[data-a=bj-add][data-v="25"]'); await p.click('[data-a=bj-bet]'); }
      for (let k = 0; k < 60; k++) {
        if (await t.eval(host, () => MP.H.step) === 'result') break;
        let did = false;
        for (const p of ps) { if (await p.$('[data-a=bj-act][data-v=hit]')) { const tot = await t.eval(p, () => (MP.role === 'host' ? MPG.bj.view(MP_CID) : MP.view).players.find(x => x.me).t); await p.click(tot < 15 ? '[data-a=bj-act][data-v=hit]' : '[data-a=bj-act][data-v=stand]'); did = true; break; } }
        if (!did) await host.waitForTimeout(300);
      }
      const r = await t.eval(host, () => MP.H.players.map(p => [p.res, p.gain, p.chips]));
      r.forEach(([res, gain, chips], i) => {
        const exp = { win: 25, bj: 37, push: 0, lose: -25 }[res];
        t.check(gain === exp && chips - before[i] === gain, `paiement faux (${res}, ${gain})`);
      });
      await host.click('[data-a=bj-next]');
    }
    t.metric('mains jouées', 8);
  });

  await scenario('rl', 'Roulette : 20 joueurs, 3 tours, gains vérifiés', 'tapis', async t => {
    const [host, code] = await t.host('rl');
    const ps = [host];
    for (let i = 2; i <= 20; i++) ps.push((await t.join(i, code, 'Joueur ' + i))[0]);
    await host.click('[data-a=rl-open]');
    for (let r = 0; r < 3; r++) {
      const before = await t.eval(host, () => MP.H.players.reduce((s, p) => s + p.chips, 0));
      for (const [i, p] of ps.entries()) { await p.click(`[data-a=rl-chip][data-v="${[5, 10, 25, 100][i % 4]}"]`); await p.click(`[data-a=rl-put][data-v=${['red', 'n17', 'd2', 'odd', 'n0', 'c3'][(i + r) % 6]}]`); await p.click('[data-a=rl-bet]'); }
      const spin = await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'spin');
      if (!r) t.metric('lancer de la bille visible sur 20 téléphones', spin + ' ms');
      await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'result', null, 9000);
      const res = await t.eval(host, () => { let exp = 0; MP.H.players.forEach(p => { exp += Object.entries(p.bets).reduce((s, [k, a]) => s + a * rlPays(k, MP.H.num), 0) - rlSum(p.bets); }); return [MP.H.players.reduce((s, p) => s + p.chips, 0), exp, MP.H.players.reduce((s, p) => s + p.gain, 0)]; });
      t.check(res[0] - before === res[1] && res[1] === res[2], 'gains de la roulette incohérents');
      await host.click('[data-a=rl-next]');
    }
  });

  await scenario('sl', 'Machine à sous : tournoi à 6, jackpot commun, gains vérifiés', 'tapis', async t => {
    // Les gains de la machine sont justes et pas trop généreux (simulation d'un million de tirages)
    const [host, code] = await t.host('sl');
    const rtp = await t.eval(host, () => { let bet = 0, win = 0; for (let i = 0; i < 1e6; i++) { const r = slWin([slPick(), slPick(), slPick()], 10); bet += 10; win += r.win; } return win / bet; });
    t.metric('retour aux joueurs (hors jackpot)', Math.round(rtp * 100) + ' %');
    t.check(rtp > .7 && rtp < 1, 'machine trop ou pas assez généreuse : ' + rtp);
    const ps = [host];
    for (let i = 2; i <= 6; i++) ps.push((await t.join(i, code, 'Joueur ' + i))[0]);
    await host.click('[data-a=sl-mode][data-v=tournoi]'); await host.click('[data-a=sl-spins][data-v="10"]');
    await host.click('[data-a=sl-open]');
    await t.until(ps, () => !!document.getElementById('slGo'));
    // Tirages forcés : un jackpot pour le joueur 2, puis des tirages au hasard
    await t.eval(host, () => { const pick = slPick; let n = 0; window.slPick = () => n++ < 3 ? 'sept' : pick(); });
    const jack0 = await t.eval(host, () => MP.H.jack);
    await ps[1].click('[data-a=sl-bet][data-v="10"]'); await ps[1].click('#slGo');
    await t.until([host], () => MP.H.n === 1);
    const [won, chips] = await t.eval(host, () => [MP.H.players[1].last.win, MP.H.players[1].chips]);
    t.check(won === 10 * 200 + jack0 + 1 && chips === 1000 - 10 + won, `jackpot mal payé (${won}, ${chips})`);
    const seen = await t.until(ps.filter((_, i) => i !== 1), () => !!document.querySelector('.sl-news.jackpot'), null, 6000);
    t.metric('jackpot annoncé sur les autres téléphones', seen + ' ms');
    let spins = 1;
    for (let round = 0; round < 10; round++) {
      await Promise.all(ps.map(async p => { const ok = await p.$('#slGo:not([disabled])'); if (ok && await p.click('#slGo', { timeout: 2000 }).then(() => true, () => false)) spins++; }));
      await ps[0].waitForTimeout(2300);
    }
    await t.until(ps, () => (MP.role === 'host' ? MP.H.step : MP.view.step) === 'end', null, 8000);
    const st = await t.eval(host, () => ({ n: MP.H.n, left: MP.H.players.map(p => p.left), neg: MP.H.players.some(p => p.chips < 0) }));
    t.check(st.n === 60 && st.left.every(x => x === 0) && !st.neg, 'tournoi incomplet : ' + JSON.stringify(st));
    t.check(await ps[3].$('.podium') !== null, 'pas de podium chez les invités');
    t.metric('tirages joués', st.n);
  });

  await scenario('reco', 'Reconnexion : un joueur redémarre son téléphone et retrouve sa carte', 'veillee', async t => {
    const [mj, code] = await t.host('lg', true);
    const ps = [];
    for (let i = 0; i < 4; i++) ps.push((await t.join(i + 2, code, ['Léa', 'Hugo', 'Inès', 'Tom'][i]))[0]);
    await t.eval(mj, () => { MP.H.cfg.roles = ['voyante']; MP.H.cfg.loups = 1; mpPush(); });
    await mj.click('[data-a=lg-spin]');
    await t.until(ps, () => MP.view && MP.view.me);
    const before = await t.eval(ps[2], () => MP.view.me.role);
    // Le téléphone redémarre : même identité, il retape le code
    await ps[2].reload();
    await ps[2].click('[data-a=intro-go]', { timeout: 2000 }).catch(() => {});
    await ps[2].click('[data-a=mp-joinform]'); await ps[2].fill('#jCode', code); await ps[2].click('#joinForm button[type=submit]');
    const t0 = Date.now();
    await ps[2].waitForFunction(() => MP && MP.view && MP.view.me, null, { timeout: 8000 });
    t.metric('retour dans la partie', (Date.now() - t0) + ' ms');
    t.check(await t.eval(ps[2], () => MP.view.me.role) === before, 'le joueur aurait dû retrouver la même carte');
    t.check(await t.eval(mj, () => MP.H.players.length) === 4, 'le joueur ne doit pas être compté deux fois');
  });

  await scenario('son', 'Sons : chaque bruitage, musique et ambiance produit du son, sans saturer', 'veillee', async t => {
    for (const app of ['veillee', 'tapis']) {
      const p = await t.phone(50 + (app === 'tapis'));
      if (app === 'tapis') await p.goto(`${t.url}/build/tapis/www/index.html?local&phone=51`);
      const out = await t.eval(p, async () => {
        const measure = async (secs, fn) => {
          const ctx = new OfflineAudioContext(1, 22050 * secs, 22050), keep = SON.ctx;
          SON.ctx = ctx; SON.bus = {}; SON.out = ctx.createGain(); SON.out.gain.value = .7; SON.out.connect(ctx.destination);
          ['music', 'sfx', 'amb'].forEach(k => { const g = ctx.createGain(); g.connect(SON.out); SON.bus[k] = g; });
          SON.fx = ctx.createDelay(1); SON.fx.connect(SON.out);
          const n = ctx.createBuffer(1, 44100, 22050), d = n.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; SON.noise = SON.brown = n;
          fn(ctx);
          const ch = (await ctx.startRendering()).getChannelData(0); SON.ctx = keep;
          let peak = 0, sum = 0; for (const x of ch) { peak = Math.max(peak, Math.abs(x)); sum += x * x; }
          return [Math.sqrt(sum / ch.length), peak];
        };
        const bad = [];
        for (const k of Object.keys(SFX)) { const [rms, peak] = await measure(5, () => SFX[k](.05, k === 'roulette' ? 4000 : k === 'wheel' ? 3000 : undefined)); if (!(rms > .0005) || peak > 1) bad.push(`${k} (${rms.toFixed(4)}/${peak.toFixed(2)})`); }
        for (const [k, tune] of Object.entries(APP.tunes)) { const [rms, peak] = await measure(6, () => { const sd = 60 / tune.bpm / tune.div; for (let s = 0, x = .05; x < 5.5; s++, x += sd) tune.play(s, x, sd); }); if (!(rms > .002) || peak > 1) bad.push(`musique ${k}`); }
        return [Object.keys(SFX).length + Object.keys(APP.tunes).length, bad];
      });
      t.check(!out[1].length, `${app} : sons muets ou saturés : ${out[1].join(', ')}`);
      t.metric(`${app} : sons vérifiés`, out[0]);
    }
  });
}

/* ---------- Rapport ---------- */
server.listen(0, '127.0.0.1', async () => {
  const t0 = Date.now();
  console.log('Banc d\'essai des jeux en ligne\n');
  try { await run(); } finally { server.close(); }
  const ok = results.filter(r => r.ok).length;
  const lines = [`# Rapport du banc d'essai`, '', `${new Date().toLocaleString('fr-FR')} · ${ok} / ${results.length} essais réussis · ${((Date.now() - t0) / 1000).toFixed(0)} s`, '',
    '| Essai | Résultat | Téléphones | Durée |', '| --- | --- | --- | --- |',
    ...results.map(r => `| ${r.title} | ${r.ok ? '✅ réussi' : '❌ ' + r.why.replace(/\|/g, '/')} | ${r.phones} | ${r.secs} s |`), '', '## Mesures', ''];
  results.filter(r => Object.keys(r.metrics).length).forEach(r => { lines.push(`**${r.title}**`, ''); Object.entries(r.metrics).forEach(([k, v]) => lines.push(`- ${k} : ${v}`)); lines.push(''); });
  lines.push('Les téléphones virtuels sont des onglets Chromium reliés entre eux sans réseau (mode `?local`) ; sur de vrais téléphones, ajoute le temps du réseau (souvent 20 à 150 ms).');
  fs.writeFileSync(path.join(__dirname, 'rapport.md'), lines.join('\n') + '\n');
  console.log(`\n${ok} / ${results.length} essais réussis. Rapport : tests/rapport.md`);
  process.exit(ok === results.length ? 0 : 1);
});
