const MEDIA_INDEX = "media-index.json";
const mediaGrid = document.getElementById("media-grid");
const mediaCount = document.getElementById("media-count");
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function safeText(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));
}
function mediaTitle(file) {
  return file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
function renderMedia(items) {
  mediaGrid.innerHTML = "";
  if (!items.length) {
    mediaCount.textContent = "0 FILES / ARCHIVE READY";
    mediaGrid.innerHTML = `<div class="empty-media"><span class="empty-icon">＋</span><h3>THE ARCHIVE IS WAITING</h3><p>Add screenshots or videos to the <code>media/</code> folder in your GitHub repository, commit the files, and the archive will update automatically.</p></div>`;
    return;
  }
  mediaCount.textContent = `${String(items.length).padStart(2,"0")} FILE${items.length === 1 ? "" : "S"} / ARCHIVE ONLINE`;
  items.forEach(item => {
    const url = item.url || item.path;
    const title = item.title || mediaTitle(item.name || url.split("/").pop());
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
    const figure = document.createElement("figure");
    figure.className = "media-item";
    const media = isVideo
      ? `<video controls preload="metadata" playsinline src="${safeText(url)}"></video>`
      : `<a href="${safeText(url)}" target="_blank" rel="noopener"><img loading="lazy" src="${safeText(url)}" alt="${safeText(title)}"></a>`;
    figure.innerHTML = `${media}<figcaption><span class="media-type">${isVideo ? "VIDEO CLIP" : "SCREENSHOT"}</span>${safeText(title)}</figcaption>`;
    mediaGrid.appendChild(figure);
  });
}
fetch(MEDIA_INDEX, {cache:"no-store"})
  .then(response => { if (!response.ok) throw new Error("No media index yet"); return response.json(); })
  .then(data => renderMedia(Array.isArray(data) ? data : []))
  .catch(() => renderMedia([]));
