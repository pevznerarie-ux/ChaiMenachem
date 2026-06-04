/* TOP BAR SCROLL */
const topBar = document.getElementById('topBar');
window.addEventListener('scroll', () => topBar.classList.toggle('scrolled', window.scrollY > 60));

/* ACTIVE NAV */
const sections = document.querySelectorAll('section[id]');
const sideLinks = document.querySelectorAll('.sb-nav a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      sideLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.sb-nav a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => io.observe(s));

/* SCROLL REVEAL */
const revealEls = document.querySelectorAll('.reveal');
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealIO.observe(el));

/* MOBILE NAV */
const toggle = document.getElementById('mobile-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
  const open = sidebar.style.display === 'flex';
  sidebar.style.display = open ? 'none' : 'flex';
  sidebar.style.width = '240px';
  sidebar.style.zIndex = '300';
});

/* HERO SLIDESHOW */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let cur = 0;
  function goTo(n) {
    slides[cur].classList.remove('active'); dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active'); dots[cur].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo(cur + 1), 5000);
})();

/* PIX */
function pixCRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
function pixField(id, v) { return id + v.length.toString().padStart(2, '0') + v; }
function generatePIX(amount) {
  const key = '32157390000102', name = 'CHAI MENACHEM', city = 'SAO PAULO';
  const mai = pixField('00', 'br.gov.bcb.pix') + pixField('01', key);
  const add = pixField('05', '***');
  let p = '000201' + '010212' + pixField('26', mai) + '52040000' + '5303986' +
    pixField('54', parseFloat(amount).toFixed(2)) + '5802BR' +
    pixField('59', name) + pixField('60', city) + pixField('62', add) + '6304';
  return p + pixCRC16(p);
}

/* MODAL DOAÇÃO */
function openDoar() { goBackStep1(); document.getElementById('doarOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeDoar() { document.getElementById('doarOverlay').classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('doarOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeDoar(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDoar(); closeLightbox(); closeVideoModal(); closeInfoModal(); } });

function goToPayment(amount) {
  document.getElementById('payAmountDisplay').textContent = 'R$ ' + parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const payload = generatePIX(amount);
  document.getElementById('pixCopiaCola').textContent = payload;
  document.getElementById('pixQRImg').src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(payload) + '&size=200x200&margin=8';
  document.getElementById('doarStep1').classList.remove('active');
  document.getElementById('doarStep2').classList.add('active');
  document.querySelector('.doar-modal').scrollTop = 0;
}
function goToPaymentCustom() {
  const val = document.getElementById('customAmt').value;
  if (!val || parseFloat(val) <= 0) { document.getElementById('customAmt').focus(); return; }
  goToPayment(val);
}
function goBackStep1() {
  document.getElementById('doarStep2').classList.remove('active');
  document.getElementById('doarStep1').classList.add('active');
}
function copyPixCode(btn) {
  navigator.clipboard.writeText(document.getElementById('pixCopiaCola').textContent).then(() => {
    btn.textContent = 'Copiado!'; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2500);
  });
}

/* GALLERY LIGHTBOX */
const galleries = {
  purim: { title: 'Purim — פּוּרִים', photos: [
    { src: 'image-1778686874359.jpg' }, { src: 'image-1778687184743.jpg' }, { src: 'image-1778687171161.jpg' },
    { src: 'image-1778686902445.jpg' }, { src: 'image-1778686887218.jpg' }, { src: 'image-1778686895286.jpg' },
    { src: 'image-1778687192679.jpg' }, { src: 'image-1778687200881.jpg' }, { src: 'image-1778687208709.jpg' },
    { src: 'image-1778686902447.jpg' }, { src: 'image-1778687414932.jpg' }, { src: 'image-1778687423027.jpg' },
    { src: 'image-1778687430680.jpg' }, { src: 'image-1778687437026.jpg' }, { src: 'image-1778687444446.jpg' },
    { src: 'image-1778687676569.jpg' }, { src: 'image-1778687699855.jpg' }, { src: 'image-1778687710950.jpg' },
    { src: 'image-1778687718963.jpg' }
  ]},
  lag_baomer: { title: "Lag Ba'Omer — ל\"ג בָּעוֹמֶר", photos: [
    { src: 'WhatsApp Image 2026-05-19 at 10.11.39.jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 10.11.40.jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 10.11.42.jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 10.11.44.jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 10.11.44 (1).jpeg' }, { src: 'WhatsApp Image 2026-05-06 at 12.55.51.jpeg' },
    { src: 'WhatsApp Image 2026-05-06 at 12.55.51 (1).jpeg' }, { src: 'WhatsApp Image 2026-05-06 at 12.55.51 (2).jpeg' },
    { src: 'WhatsApp Image 2026-05-06 at 12.55.52.jpeg' }, { src: 'WhatsApp Image 2026-05-06 at 12.56.58.jpeg' },
    { src: 'WhatsApp Image 2026-05-06 at 12.57.01.jpeg' }, { src: 'WhatsApp Image 2026-05-06 at 12.57.02.jpeg' },
    { src: 'WhatsApp Image 2026-05-06 at 12.57.06.jpeg' }
  ]},
  casais: { title: 'Eventos para Casais', photos: [
    { src: 'WhatsApp Image 2026-05-19 at 11.25.23.jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.25.23 (1).jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.25.23 (3).jpeg' }
  ]},
  chanuca: { title: 'Chanucá — חֲנֻכָּה', photos: [
    { src: 'WhatsApp Image 2026-05-19 at 11.34.15 (1).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.15 (2).jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.34.15 (4).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.15 (5).jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.34.15 (6).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.16 (1).jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.34.16 (3).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.16 (5).jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.34.16 (7).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.17.jpeg' },
    { src: 'WhatsApp Image 2026-05-19 at 11.34.17 (1).jpeg' }, { src: 'WhatsApp Image 2026-05-19 at 11.34.17 (2).jpeg' }
  ]}
};
let lbPhotos = [], lbIndex = 0;

