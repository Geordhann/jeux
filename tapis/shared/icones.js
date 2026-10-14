/* Icônes dessinées pour les applis (SVG), à la place des émojis génériques.
   ic('loup') renvoie le dessin, à mettre dans du HTML. Dans un texte, écrire [[loup]] : render() le remplace par le dessin. */
const ICONS = {};
// Palette d'enluminure : encre, parchemin, vermillon, outremer, or, vert forêt
const INK = '#2b1a10', PARCH = '#efe1bd', GOLDI = '#c8932e';
// Médaillon de fond des cartes du Loup-Garou, teinté selon le camp
const MED_TINT = { village: '#cfe0b4', loups: '#e9b7a6', solo: '#d6c3e6', ambigu: '#ead9a0', neutre: PARCH };
const MED = camp => `<circle cx="32" cy="32" r="30" fill="${MED_TINT[camp] || PARCH}" stroke="${INK}" stroke-width="2.5"/><circle cx="32" cy="32" r="26.6" fill="none" stroke="${GOLDI}" stroke-width="1.4" stroke-dasharray="2.2 1.6"/>`;
function ic(name, cls = '') {
  const d = ICONS[name];
  return d ? `<svg class="icn ${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${d}</svg>` : '';
}
// Les jetons [[nom]] écrits dans les textes deviennent des icônes au moment de l'affichage
const icTok = h => String(h).replace(/\[\[([\w-]+)\]\]/g, (m, k) => ICONS[k] ? ic(k) : m);

/* --- Référence de style : le loup-garou --- */
ICONS.loup = MED('loups') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M15 14l9 9h16l9-9-1 17 3 8-9 9-8 5-8-5-9-9 3-8z" fill="#7d7a73"/>
  <path d="M18 19l4 5M46 19l-4 5" fill="none"/>
  <path d="M24 41l8 5 8-5-3 7-5 3-5-3z" fill="#d9d2c0"/>
  <path d="M29 40h6l-3 4z" fill="${INK}"/>
  <path d="M21 31l6 2-5 2zM43 31l-6 2 5 2z" fill="#f2c443"/>
</g><path d="M28 50l1.5 2 1-2M34 50l1 2 1.5-2" stroke="#fff" stroke-width="1.2" fill="none"/>`;
