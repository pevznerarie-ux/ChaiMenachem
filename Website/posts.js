/* ════════════════════════════════════════════════
   CHAI MENACHEM — Liste publique des publications
   Chaque publication = une tuile (photo de couverture
   + titre) cliquable → ouvre post.html?id=…
   ════════════════════════════════════════════════ */
import { supabase, isConfigured } from "./supabase-config.js";

function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function tile(p){
  var imgs = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
  var cover = imgs.length
    ? '<span class="ptile-img"><img src="' + esc(imgs[0]) + '" alt="" loading="lazy"></span>'
    : '<span class="ptile-img ptile-img--empty"></span>';
  return '<a class="ptile" href="post.html?id=' + encodeURIComponent(p.id) + '">' + cover +
    '<span class="ptile-body">' +
      (p.date ? '<span class="post-date">' + esc(p.date) + "</span>" : "") +
      '<span class="ptile-title">' + esc(p.title) + "</span>" +
      (imgs.length > 1 ? '<span class="ptile-count">' + imgs.length + " fotos</span>" : "") +
    "</span></a>";
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
    el.innerHTML = data.map(tile).join("");
  } catch (e){
    console.error(e);
    el.innerHTML = '<p class="feed-empty">Não foi possível carregar as publicações.</p>';
  }
}