function openGallery(key) {
  const g = galleries[key]; if (!g) return;
  lbPhotos = g.photos; lbIndex = 0;
  document.getElementById('lb-title').textContent = g.title;
  buildThumbs(); setPhoto(0);
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow = ''; }
function setPhoto(i) {
  lbIndex = (i + lbPhotos.length) % lbPhotos.length;
  document.getElementById('lb-img').src = lbPhotos[lbIndex].src;
  document.getElementById('lb-counter').textContent = (lbIndex + 1) + ' / ' + lbPhotos.length;
  document.querySelectorAll('.lb-thumb').forEach((t, idx) => t.classList.toggle('active', idx === lbIndex));
}
function buildThumbs() {
  const wrap = document.getElementById('lb-thumbs'); wrap.innerHTML = '';
  lbPhotos.forEach((p, i) => {
    const img = document.createElement('img');
    img.src = p.src; img.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    img.onclick = () => setPhoto(i); wrap.appendChild(img);
  });
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') setPhoto(lbIndex + 1);
  if (e.key === 'ArrowLeft') setPhoto(lbIndex - 1);
});

/* HORARIOS TOGGLE */
function toggleHorarios(card) {
  const h = card.querySelector('.horarios-toggle'), hint = card.querySelector('.horarios-hint');
  const open = h.style.display !== 'none';
  h.style.display = open ? 'none' : 'block';
  hint.innerHTML = open
    ? 'Ver horários <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>'
    : 'Fechar <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 15l6-6 6 6"/></svg>';
}

/* VIDEO MODAL */
const chaiTeensVideos = [
  { src: 'chai-teens.mp4', label: 'Vídeo 1' },
  { src: 'chai-teens-2.mp4', label: 'Vídeo 2' },
  { src: 'chai-teens-3.mp4', label: 'Vídeo 3' }
];
let vmIndex = 0;
function openVideoGallery(i = 0) { vmIndex = i; playVideo(vmIndex); buildVideoThumbs(); document.getElementById('video-modal').classList.add('active'); document.body.style.overflow = 'hidden'; }
function playVideo(i) {
  vmIndex = (i + chaiTeensVideos.length) % chaiTeensVideos.length;
  const v = chaiTeensVideos[vmIndex];
  document.getElementById('vm-title').textContent = 'Chai Teens — ' + v.label;
  document.getElementById('vm-source').src = v.src;
  const p = document.getElementById('vm-player'); p.load(); p.play();
  document.getElementById('vm-counter').textContent = (vmIndex + 1) + ' / ' + chaiTeensVideos.length;
  document.querySelectorAll('.vm-thumb').forEach((t, idx) => t.classList.toggle('active', idx === vmIndex));
}
function buildVideoThumbs() {
  const wrap = document.getElementById('vm-thumbs'); wrap.innerHTML = '';
  chaiTeensVideos.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.className = 'vm-thumb' + (i === 0 ? ' active' : ''); btn.textContent = v.label;
    btn.onclick = () => playVideo(i); wrap.appendChild(btn);
  });
}
function closeVideoModal() { document.getElementById('vm-player').pause(); document.getElementById('video-modal').classList.remove('active'); document.body.style.overflow = ''; }
document.getElementById('video-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeVideoModal(); });

/* INFO MODAL */
function openInfoModal() { const m = document.getElementById('info-modal'); m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
function closeInfoModal() { document.getElementById('info-modal').style.display = 'none'; document.body.style.overflow = ''; }
document.getElementById('info-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeInfoModal(); });

/* NEWSLETTER */
async function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target, btn = document.getElementById('newsletter-btn'), msg = document.getElementById('newsletter-msg');
  btn.textContent = 'Enviando...'; btn.disabled = true;
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    const data = await res.json();
    msg.textContent = (res.ok && data.success === 'true')
      ? '✓ Inscrição realizada! Obrigado por se juntar à nossa comunidade.'
      : 'Algo deu errado. Tente novamente ou entre em contato pelo WhatsApp.';
    if (res.ok && data.success === 'true') form.reset();
  } catch { msg.textContent = 'Erro de conexão. Tente novamente.'; }
  msg.style.display = 'block'; btn.textContent = 'Inscrever'; btn.disabled = false;
}
