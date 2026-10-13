#!/usr/bin/env node
/* Lance les téléphones virtuels sur ton ordinateur : prépare les applis puis ouvre un petit serveur local.
   Usage : npm run telephones   puis ouvre l'adresse affichée dans ton navigateur. */
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), PORT = +process.env.PORT || 8080;
for (const a of ['veillee', 'tapis']) execFileSync(path.join(ROOT, 'tools/build-www.sh'), [a], { stdio: 'inherit' });
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png' };
http.createServer((req, res) => {
  let file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (req.url === '/' ) { res.writeHead(302, { location: '/tests/telephones.html' }); return res.end(); }
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('Introuvable'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`\n📱 Téléphones virtuels prêts : http://localhost:${PORT}/tests/telephones.html\n(Ctrl+C pour arrêter)`));
