/* =====================================================
   POP-UP PEMBUKA
   Muncul saat ikon musik diklik pertama kali (lagu menyala bersamaan)
   Tutup lewat tombol, klik latar, atau tombol Esc
   ===================================================== */

const popup = document.getElementById("popup");
const music = document.getElementById("music");

// Klik pertama pada ikon speaker: tampilkan pop-up (song.js yang menyalakan lagunya)
document.getElementById("music-toggle").addEventListener("click", () => {
  popup.hidden = false;
  music.classList.remove("hint");
}, { once: true });

function closePopup() {
  if (popup.hidden) return;
  popup.classList.add("closing");
  setTimeout(() => popup.remove(), 250);
}

document.getElementById("popup-close").onclick = closePopup;
popup.onclick = (e) => { if (e.target === popup) closePopup(); };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });
