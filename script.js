const CFG = {
  n1: 'Hossam', n2: 'Jana',
  date: '2027-01-15', time: '19:00',            // YYYY-MM-DD and HH:MM (24h)
  timeNote: 'Doors open at 6:30 PM',
  venueName: 'Mirage Hall ', venueSub: 'TRANSPORT OFFICERS CLUB', venueArea: 'NILE CORNICHE,SHUBRA EL KHEMA,Cairo, Egypt',
  mapUrl: 'https://maps.app.goo.gl/1XogsQor5jaPZ8Kb9',   // paste your Google Maps link
  whatsapp: '01001471931',              // international format without +, e.g. 201001234567
  audio: 'WhatsApp Audio 2026-10-17 at 3.27.09 PM.mp3'    // put your song in the audio folder with this name
};
/* =================================== */
const $ = i => document.getElementById(i);
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const d = new Date(CFG.date + 'T' + CFG.time + ':00');
const day = d.getDate(), names = CFG.n1 + ' & ' + CFG.n2;
const ord = n => n + (['th','st','nd','rd'][(n % 100 >> 3 ^ 1 && n % 10 < 4) ? n % 10 : 0]);
const dateLong = ord(day) + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
['c1','n1'].forEach(i => $(i).textContent = CFG.n1); ['c2','n2'].forEach(i => $(i).textContent = CFG.n2);
$('cDate').textContent = dateLong;
$('icoDay').textContent = day;
$('dVal').innerHTML = ord(day) + ' ' + months[d.getMonth()] + '<br>' + d.getFullYear();
$('dSub').textContent = d.toLocaleDateString('en-GB', {weekday: 'long'}) + ' Evening';
const h = d.getHours();
$('tVal').textContent = (h % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
$('tSub').textContent = CFG.timeNote;
$('vName').textContent = $('vName2').textContent = CFG.venueName;
$('vAddr').innerHTML = CFG.venueSub + '<br>' + CFG.venueArea;
$('vArea').textContent = CFG.venueArea;
$('vFull').innerHTML = CFG.venueName + ' · ' + CFG.venueSub + '<br>' + CFG.venueArea;
$('dir').href = CFG.mapUrl;
$('fNames').textContent = names;
$('fNote').textContent = day + ' · ' + months[d.getMonth()] + ' · ' + d.getFullYear() + '  —  ' + CFG.venueArea;
const f = x => x.toISOString().replace(/[-:]|\.\d{3}/g, '');
$('gcal').href = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(names + ' Wedding') +
  '&dates=' + f(d) + '/' + f(new Date(d.getTime() + 3 * 36e5)) + '&location=' + encodeURIComponent(CFG.venueName + ', ' + CFG.venueArea);
if (CFG.whatsapp) $('rsvp').href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent('RSVP – ' + names + ' Wedding');
else $('rsvp').style.display = 'none';

function tick() {
  const s = Math.floor((d - new Date()) / 1000);
  $('count').textContent = s > 0 ? Math.floor(s / 86400) + ' days · ' + Math.floor(s % 86400 / 3600) + ' hours · ' + Math.floor(s % 3600 / 60) + ' minutes to go' : '';
}
tick(); setInterval(tick, 1000);

/* falling petals */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function petal(burst) {
  if (reduce) return;
  const p = document.createElement('i'); p.className = 'petal';
  p.style.left = Math.random() * 100 + '%';
  if (burst) p.style.top = (20 + Math.random() * 40) + '%';
  p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
  p.style.setProperty('--rot', (360 + Math.random() * 540) + 'deg');
  p.style.animationDuration = (7 + Math.random() * 7) + 's';
  const s = .6 + Math.random() * .9; p.style.width = 14 * s + 'px'; p.style.height = 18 * s + 'px';
  $('petals').appendChild(p); setTimeout(() => p.remove(), 15000);
}
setInterval(() => petal(false), 450);
document.body.classList.add('locked');

/* music */
const a = $('bgm'), mb = $('music');
if (CFG.audio) { a.src = CFG.audio; mb.classList.add('show'); }
a.addEventListener('error', () => mb.classList.remove('show'));
const sync = () => mb.classList.toggle('on', !a.paused);
a.addEventListener('play', sync); a.addEventListener('pause', sync);
mb.onclick = () => { a.paused ? a.play().catch(() => {}) : a.pause(); };

/* open invitation */
$('openBtn').onclick = () => {
  for (let i = 0; i < 28; i++) setTimeout(() => petal(true), i * 40);
  if (CFG.audio) a.play().catch(() => {});
  $('cover').classList.add('hide'); document.body.classList.remove('locked');
  setTimeout(() => $('cover').remove(), 1300);
};

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), {threshold: .15});
document.querySelectorAll('.r').forEach((el, i) => { el.style.transitionDelay = (el.closest('.hero') ? i * .12 : 0) + 's'; io.observe(el); });

/* ===== MORE MOTION ===== */
/* letter-by-letter names */
const split = (el, d) => { const t = el.textContent; el.textContent = '';
  [...t].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
    s.style.setProperty('--i', i); s.style.setProperty('--d', d + 'ms'); el.appendChild(s); }); };
split($('c1'), 900); split($('c2'), 1500); split($('n1'), 250); split($('n2'), 800);
document.querySelectorAll('.detail-block').forEach(b => { b.classList.add('r'); io.observe(b); });

/* falling flowers */
function flower(burst) {
  if (reduce || $('petals').querySelectorAll('.ff').length > 16) return;
  const e = document.createElement('div'); e.className = 'ff';
  e.style.setProperty('--x', Math.random() * 94 + '%');
  e.style.setProperty('--s', (26 + Math.random() * 38) + 'px');
  e.style.setProperty('--dur', (9 + Math.random() * 8) + 's');
  e.style.setProperty('--sw', (2.5 + Math.random() * 3) + 's');
  if (burst) e.style.setProperty('--del', (Math.random() * 1.4) + 's');
  e.innerHTML = '<svg viewBox="0 0 120 120"><use href="#flower"/></svg>';
  $('petals').appendChild(e); setTimeout(() => e.remove(), 20000);
}
setInterval(() => flower(false), 1800);
for (let i = 0; i < 4; i++) setTimeout(() => flower(true), i * 500);
$('openBtn').addEventListener('click', () => { for (let i = 0; i < 12; i++) flower(true); });

/* tap sparkles + mouse trail */
document.addEventListener('pointerdown', e => {
  if (reduce || e.target.closest('a,button,input')) return;
  for (let i = 0; i < 10; i++) { const s = document.createElement('i'); s.className = 'spark';
    s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
    const a = Math.random() * 6.28, r = 30 + Math.random() * 50;
    s.style.setProperty('--dx', Math.cos(a) * r + 'px'); s.style.setProperty('--dy', Math.sin(a) * r + 'px');
    document.body.appendChild(s); setTimeout(() => s.remove(), 950); }
});
let lastT = 0;
document.addEventListener('pointermove', e => {
  if (reduce || e.pointerType !== 'mouse' || Date.now() - lastT < 70) return; lastT = Date.now();
  const t = document.createElement('i'); t.className = 'trail'; t.textContent = '✦';
  t.style.left = e.clientX + 'px'; t.style.top = e.clientY + 'px';
  document.body.appendChild(t); setTimeout(() => t.remove(), 1000);
});
