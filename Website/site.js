/* ════════════════════════════════════════════════
   CHAI MENACHEM — Menu mobile partagé
   Injecte un hamburger flottant + un overlay plein écran
   sur chaque page (visible ≤900px via site.css).
   ════════════════════════════════════════════════ */
(function () {
  if (document.querySelector('.m-burger')) return;

  var items = [
    ['Início', 'variante-clara.html'],
    ['Sobre', 'sobre.html'],
    ['Programas', 'programas.html'],
    ['Festas', 'festas.html'],
    ['Rezas & Horários', 'rezas-horarios.html'],
    ['Aulas', 'aulas.html'],
    ['Galeria', 'galeria.html']
  ];

  // overlay
  var ov = document.createElement('div');
  ov.id = 'm-overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-label', 'Menu');
  ov.innerHTML =
    '<nav class="overlay-nav">' +
    items.map(function (i) { return '<a href="' + i[1] + '">' + i[0] + '</a>'; }).join('') +
    '</nav><p class="overlay-tag">Centro Chabad · Higienópolis · São Paulo</p>';
  document.body.appendChild(ov);

  // hamburger flottant
  var b = document.createElement('button');
  b.className = 'm-burger';
  b.type = 'button';
  b.setAttribute('aria-label', 'Menu');
  b.setAttribute('aria-expanded', 'false');
  b.innerHTML = '<span></span><span></span><span></span>';
  document.body.appendChild(b);

  function set(open) {
    ov.classList.toggle('open', open);
    b.classList.toggle('open', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  b.addEventListener('click', function () { set(!ov.classList.contains('open')); });
  ov.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
