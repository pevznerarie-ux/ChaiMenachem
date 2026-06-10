/* ════════════════════════════════════════════════
   CHAI MENACHEM — Afficheur public des publications
   Lit les articles d'une catégorie (festa/evento/noticia)
   dans Supabase et les rend (texte + galerie de photos).
   ════════════════════════════════════════════════ */
import { supabase, isConfigured } from "./supabase-config.js";

function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function media(images){
  if (!images || !images.length) return "";
  var cover = '<a class="post-cover" href="' + esc(images[0]) + '" target="_blank" rel="noopener">' +
              '<img src="' + esc(images[0]) + '" alt="" loading="lazy"></a>';
  var rest = images.length > 1
    ? '<div class="post-thumbs">' + images.slice(1).map(function(u){
        return '<a href="' + esc(u) + '" target="_blank" rel="noopener"><img src="' + esc(u) + '" alt="" loading="lazy"></a>';
      }).join("") + '</div>'
    : "";
  return cover + rest;
}

function card(p){
  var images = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
  return '<article class="post">' + media(images) +
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
    const { data, error } = await supabase
      .from("posts").select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (!data || !data.length){ el.innerHTML = '<p class="feed-empty">Nenhuma publicação por enquanto.</p>'; return; }
    el.innerHTML = data.map(card).join("");
  } catch (e){
    console.error(e);
    el.innerHTML = '<p class="feed-empty">Não foi possível carregar as publicações.</p>';
  }
}
