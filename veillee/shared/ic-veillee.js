Object.assign(ICONS, {
  // Paysan au chapeau de paille, fourche à l'épaule
  villageois: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M46 54L49 24" fill="none" stroke-width="4.5"/><path d="M46 54L49 24" fill="none" stroke="#a0703f" stroke-width="2"/>
  <path d="M43.8 16.5l-.6 7.5h11.6l.6-7.5M49.6 16.5l-.5 7.5" fill="none" stroke-width="2.2"/>
  <path d="M15 55Q17 42 32 41Q47 42 49 55Z" fill="#3f6b3a"/>
  <path d="M27 41.5l5 6 5-6" fill="#6b4426"/>
  <circle cx="32" cy="32" r="8.5" fill="#e8b98f"/>
  <path d="M23.5 26Q24 13 32 13Q40 13 40.5 26Z" fill="#d4a23a"/>
  <ellipse cx="32" cy="26" rx="16" ry="3.6" fill="#d4a23a"/>
  <path d="M24.5 22.5h15" fill="none" stroke="#b23a2b" stroke-width="2"/>
  <circle cx="29" cy="32" r="1" fill="${INK}"/><circle cx="35" cy="32" r="1" fill="${INK}"/>
  <path d="M29 36.2q3 2 6 0" fill="none"/>
</g>`,

  // Villageois innocenté : visage au nimbe d'or
  villvill: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="32" cy="15.5" rx="11" ry="3.6" fill="none" stroke-width="5"/>
  <ellipse cx="32" cy="15.5" rx="11" ry="3.6" fill="none" stroke="#f2c443" stroke-width="2.6"/>
  <path d="M15 55Q17 43 32 42Q47 43 49 55Z" fill="#2f4f8f"/>
  <path d="M27 42.5l5 5 5-5" fill="#f6f0e0"/>
  <circle cx="32" cy="31" r="10" fill="#e8b98f"/>
  <path d="M22 30Q21 20 32 20Q43 20 42 30Q38 24 32 25Q26 24 22 30Z" fill="#6b4426"/>
  <path d="M27.5 31q1.5-1.5 3 0M33.5 31q1.5-1.5 3 0" fill="none"/>
  <path d="M28 35.5q4 3 8 0" fill="none"/>
</g><path d="M14 22l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1zM50 22l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1z" fill="#f2c443" stroke="${INK}" stroke-width="1"/>`,

  // Voyante : boule de cristal sur pied, un œil au cœur
  voyante: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 53l3-8h18l3 8z" fill="#c8932e"/>
  <path d="M24 45q8-5 16 0" fill="#d4a23a"/>
  <circle cx="32" cy="28" r="15" fill="#8fb0dc"/>
  <path d="M20 28q12-11 24 0q-12 11-24 0z" fill="#f6f0e0"/>
  <circle cx="32" cy="28" r="4.6" fill="#2f4f8f"/>
  <circle cx="32" cy="28" r="1.8" fill="${INK}" stroke="none"/>
</g><path d="M23 19q3-4 7-5" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<path d="M12 16l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9zM51 13l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9zM52 38l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" fill="#f2c443" stroke="${INK}" stroke-width=".9"/>`,

  // Sorcière : chapeau pointu et deux fioles (vie verte, mort rouge)
  sorciere: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M22 27Q26 19 28 11Q34 7 42 13Q36 14 35 18Q38 23 42 27Z" fill="#4a3a6b"/>
  <ellipse cx="32" cy="26.5" rx="17" ry="3.8" fill="#4a3a6b"/>
  <path d="M24.5 22.5Q32 25 40 22.5" fill="none" stroke="#d4a23a" stroke-width="2.6"/>
  <path d="M21 34h5v5q6 3 6 9a8.5 8.5 0 0 1-17 0q0-6 6-9z" fill="#5fa04e"/>
  <path d="M38 34h5v5q6 3 6 9a8.5 8.5 0 0 1-17 0q0-6 6-9z" fill="#b23a2b"/>
  <rect x="20" y="31.5" width="7" height="3.5" rx="1" fill="#a0703f"/>
  <rect x="37" y="31.5" width="7" height="3.5" rx="1" fill="#a0703f"/>
  <path d="M37.5 46l5 5M42.5 46l-5 5" fill="none" stroke="#f6f0e0" stroke-width="1.8"/>
  <path d="M23.5 45v6M20.5 48h6" fill="none" stroke="#f6f0e0" stroke-width="1.8"/>
</g>`,

  // Chasseur : arc bandé et flèche
  chasseur: MED('village') + `<g transform="rotate(-38 32 32)" stroke="${INK}" stroke-linejoin="round" stroke-linecap="round">
  <path d="M36 10L22 32L36 54" fill="none" stroke-width="1.6"/>
  <path d="M36 10Q60 32 36 54" fill="none" stroke-width="6.5"/>
  <path d="M36 10Q60 32 36 54" fill="none" stroke="#a0703f" stroke-width="3.5"/>
  <path d="M42.5 27.5h4v9h-4z" fill="#6b4426" stroke-width="1.6"/>
  <path d="M19 32H51" fill="none" stroke-width="4.6"/><path d="M19 32H51" fill="none" stroke="#d4a23a" stroke-width="2"/>
  <path d="M49 26.5L58 32L49 37.5Z" fill="#7d7a73" stroke-width="2"/>
  <path d="M13 26l6 6-6 6h6l5-6-5-6z" fill="#b23a2b" stroke-width="1.8"/>
</g>`,

  // Cupidon : cœur percé d'une flèche
  cupidon: MED('village') + `<g stroke="${INK}" stroke-linejoin="round" stroke-linecap="round"><g transform="rotate(-40 32 32)">
  <path d="M10 33H52" fill="none" stroke-width="4.4"/><path d="M10 33H52" fill="none" stroke="#d4a23a" stroke-width="1.9"/>
  <path d="M50 28L59 33L50 38Z" fill="#d4a23a" stroke-width="2"/>
</g>
  <path d="M32 50C13 37 14 18 25 18C29 18 31 21 32 24C33 21 35 18 39 18C50 18 51 37 32 50Z" fill="#b23a2b" stroke-width="2"/>
  <path d="M23 25q2-3 5-2.5" fill="none" stroke="#f6f0e0" stroke-width="2"/>
<g transform="rotate(-40 32 32)">
  <path d="M8 33H22" fill="none" stroke-width="4.4"/><path d="M8.5 33H23" fill="none" stroke="#d4a23a" stroke-width="1.9"/>
  <path d="M7 33l-3-5h7l4 5zM7 33l-3 5h7l4-5z" fill="#f6f0e0" stroke-width="1.7"/>
</g></g>`,

  // Petite fille : tresses, une main sur le visage, un œil qui épie
  petitefille: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M19 32q-3 8-1 16q2 4 4 0q1-8 1-14zM45 32q3 8 1 16q-2 4-4 0q-1-8-1-14z" fill="#d4a23a"/>
  <path d="M17 44.5l6-.5M41 44l6 .5" fill="none" stroke="#b23a2b" stroke-width="2.6"/>
  <circle cx="32" cy="33" r="12" fill="#e8b98f"/>
  <path d="M20 32Q19 18 32 18Q45 18 44 32Q40 24 32 25Q24 24 20 32Z" fill="#d4a23a"/>
  <path d="M24 33q3.5-4 7 0q-3.5 3-7 0z" fill="#f6f0e0"/>
  <circle cx="26.4" cy="32.6" r="1.7" fill="${INK}" stroke="none"/>
  <path d="M27 40q3 1.5 5.5 0" fill="none" stroke-width="1.7"/>
  <path d="M33 51V30.5a2 2 0 0 1 4 0V28a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0V36a2 2 0 0 1 4 0V44q0 7-7 8z" fill="#e8b98f"/>
  <path d="M37 30.5V39M41 30V39M45 32V40" fill="none" stroke-width="1.5"/>
</g>`,

  // Salvateur : écu d'azur à la croix d'or
  salvateur: MED('village') + `<g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M17 13H47V30Q47 46 32 55Q17 46 17 30Z" fill="#2f4f8f"/>
  <path d="M29 15.5h6V26h9.5v6H35V49.5h-6V32h-9.5V26H29z" fill="#d4a23a" stroke-width="1.8"/>
  <path d="M20 16H44V30Q44 44 32 51.5Q20 44 20 30Z" fill="none" stroke="#f6f0e0" stroke-width="1" stroke-dasharray="1.6 1.6" opacity=".7"/>
</g>`,

  // Ancien : vieillard barbu au bâton
  ancien: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M47 55V22" fill="none" stroke-width="4.8"/><path d="M47 55V22" fill="none" stroke="#a0703f" stroke-width="2.3"/>
  <path d="M47 23q0-9-6-8q-4 1-2 5" fill="none" stroke-width="4.8"/><path d="M47 23q0-9-6-8q-4 1-2 5" fill="none" stroke="#a0703f" stroke-width="2.3"/>
  <path d="M13 55Q15 40 22 37L29 30H35L40 37Q45 40 47 55Z" fill="#6b4426"/>
  <path d="M19 37Q18 16 30 15Q40 15 41 35L36 30H24Z" fill="#7d7a73"/>
  <circle cx="30" cy="29" r="8" fill="#e8b98f"/>
  <path d="M22.5 29Q21 46 30 52Q39 46 37.5 29Q35 34 30 34Q25 34 22.5 29Z" fill="#f6f0e0"/>
  <path d="M30 35.5Q26 34 24 37.5Q27 37.5 30 36.5Q33 37.5 36 37.5Q34 34 30 35.5Z" fill="#f6f0e0" stroke-width="1.5"/>
  <path d="M30 31l-1 3h2z" fill="#d79a72" stroke-width="1.2"/>
  <path d="M24.5 27l4-1.6M35.5 27l-4-1.6" fill="none" stroke-width="1.8"/>
  <circle cx="27" cy="28.5" r=".9" fill="${INK}"/><circle cx="33" cy="28.5" r=".9" fill="${INK}"/>
</g>`,

  // Idiot : bonnet de fou à grelots
  idiot: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M17 36Q14 26 12 19Q22 21 28 33Z" fill="#b23a2b"/>
  <path d="M47 36Q50 26 52 19Q42 21 36 33Z" fill="#2f4f8f"/>
  <path d="M23 35Q25 19 32 10Q39 19 41 35Z" fill="#d4a23a"/>
  <circle cx="32" cy="44.5" r="9" fill="#e8b98f"/>
  <path d="M16 35Q32 31 48 35L48 39.5Q32 35.5 16 39.5Z" fill="#3f6b3a"/>
  <path d="M27.5 46q4.5 4 9 0" fill="none"/>
  <circle cx="28.5" cy="43" r="1" fill="${INK}"/><circle cx="35.5" cy="43" r="1" fill="${INK}"/>
  <circle cx="12" cy="19" r="3.2" fill="#f2c443"/><circle cx="52" cy="19" r="3.2" fill="#f2c443"/><circle cx="32" cy="9.5" r="3.2" fill="#f2c443"/>
</g>`,

  // Bouc émissaire : tête de bouc cornue, barbiche
  bouc: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M27 22Q20 8 11 14Q9 17 12 17Q18 13 23 26Z" fill="#c9b48a"/>
  <path d="M37 22Q44 8 53 14Q55 17 52 17Q46 13 41 26Z" fill="#c9b48a"/>
  <path d="M25 27Q16 25 12 30Q17 33 25 31Z" fill="#d9cfbd"/>
  <path d="M39 27Q48 25 52 30Q47 33 39 31Z" fill="#d9cfbd"/>
  <path d="M33 47L32 57L29 49Z" fill="#d9cfbd"/>
  <path d="M24 23Q32 18 40 23L39 39Q37 49 32 49Q27 49 25 39Z" fill="#efe8d6"/>
  <path d="M26.5 31.5q2.5-2.5 5 0q-2.5 2-5 0zM32.5 31.5q2.5-2.5 5 0q-2.5 2-5 0z" fill="#f2c443" stroke-width="1.4"/>
  <path d="M27.6 31.4h2.8M33.6 31.4h2.8" stroke-width="1.6"/>
  <path d="M29 44q3 2 6 0" fill="none" stroke-width="1.6"/>
  <path d="M30 41.5l.6.4M34 41.5l-.6.4" stroke-width="1.8"/>
</g>`,
});
Object.assign(ICONS, {
  /* Les deux soeurs : deux dames en hennin */
  soeurs: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M9 53q1-12 13-13 10 1 12 13z" fill="#b23a2b"/>
  <path d="M31 53q1-12 11-13 12 1 13 13z" fill="#2f4f8f"/>
  <path d="M17 11q-5 14-3 26l3 1q-2-14 0-27z" fill="#f6f0e0" stroke-width="1.4"/>
  <path d="M47 11q5 14 3 26l-3 1q2-14 0-27z" fill="#f6f0e0" stroke-width="1.4"/>
  <path d="M15 28l13-1-11-16z" fill="#d4a23a"/>
  <path d="M49 28l-13-1 11-16z" fill="#3f6b3a"/>
  <ellipse cx="22" cy="32" rx="6.5" ry="8" fill="#e8b98f"/>
  <ellipse cx="42" cy="32" rx="6.5" ry="8" fill="#e8b98f"/>
  <path d="M15 28q7-6 14 0M35 28q7-6 14 0" fill="none" stroke="#f6f0e0" stroke-width="2.4"/>
  <path d="M15 28q7-6 14 0M35 28q7-6 14 0" fill="none" stroke-width="1"/>
</g><g fill="${INK}"><circle cx="19.5" cy="32" r="1.2"/><circle cx="24.5" cy="32" r="1.2"/><circle cx="39.5" cy="32" r="1.2"/><circle cx="44.5" cy="32" r="1.2"/></g>
<path d="M20 36.5q2 1.5 4 0M40 36.5q2 1.5 4 0" stroke="${INK}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,

  /* Les trois frères : trois capuches de moine */
  freres: MED('village') + `<g transform="translate(32 34) scale(.86) translate(-32 -34)" stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M5 53q1-26 11-30 10 4 11 30z" fill="#6b4426"/>
  <path d="M37 53q1-26 11-30 10 4 11 30z" fill="#6b4426"/>
  <ellipse cx="16" cy="38" rx="5" ry="6.5" fill="#2b1a10"/>
  <ellipse cx="48" cy="38" rx="5" ry="6.5" fill="#2b1a10"/>
  <ellipse cx="16" cy="39.5" rx="3.6" ry="4.6" fill="#e8b98f"/>
  <ellipse cx="48" cy="39.5" rx="3.6" ry="4.6" fill="#e8b98f"/>
  <path d="M19 55q1-32 13-37 12 5 13 37z" fill="#8a5a33"/>
  <ellipse cx="32" cy="35" rx="6.5" ry="8.5" fill="#2b1a10"/>
  <ellipse cx="32" cy="37" rx="4.8" ry="6" fill="#e8b98f"/>
  <path d="M32 47v8M28 50l4 2 4-2" fill="none" stroke="#d4a23a" stroke-width="1.6"/>
</g><g fill="${INK}"><circle cx="30" cy="36.5" r="1"/><circle cx="34" cy="36.5" r="1"/><circle cx="14.7" cy="39" r=".8"/><circle cx="17.3" cy="39" r=".8"/><circle cx="46.7" cy="39" r=".8"/><circle cx="49.3" cy="39" r=".8"/></g>`,

  /* Le renard */
  renard: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M12 24L17 8l11 13h8L47 8l5 16-6 13-14 17-14-17z" fill="#d0662a"/>
  <path d="M17.5 12.5l6 7.5-5 3zM46.5 12.5l-6 7.5 5 3z" fill="${INK}"/>
  <path d="M12.5 26q8 10 19.5 10 11.5 0 19.5-10L46 37 32 54 18 37z" fill="#f6f0e0"/>
  <path d="M28.5 50h7L32 54.5z" fill="${INK}"/>
  <path d="M21 28l7 2-6 2zM43 28l-7 2 6 2z" fill="#f2c443"/>
</g><path d="M24.5 30v1.2M39.5 30v1.2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`,

  /* Le montreur d'ours : tête d'ours, anneau et chaîne */
  montreur: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="18" cy="16" r="6.5" fill="#6b4426"/><circle cx="46" cy="16" r="6.5" fill="#6b4426"/>
  <circle cx="18" cy="16" r="3" fill="#c9a274" stroke="none"/><circle cx="46" cy="16" r="3" fill="#c9a274" stroke="none"/>
  <path d="M32 13c11 0 17 8 17 18s-7 17-17 17-17-7-17-17 6-18 17-18z" fill="#6b4426"/>
  <ellipse cx="32" cy="37" rx="9" ry="7" fill="#c9a274"/>
  <path d="M28 33h8l-4 4z" fill="${INK}"/>
  <path d="M32 37v3M28 41q4 2 8 0" fill="none"/>
  <path d="M23 34q9-4 18 0M23 34v4M41 34v4" fill="none" stroke="#7d7a73" stroke-width="2.6"/>
  <circle cx="24" cy="27" r="1.8" fill="${INK}"/><circle cx="40" cy="27" r="1.8" fill="${INK}"/>
</g>
<g fill="none" stroke="${INK}" stroke-width="3.8" stroke-linecap="round"><circle cx="32" cy="46" r="4"/><path d="M35 50l3 3M40 54.5l2.5 0"/></g>
<g fill="none" stroke="#d4a23a" stroke-width="2" stroke-linecap="round"><circle cx="32" cy="46" r="4"/><path d="M35 50l3 3M40 54.5l2.5 0"/></g>`,

  /* Le juge bègue : balance de justice */
  juge: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 14v34" fill="none" stroke-width="4.5"/>
  <path d="M32 14v34" fill="none" stroke="#d4a23a" stroke-width="2"/>
  <path d="M22 54q0-6 10-6t10 6z" fill="#c8932e"/>
  <path d="M12 20l40-4" fill="none" stroke-width="5"/>
  <path d="M12 20l40-4" fill="none" stroke="#d4a23a" stroke-width="2.6"/>
  <path d="M13 21l-6 15M13 21l6 15M51 17l-6 13M51 17l6 13" fill="none" stroke-width="1.4"/>
  <path d="M5 36h16q-2 7-8 7t-8-7z" fill="#d4a23a"/>
  <path d="M43 30h16q-2 7-8 7t-8-7z" fill="#d4a23a"/>
  <circle cx="32" cy="12" r="3.5" fill="#d4a23a"/>
</g>`,

  /* Le chevalier à l'épée rouillée : heaume et épée */
  chevalier: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M12 26q0-12 13-12t13 12v18q-13 7-26 0z" fill="#9b9890"/>
  <path d="M12 29h26v5H12z" fill="${INK}"/>
  <path d="M25 14v15M25 34v14" fill="none" stroke="#d4a23a" stroke-width="2.4"/>
  <g transform="rotate(24 44 32)">
    <path d="M41 13l3-5 3 5v29h-6z" fill="#d9dcde"/>
    <path d="M44 12v28" stroke="#9aa0a4" stroke-width="1"/>
    <path d="M35 42h18v4H35z" fill="#d4a23a"/>
    <path d="M42 46h4v7h-4z" fill="#6b4426"/>
    <circle cx="44" cy="55.5" r="2.8" fill="#d4a23a"/>
    <g fill="#b5602a" stroke="none"><circle cx="43" cy="17" r="1.5"/><circle cx="45.2" cy="22" r="1.3"/><circle cx="42.6" cy="27" r="1.1"/><circle cx="45.4" cy="33" r="1.5"/><circle cx="43.2" cy="37.5" r=".9"/></g>
  </g>
</g><g fill="${INK}"><circle cx="18" cy="39" r=".9"/><circle cx="18" cy="42" r=".9"/><circle cx="32" cy="39" r=".9"/><circle cx="32" cy="42" r=".9"/></g>`,

  /* La servante dévouée : coiffe et balai */
  servante: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M50 9L36 45" fill="none" stroke-width="4.4"/>
  <path d="M50 9L36 45" fill="none" stroke="#8a5a33" stroke-width="2.2"/>
  <path d="M33 44l7 3 2 9-12-4z" fill="#d4a23a"/>
  <path d="M35 46l-2 8M38 47l-1 8" fill="none" stroke-width="1.2"/>
  <path d="M9 55q1-14 14-14t14 14z" fill="#2f4f8f"/>
  <path d="M17 55l2-12h8l2 12z" fill="#f6f0e0"/>
  <ellipse cx="23" cy="32" rx="7" ry="8" fill="#e8b98f"/>
  <path d="M13 31q-1-14 10-14t10 14q-3-6-10-6t-10 6z" fill="#f6f0e0"/>
  <path d="M13 31q-3 0-2-3M33 31q3 0 2-3" fill="none" stroke-width="1.4"/>
</g><g fill="${INK}"><circle cx="20.5" cy="32" r="1.1"/><circle cx="25.5" cy="32" r="1.1"/></g>
<path d="M21 36.5q2 1.4 4 0" stroke="${INK}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,

  /* Le corbeau : perché de profil */
  corbeau: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M10 46q22-4 44-1" fill="none" stroke-width="5"/>
  <path d="M10 46q22-4 44-1" fill="none" stroke="#6b4426" stroke-width="2.8"/>
  <path d="M30 42l-2 3M34 42l1 3" fill="none" stroke="#d4a23a" stroke-width="1.8"/>
  <path d="M41 19q-9-3-14 5-9 6-12 13l-6 8 10-3q8 2 16 0 7-4 8-12l2-6z" fill="#231c19"/>
  <path d="M43 17l11 4-11 3z" fill="#4d4a45"/>
  <path d="M21 33q8-1 13 4M19 38q8 0 12 3" fill="none" stroke="#5a6f9a" stroke-width="1.4"/>
</g><circle cx="38.5" cy="19.5" r="1.8" fill="#f2c443"/><circle cx="38.8" cy="19.5" r=".8" fill="${INK}"/>`,

  /* La gitane : main tenant les cartes de tarot */
  gitane: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(-22 32 44)"><rect x="22" y="12" width="20" height="30" rx="2" fill="#b23a2b"/><path d="M26 16h12v22H26z" fill="none" stroke="#d4a23a" stroke-width="1.2"/></g>
  <g transform="rotate(22 32 44)"><rect x="22" y="12" width="20" height="30" rx="2" fill="#2f4f8f"/><path d="M26 16h12v22H26z" fill="none" stroke="#d4a23a" stroke-width="1.2"/></g>
  <rect x="22" y="10" width="20" height="30" rx="2" fill="#f6f0e0"/>
  <rect x="24.5" y="12.5" width="15" height="25" rx="1" fill="none" stroke="#c8932e" stroke-width="1.2"/>
  <path d="M35 17a6 6 0 1 0 0 10a4.5 4.5 0 1 1 0-10z" fill="#d4a23a" stroke-width="1.4"/>
  <path d="M32 30l1 2.4 2.5.2-2 1.6.7 2.4-2.2-1.4-2.2 1.4.7-2.4-2-1.6 2.5-.2z" fill="#2f4f8f" stroke-width="1"/>
  <path d="M18 56q-2-10 4-16l4-1q4 0 8 2l6-3q3 0 3 2l-6 6q-4 6-8 10z" fill="#e8b98f"/>
  <path d="M26 39q-1 4 4 5" fill="none" stroke-width="1.4"/>
</g>`,

  /* Le garde champêtre : cor de chasse et sa bandoulière */
  garde: MED('village') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M16 21q5-12 21-11 11 1 12 11" fill="none" stroke-width="3.6"/>
  <path d="M16 21q5-12 21-11 11 1 12 11" fill="none" stroke="#6b4426" stroke-width="1.8"/>
  <path d="M12 20l5-1q1 19 17 19 8 0 11-6l11-5q-1 25-23 26-22 0-21-33z" fill="#d4a23a"/>
  <ellipse cx="50.5" cy="29.5" rx="4.5" ry="10" transform="rotate(-62 50.5 29.5)" fill="#8a5a1e"/>
  <path d="M19 37l5-3M24 44l4-5M40 50l-2-7" fill="none" stroke-width="2.6"/>
  <path d="M10 17l8-2 .8 4-8 2z" fill="#7d7a73"/>
</g>`,

  /* Le grand méchant loup : plus gros, plus noir, gueule ouverte */
  gml: MED('loups') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M9 8l13 12h20L55 8l-1 19 4 9-9 6-6 3H21l-6-3-9-6 4-9z" fill="#4d4a45"/>
  <path d="M13 14l6 7M51 14l-6 7" fill="none"/>
  <path d="M21 44h22l-3 9-8 3-8-3z" fill="#7a1a12"/>
  <path d="M21 44h22l-3 9-8 3-8-3z" fill="none"/>
  <path d="M22 44l2 7 3-7zM42 44l-2 7-3-7zM28 44l2 4 2-4zM32 44l2 4 2-4z" fill="#f6f0e0" stroke-width="1.2"/>
  <path d="M25 55l2-5 2 6zM39 55l-2-5-2 6z" fill="#f6f0e0" stroke-width="1.2"/>
  <path d="M28 37h8l-4 4z" fill="${INK}"/>
  <path d="M16 26l11 5-9 3zM48 26l-11 5 9 3z" fill="#e0281c"/>
  <path d="M15 23l13 6M49 23l-13 6" fill="none" stroke-width="3"/>
</g>`,

  /* L'infect père des loups : vieux loup, couronne d'épines, bave verte */
  ipl: MED('loups') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M15 16l9 9h16l9-9-1 17 3 8-9 9-8 5-8-5-9-9 3-8z" fill="#a9a59b"/>
  <path d="M18 21l4 5M46 21l-4 5" fill="none"/>
  <path d="M21 22q11-8 22 0" fill="none" stroke-width="4.4"/>
  <path d="M21 22q11-8 22 0" fill="none" stroke="#6b4426" stroke-width="2.4"/>
  <path d="M21 21l-3-5 5 3M27 17l-1-6 4 5M37 17l1-6-4 5M43 21l3-5-5 3M32 16v-6" fill="none" stroke="#6b4426" stroke-width="1.8"/>
  <path d="M24 43l8 5 8-5-3 7-5 3-5-3z" fill="#e6e0d0"/>
  <path d="M29 42h6l-3 4z" fill="${INK}"/>
  <path d="M21 33l6 2-5 2zM43 33l-6 2 5 2z" fill="#7ad04a"/>
  <path d="M36 49q4 2 3 7a2.5 2.5 0 0 1-5 0q0-3 2-7z" fill="#6fb83a" stroke-width="1.4"/><path d="M27 49q-2 2-1 4" fill="none" stroke="#6fb83a" stroke-width="2"/>
</g><path d="M28 52l1.5 2 1-2" stroke="#fff" stroke-width="1.2" fill="none"/>
<path d="M18 37l4-1M46 37l-4-1" stroke="#f6f0e0" stroke-width="1.2" stroke-linecap="round"/>`,
});
Object.assign(ICONS, {
  loupblanc: MED('solo') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M15 14l9 9h16l9-9-1 17 3 8-9 9-8 5-8-5-9-9 3-8z" fill="#f4f7fb"/>
  <path d="M18 19l4 5M46 19l-4 5" fill="none" stroke="#7fa6cf"/>
  <path d="M20 31l-2 6M44 31l2 6M28 23l1 4M36 23l-1 4" fill="none" stroke="#a9c3e0" stroke-width="1.5"/>
  <path d="M24 41l8 5 8-5-3 7-5 3-5-3z" fill="#dfe9f3"/>
  <path d="M29 40h6l-3 4z" fill="${INK}"/>
  <path d="M21 31l6 2-5 2zM43 31l-6 2 5 2z" fill="#6ec3ef"/>
</g><path d="M28 50l1.5 2 1-2M34 50l1 2 1.5-2" stroke="#fff" stroke-width="1.2" fill="none"/>`,

  flute: MED('solo') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <g transform="rotate(-40 32 38)">
    <path d="M10 34h40l5-2.5v13l-5-2.5H10a4 4 0 0 1 0-8z" fill="#8a5a32"/>
    <path d="M17 34v8M44 34v8" stroke="${GOLDI}" stroke-width="2.4"/>
    <path d="M17 34v8M44 34v8" fill="none" stroke-width="0.8"/>
    <circle cx="25" cy="38" r="1.6" fill="${INK}"/><circle cx="31" cy="38" r="1.6" fill="${INK}"/><circle cx="37" cy="38" r="1.6" fill="${INK}"/>
  </g>
  <path d="M20 13v12M29 11v12" fill="none"/>
  <path d="M20 13l9-2v3l-9 2z" fill="${INK}"/>
  <ellipse cx="17.5" cy="25.5" rx="3.2" ry="2.4" transform="rotate(-20 17.5 25.5)" fill="#2f4f8f"/>
  <ellipse cx="26.5" cy="23.5" rx="3.2" ry="2.4" transform="rotate(-20 26.5 23.5)" fill="#2f4f8f"/>
  <path d="M47 34v11M47 34q5 2 4 7" fill="none"/>
  <ellipse cx="44.5" cy="45.5" rx="3.2" ry="2.4" transform="rotate(-20 44.5 45.5)" fill="#b23a2b"/>
</g>`,

  sectaire: MED('solo') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 9C22 11 18 22 18 33c0 8-3 14-6 19q20 8 40 0c-3-5-6-11-6-19 0-11-4-22-14-24z" fill="#8a2a22"/>
  <path d="M32 9c-3 6-3 10 0 12" fill="none" stroke-width="1.5"/>
  <path d="M32 19c-6 0-9 6-9 12 0 6 4 9 9 9s9-3 9-9c0-6-3-12-9-12z" fill="${INK}"/>
  <path d="M26 46c4 3 8 3 12 0" fill="none" stroke="${GOLDI}" stroke-width="2"/>
  <circle cx="32" cy="49" r="2.4" fill="#d4a23a" stroke-width="1.4"/>
</g>
<ellipse cx="28.5" cy="31" rx="2" ry="1.3" fill="#f2c443"/><ellipse cx="35.5" cy="31" rx="2" ry="1.3" fill="#f2c443"/>
<circle cx="46" cy="27" r="7" fill="#f7d774" opacity=".45"/>
<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <rect x="43" y="31" width="6" height="15" rx="1" fill="#f6f0e0"/>
  <path d="M46 22c3 3 4 6 1.5 8.5h-3C42 28 43 25 46 22z" fill="#e8762b"/>
  <ellipse cx="46" cy="46" rx="5" ry="3.4" fill="#e8b98f"/>
</g>`,

  ange: MED('solo') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M24 34C19 25 11 22 7 24c0 6 2 12 5 16-1 2 1 4 3 4 0 3 4 4 7 2 3 0 5-3 4-6z" fill="#f6f0e0"/>
  <path d="M40 34c5-9 13-12 17-10 0 6-2 12-5 16 1 2-1 4-3 4 0 3-4 4-7 2-3 0-5-3-4-6z" fill="#f6f0e0"/>
  <path d="M12 30l9 5M14 37l8 2M50 30l-9 5M48 37l-8 2" fill="none" stroke-width="1.4"/>
  <circle cx="32" cy="36" r="10" fill="#e8b98f"/>
  <path d="M22 35c-1-7 4-11 10-11s11 4 10 11c-2-3-4-5-6-5-2 2-6 2-8 0-2 0-4 2-6 5z" fill="#d4a23a"/>
  <path d="M27 37q1.5 1.5 3 0M34 37q1.5 1.5 3 0M29.5 42q2.5 2 5 0" fill="none" stroke-width="1.5"/>
</g>
<circle cx="26.5" cy="40.5" r="1.8" fill="#e58a7a"/><circle cx="37.5" cy="40.5" r="1.8" fill="#e58a7a"/>
<ellipse cx="32" cy="17" rx="10" ry="3.6" fill="none" stroke="${INK}" stroke-width="5"/>
<ellipse cx="32" cy="17" rx="10" ry="3.6" fill="none" stroke="#f2c443" stroke-width="2.4"/>`,

  pyromane: MED('solo') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M27 39h10l-2 18h-6z" fill="#6b4426"/>
  <path d="M28 45l8-2M28 50l7-2" fill="none" stroke-width="1.4"/>
  <path d="M32 7c4 6 12 10 10 20 3-2 4-5 4-8 4 6 2 14-4 17H22c-6-3-8-11-4-17 0 3 1 6 4 8-2-10 6-14 10-20z" fill="#b23a2b"/>
  <path d="M32 15c3 5 8 8 6 16 2-1 3-3 3-5 2 5 0 9-3 11H26c-3-2-5-6-3-11 0 2 1 4 3 5-2-8 3-11 6-16z" fill="#e8762b" stroke-width="1.5"/>
  <path d="M32 24c2 3 5 6 3 12h-6c-2-6 1-9 3-12z" fill="#f2c443" stroke-width="1.3"/>
  <path d="M22 35h20l-3 6H25z" fill="#d4a23a"/>
</g>`,

  voleur: MED('ambigu') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 8C20 8 14 20 14 32c0 10 1 16-3 21h42c-4-5-3-11-3-21 0-12-6-24-18-24z" fill="#3f6b3a"/>
  <ellipse cx="32" cy="35" rx="11" ry="13" fill="#e8b98f"/>
  <path d="M21 27c1-5 6-8 11-8s10 3 11 8c-3-3-7-4-11-4s-8 1-11 4z" fill="#2c4f2a" stroke-width="1.5"/>
  <path d="M19 29c6-3 20-3 26 0 0 5-3 8-8 7l-5-2-5 2c-5 1-8-2-8-7z" fill="${INK}"/>
  <path d="M19 30l-5-2M19 31l-4 3" fill="none"/>
  <path d="M28 43q4 2 7-1" fill="none" stroke-width="1.6"/>
</g>
<ellipse cx="26" cy="31.3" rx="2.6" ry="1.7" fill="#f6f0e0"/><ellipse cx="38" cy="31.3" rx="2.6" ry="1.7" fill="#f6f0e0"/>
<circle cx="26.6" cy="31.3" r="1" fill="${INK}"/><circle cx="38.6" cy="31.3" r="1" fill="${INK}"/>`,

  comedien: MED('ambigu') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 25c6-3 16-3 22 0 1 12-3 22-11 24-8-2-12-12-11-24z" fill="#2f4f8f"/>
  <path d="M34 33l5 1.5M48 33l-5 1.5" fill="none"/>
  <path d="M35 44q6-6 12 0q-6-3-12 0z" fill="${INK}"/>
  <path d="M12 17c6-3 16-3 22 0 1 12-3 22-11 24-8-2-12-12-11-24z" fill="#b23a2b"/>
  <path d="M16 25q3-3 6 0M24 25q3-3 6 0" fill="none"/>
  <path d="M16 31q7 8 14 0q-7 3-14 0z" fill="${INK}"/>
  <path d="M12 17c-3 1-5 4-4 7M52 25c3 1 5 4 4 7" fill="none" stroke="${GOLDI}" stroke-width="2.4"/>
</g>
<circle cx="18" cy="34" r="1.5" fill="#f2c443"/><circle cx="28" cy="34" r="1.5" fill="#f2c443"/>`,

  chienloup: MED('ambigu') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 20h8l8-10v19l3 9-9 9-10 6z" fill="#7d7a73"/>
  <path d="M45 16l-3 5" fill="none"/>
  <path d="M32 20c-8 0-14 4-15 12-1 6 3 12 7 16l8 5z" fill="#8a5a32"/>
  <path d="M25 21c-8-3-14 3-13 13 1 6 5 8 7 6 1-6 2-12 8-16z" fill="#4a2e1a"/>
  <path d="M32 44l-8-3 3 8 5 3z" fill="#d9b98a"/>
  <path d="M32 44l8-3-3 8-5 3z" fill="#d9d2c0"/>
  <path d="M32 20v33" fill="none"/>
  <path d="M29 40h6l-3 4z" fill="${INK}"/>
  <path d="M43 31l-6 2 5 2z" fill="#f2c443"/>
  <circle cx="25" cy="33" r="2.6" fill="${INK}"/>
</g><circle cx="25.8" cy="32.2" r=".9" fill="#fff"/>`,

  enfant: MED('ambigu') + `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="19" cy="38" r="3.5" fill="#e8b98f"/><circle cx="45" cy="38" r="3.5" fill="#e8b98f"/>
  <circle cx="32" cy="37" r="13" fill="#e8b98f"/>
  <path d="M18 35c-2-10 2-18 8-20l-1-5 5 4 2-6 3 6 5-4-1 6c6 2 9 9 7 19l-3-6-3 4-3-7-4 5-3-6-4 5-3-5-2 6z" fill="#6b4426"/>
  <path d="M29 44q3 3 6 0" fill="none" stroke-width="1.6"/>
</g>
<circle cx="27" cy="37" r="1.8" fill="${INK}"/><circle cx="37" cy="37" r="1.8" fill="${INK}"/>
<g fill="#b5763f"><circle cx="24" cy="41" r=".8"/><circle cx="26" cy="42" r=".8"/><circle cx="38" cy="42" r=".8"/><circle cx="40" cy="41" r=".8"/></g>
<g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" fill="#5f9a3f">
  <path d="M14 18c3-5 9-5 11-3-2 4-8 6-11 3z"/><path d="M50 16c-3-5-9-5-11-2 2 4 8 5 11 2z"/><path d="M46 27c4-2 8 0 8 3-3 2-7 1-8-3z"/>
</g>`,

  'jeu-tp': `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M11 21L3 39M11 21l8 18M53 21l-8 18M53 21l8 18" fill="none" stroke-width="1.5"/>
  <rect x="30" y="12" width="4" height="40" fill="#d4a23a"/>
  <rect x="6" y="18" width="52" height="5" rx="2.5" fill="#d4a23a"/>
  <circle cx="32" cy="10" r="3.5" fill="#d4a23a"/>
  <path d="M20 59h24l-4-7H24z" fill="#c8932e"/>
  <path d="M1 39h20q-10 13-20 0z" fill="#b23a2b"/>
  <path d="M43 39h20q-10 13-20 0z" fill="#2f4f8f"/>
</g>`,

  'jeu-lg': `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="41" cy="24" r="19" fill="#f6e7a6"/>
  <circle cx="48" cy="17" r="3.5" fill="#e6d38a" stroke="none"/><circle cx="51" cy="30" r="2.5" fill="#e6d38a" stroke="none"/><circle cx="41" cy="35" r="2" fill="#e6d38a" stroke="none"/>
  <path d="M0 64V56q16-7 34-2 16 4 30-4v14z" fill="${INK}"/>
  <path d="M5 55q1-8 11-6c-2-8-1-14 4-19l0-9-1-11 6 6 3-1 10-9 1 3-6 7 5-2-1 3-7 6c-1 4 0 7 2 10 2 4 2 9 2 14l1 9 3 2h-7l-2-11-2 11h-8c-5 1-11 1-13-1z" fill="${INK}"/>
</g>
<g fill="#f2c443" stroke="${INK}" stroke-width=".6"><circle cx="8" cy="10" r="1.3"/><circle cx="15" cy="23" r="1"/><circle cx="6" cy="36" r="1.1"/></g>`,

  'jeu-gp': `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M8 27h42v25H8z" fill="#efe1bd"/>
  <rect x="5" y="22" width="48" height="7" rx="3.5" fill="#d9c393"/>
  <rect x="5" y="50" width="48" height="7" rx="3.5" fill="#d9c393"/>
  <path d="M12 34h14M12 39h10M12 44h13" fill="none" stroke-width="1.5"/>
  <circle cx="36" cy="40" r="5" fill="none" stroke="#b23a2b" stroke-width="1.8"/>
  <path d="M27 44C31 27 44 11 60 4c-3 15-15 32-30 43z" fill="#f6f0e0"/>
  <path d="M24 50L58 6" fill="none"/>
  <path d="M33 37l-4-3M38 30l-4-4M43 24l-3-5M48 18l-3-5M36 39l4 1M41 33l5 0M46 26l5-1" fill="none" stroke-width="1.2"/>
  <path d="M21 54l3-6 3 2z" fill="${INK}"/>
</g>`,

  'jeu-av': `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M44 10l13 6.5L44 23 31 16.5z" fill="#f6f0e0"/>
  <path d="M31 16.5L44 23v15l-13-6.5z" fill="#e6dcc4"/>
  <path d="M44 23l13-6.5v15L44 38z" fill="#d4c7a6"/>
  <path d="M22 25l15 7.5L22 40 7 32.5z" fill="#f6f0e0"/>
  <path d="M7 32.5L22 40v17L7 49.5z" fill="#e6dcc4"/>
  <path d="M22 40l15-7.5v17L22 57z" fill="#d4c7a6"/>
</g>
<g fill="${INK}">
  <ellipse cx="44" cy="16.5" rx="2" ry="1.2" fill="#b23a2b"/>
  <ellipse cx="38" cy="16.5" rx="1.5" ry=".9"/><ellipse cx="50" cy="16.5" rx="1.5" ry=".9"/>
  <ellipse cx="34.5" cy="23.5" rx="1.2" ry="1.6"/><ellipse cx="40.5" cy="31" rx="1.2" ry="1.6"/>
  <ellipse cx="50.5" cy="27.2" rx="1.2" ry="1.6"/>
  <ellipse cx="22" cy="32.5" rx="2.6" ry="1.5" fill="#b23a2b"/>
  <ellipse cx="11.5" cy="40" rx="1.4" ry="1.9"/><ellipse cx="17.5" cy="49.5" rx="1.4" ry="1.9"/>
  <ellipse cx="25.8" cy="43.1" rx="1.4" ry="1.9"/><ellipse cx="29.5" cy="45.3" rx="1.4" ry="1.9"/><ellipse cx="33.2" cy="47.6" rx="1.4" ry="1.9"/>
</g>`,

  sapin: `<g stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
  <rect x="28" y="50" width="8" height="11" fill="#6b4426"/>
  <path d="M32 24l22 26q-6 2-11 0-5 3-11 1-6 2-11-1-5 2-11 0z" fill="#2f5a2e"/>
  <path d="M32 13l17 22q-5 2-9 0-4 2-8 1-4 1-8-1-4 2-9 0z" fill="#3f6b3a"/>
  <path d="M32 3l12 17q-4 2-7 0-2 2-5 1-3 1-5-1-3 2-7 0z" fill="#4f7d42"/>
</g>`,
});
/* Icônes d'interface (petites, lisibles sur fond nuit et sur parchemin) */
Object.assign(ICONS, {
  lune: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M38 5A28 28 0 1 0 59 43A22 22 0 0 1 38 5z" fill="#f2c443"/>
  <path d="M17 26q4 3 8 0" fill="none" stroke-width="2.5"/>
  <path d="M20 40q5 3 9-1" fill="none" stroke-width="2.5"/>
  <path d="M45 10l1.6 3.4 3.4 1.6-3.4 1.6L45 20l-1.6-3.4L40 15l3.4-1.6z" fill="#f6f0e0" stroke-width="2"/>
</g>`,
  soleil: (() => {
    let r = '';
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, c = Math.cos(a), s = Math.sin(a), px = -s, py = c;
      const P = (d, o) => `${(32 + c * d + px * o).toFixed(1)} ${(32 + s * d + py * o).toFixed(1)}`;
      r += i % 2 ? `M${P(17, -4)}L${P(27, 0)}L${P(17, 4)}z`
                 : `M${P(17, -5)}Q${P(24, -6)} ${P(25, 0)}Q${P(27, 4)} ${P(30, 2)}Q${P(25, 6)} ${P(17, 5)}z`;
    }
    return `<g stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
  <path d="${r}" fill="#d4a23a"/>
  <circle cx="32" cy="32" r="17" fill="#f2c443" stroke-width="3"/>
  <path d="M24 29q2.5-2.5 5 0M35 29q2.5-2.5 5 0" fill="none" stroke-width="2.4"/>
  <path d="M25 37q7 6 14 0" fill="none" stroke-width="2.6"/>
  <circle cx="22.5" cy="34" r="2" fill="#e08a5a" stroke="none"/><circle cx="41.5" cy="34" r="2" fill="#e08a5a" stroke="none"/>
</g>`;
  })(),
  crane: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 5C17 5 9 15 9 27c0 7 3 11 7 14v8c0 3 2 5 5 5h22c3 0 5-2 5-5v-8c4-3 7-7 7-14C55 15 47 5 32 5z" fill="#f6f0e0"/>
  <path d="M15 27c0-4 3-6 7-6s6 3 6 6-2 6-6 6-7-2-7-6zM36 27c0-3 2-6 6-6s7 2 7 6-3 6-7 6-6-3-6-6z" fill="${INK}"/>
  <path d="M32 34l-4 7h8z" fill="${INK}" stroke-width="2"/>
  <path d="M26 47v7M32 47v7M38 47v7M21 47h22" fill="none" stroke-width="2.5"/>
</g>`,
  maire: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M17 4h10l5 26-8 2z" fill="#2f4f8f"/>
  <path d="M47 4H37l-5 26 8 2z" fill="#b23a2b"/>
  <path d="M27 4h10l-5 26z" fill="#f6f0e0"/>
  <circle cx="32" cy="43" r="17" fill="#d4a23a"/>
  <path d="M32 31l3.6 7.6 8.2 1-6 5.7 1.6 8.2L32 49.4l-7.4 4.1 1.6-8.2-6-5.7 8.2-1z" fill="#f2c443" stroke-width="2.4"/>
</g>`,
  vote: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 4h22v24H20z" fill="#f6f0e0"/>
  <path d="M25 11h12M25 17h12" fill="none" stroke-width="2.4"/>
  <path d="M6 28l8-8h36l8 8z" fill="#a0703f"/>
  <path d="M6 28h52v30H6z" fill="#6b4426"/>
  <path d="M22 24h20" stroke-width="4"/>
  <path d="M6 37h52M6 49h52" fill="none" stroke-width="2.4"/>
  <circle cx="32" cy="43" r="5.5" fill="#b23a2b" stroke-width="2.5"/>
</g>`,
  livre: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 18v35h26l3 3 3-3h26V18z" fill="#6b4426"/>
  <path d="M32 52c-6-4-15-5-25-4V12c10-1 19 1 25 6z" fill="#f6f0e0"/>
  <path d="M32 52c6-4 15-5 25-4V12c-10-1-19 1-25 6z" fill="#f6f0e0"/>
  <path d="M32 18v34" fill="none"/>
  <path d="M12 22q8-1 15 2M12 30q8-1 15 2M12 38q8-1 15 2M37 24q7-3 15-2M37 32q7-3 15-2M37 40q7-3 15-2" fill="none" stroke-width="2.2"/>
  <path d="M43 13v16l3-3 3 3V12" fill="#b23a2b" stroke-width="2.4"/>
</g>`,
  sablier: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M19 10h26c0 12-9 16-9 22s9 10 9 22H19c0-12 9-16 9-22s-9-10-9-22z" fill="#e4ecf2"/>
  <path d="M24 17h16c-2 6-8 8-8 13-0-5-6-7-8-13z" fill="#f2c443" stroke-width="2"/>
  <path d="M22 52c1-6 6-8 10-9 4 1 9 3 10 9z" fill="#f2c443" stroke-width="2"/>
  <path d="M32 33v10" fill="none" stroke="#d4a23a" stroke-width="2"/>
  <path d="M14 13V51M50 13V51" fill="none" stroke-width="3.5"/>
  <path d="M10 5h44v6H10zM10 53h44v6H10z" fill="#6b4426"/>
</g>`,
  coeur: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 57C20 47 5 37 5 22 5 13 12 7 20 7c6 0 10 3 12 8 2-5 6-8 12-8 8 0 15 6 15 15 0 15-15 25-27 35z" fill="#b23a2b"/>
  <path d="M14 18q2-5 7-5" fill="none" stroke="#f6c0b0" stroke-width="3"/>
</g>`,
  charme: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M22 46V14l32-8v32" fill="none" stroke-width="7"/>
  <path d="M22 46V14l32-8v32" fill="none" stroke="#d4a23a" stroke-width="2"/>
  <path d="M20 12l36-9v9l-36 9z" fill="#d4a23a"/>
  <ellipse cx="15" cy="48" rx="9" ry="7" transform="rotate(-20 15 48)" fill="#f2c443"/>
  <ellipse cx="47" cy="40" rx="9" ry="7" transform="rotate(-20 47 40)" fill="#f2c443"/>
</g>`,
  huile: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M22 16c-7 0-9 9-3 12M42 16c7 0 9 9 3 12" fill="none" stroke-width="5"/>
  <path d="M22 16c-7 0-9 9-3 12M42 16c7 0 9 9 3 12" fill="none" stroke="#b8693d" stroke-width="1.6"/>
  <path d="M24 6h16v4l-3 3v4c9 3 13 11 13 20 0 10-7 17-18 17s-18-7-18-17c0-9 4-17 13-20v-4l-3-3z" fill="#b8693d"/>
  <path d="M19 34h26M23 41h18" fill="none" stroke-width="2.2"/>
  <path d="M23 5h18v5H23z" fill="#f2c443" stroke-width="2.6"/>
  <path d="M40 10c0 4 4 4 4 9 0 2-1 3-2 3s-2-1-2-3z" fill="#f2c443" stroke-width="2.2"/>
  <path d="M52 42c4 5 5 8 5 10a5 5 0 0 1-10 0c0-2 1-5 5-10z" fill="#f2c443" stroke-width="2.6"/>
</g>`,
  bouclier: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M8 7h48v20c0 16-11 25-24 31C19 52 8 43 8 27z" fill="#2f4f8f"/>
  <path d="M10 37l22-15 22 15v6L32 28 10 43" fill="#d4a23a" stroke-width="2.6"/>
  <path d="M8 7h48v20c0 16-11 25-24 31C19 52 8 43 8 27z" fill="none"/>
  <circle cx="32" cy="16" r="3.5" fill="#f2c443" stroke-width="2.2"/>
</g>`,
  plume: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M56 5C38 6 22 20 16 40l-3 9 4 1 3-4c20-5 33-20 36-41z" fill="#55596b"/>
  <path d="M30 30l-6-2M38 22l-6-4M28 38l6 2M38 31l7 1M46 17l-5-5" fill="none" stroke="#a7acbd" stroke-width="2"/>
  <path d="M56 5C40 18 25 34 10 59" fill="none" stroke-width="3"/>
  <path d="M56 5C40 18 25 34 12 56" fill="none" stroke="#f6f0e0" stroke-width="1.2"/>
</g>`,
  rire: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="32" r="26" fill="#f2c443"/>
  <path d="M17 24l7 4-7 4M47 24l-7 4 7 4" fill="none"/>
  <path d="M16 38h32c0 10-7 15-16 15s-16-5-16-15z" fill="#7a1f17"/>
  <path d="M18 38h28l-2 4H20z" fill="#f6f0e0" stroke-width="2"/>
  <path d="M25 50c2-3 12-3 14 0" fill="#e0675a" stroke="none"/>
  <path d="M8 30c-4 5-4 9-1 10s5-3 3-10zM56 30c4 5 4 9 1 10s-5-3-3-10z" fill="#8fc4ea" stroke-width="2.2"/>
</g>`,
  feu: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M32 4c4 10 18 16 18 32 0 12-8 22-18 22S14 48 14 36c0-8 4-12 7-16 0 6 2 9 5 10-2-11 2-19 6-26z" fill="#b23a2b"/>
  <path d="M32 26c3 7 10 10 10 18 0 6-4 10-10 10s-10-4-10-10c0-4 2-6 4-8 0 3 1 5 3 5-1-6 1-11 3-15z" fill="#d4a23a" stroke-width="2.4"/>
  <path d="M32 40c2 4 5 5 5 9 0 3-2 5-5 5s-5-2-5-5c0-4 3-6 5-9z" fill="#f6e08a" stroke-width="2"/>
</g>`,
  peur: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="32" cy="30" r="24" fill="#cdd9e6"/>
  <path d="M19 16q4-3 8-1M45 16q-4-3-8-1" fill="none" stroke-width="2.4"/>
  <circle cx="24" cy="25" r="5" fill="#f6f0e0"/><circle cx="40" cy="25" r="5" fill="#f6f0e0"/>
  <circle cx="24" cy="25.5" r="1.8" fill="${INK}" stroke="none"/><circle cx="40" cy="25.5" r="1.8" fill="${INK}" stroke="none"/>
  <ellipse cx="32" cy="42" rx="6" ry="8" fill="#7a1f17"/>
  <path d="M4 52c0-8 3-14 8-18 2 0 4 1 4 3l-2 8 4-6c2-1 4 0 4 2l-3 7c-2 5-6 8-15 8zM60 52c0-8-3-14-8-18-2 0-4 1-4 3l2 8-4-6c-2-1-4 0-4 2l3 7c2 5 6 8 15 8z" fill="#f6f0e0" stroke-width="2.6"/>
</g>`,
  bravo: (() => {
    const hand = `<path d="M-7 18V-8a7 7 0 0 1 14 0v14l5-4c3-2 6 1 4 4L7 18c-2 4-4 6-7 6s-7-2-7-6z" fill="#f2d3a8"/><path d="M-2 -10v14M2.5 -9v13" fill="none" stroke-width="1.8"/>`;
    return `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <g transform="translate(22 34) rotate(-22) scale(-1 1)">${hand}</g>
  <g transform="translate(42 34) rotate(22)">${hand}</g>
  <path d="M32 4v8M20 8l3 6M44 8l-3 6" fill="none" stroke="#d4a23a" stroke-width="3.2"/>
</g>`;
  })(),
  oeil: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 32C11 19 21 13 32 13s21 6 29 19C53 45 43 51 32 51S11 45 3 32z" fill="#f6f0e0"/>
  <circle cx="32" cy="32" r="12" fill="#2f4f8f"/>
  <circle cx="32" cy="32" r="5" fill="${INK}"/>
  <circle cx="36" cy="27.5" r="2.6" fill="#fff" stroke="none"/>
  <path d="M32 13V6M18 17l-4-6M46 17l4-6" fill="none" stroke-width="2.6"/>
</g>`,
  annuler: `<g stroke-linejoin="round" stroke-linecap="round">
  <path d="M16 26h22c9 0 16 7 16 15s-7 15-16 15H26" fill="none" stroke="${INK}" stroke-width="12"/>
  <path d="M16 26h22c9 0 16 7 16 15s-7 15-16 15H26" fill="none" stroke="#f2c443" stroke-width="5.5"/>
  <path d="M5 26l17-15v30z" fill="#f2c443" stroke="${INK}" stroke-width="3"/>
</g>`,
  groupe: `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 46c0-11 6-18 15-18s15 7 15 18v6H30z" fill="#2f4f8f"/>
  <circle cx="45" cy="18" r="9" fill="#f2d3a8"/>
  <path d="M4 58c0-13 7-21 17-21s17 8 17 21z" fill="#b23a2b"/>
  <circle cx="21" cy="25" r="10" fill="#f2d3a8"/>
</g>`,
});
