/* ════════════════════════════════════════════════
   CHAI MENACHEM — Afficheur public des publications
   Lit les articles d'une catégorie (festa/evento/noticia)
   dans Firestore et les rend dans un conteneur.
   ════════════════════════════════════════════════ */
import { db, isConfigured } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function card(p){
  var media = p.image
    ? '<a class="post-media" href="' + esc(p.image) + '" target="_blank" rel="noopener"><img src="' + esc(p.image) + '" alt="" loading="lazy"></a>'
    : "";
  return '<article class="post">' + media +
    '<div class="post-body">' +
      (p.date ? '<span class="post-date">' + esc(p.date) + "</span>" : "") +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.body).replace(/\n/g, "<br>") + "</p>" +
    "</div></article>";
}

export async function renderFeed(category, containerId){
  var el = document.getElementById(containerId);
  if (!el) return;
  if (!isConfigured){ el.innerHTML = '<p class="feed-empty">Publicações em breve.</p>'; return; }
  el.innerHTML = '<p class="feed-empty">A carregar…</p>';
  try {
    var snap = await getDocs(query(collection(db, "posts"), where("category", "==", category)));
    var arr = snap.docs.map(function (d){ return d.data(); });
    arr.sort(function (a, b){
      return ((b.createdAt && b.createdAt.seconds) || 0) - ((a.createdAt && a.createdAt.seconds) || 0);
    });
    if (!arr.length){ el.innerHTML = '<p class="feed-empty">Nenhuma publicação por enquanto.</p>'; return; }
    el.innerHTML = arr.map(card).join("");
  } catch (e){
    console.error(e);
    el.innerHTML = '<p class="feed-empty">Não foi possível carregar as publicações.</p>';
  }
}
