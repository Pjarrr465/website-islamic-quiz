/* =====================================================
   EFEK PERAYAAN
   1 bintang = tanpa efek | 2-3 = kertas warna | 4 = + kembang api | 5 = + hujan bintang
   ===================================================== */

const COLORS = ["#FC4100", "#FFD60A", "#FF6B9D", "#2BA8E0", "#2EC27E", "#9B5DE5"];
const random = (min, max) => min + Math.random() * (max - min);

// Tempel elemen ke halaman, lalu hapus otomatis setelah animasinya selesai
function addTemporary(node, ms) {
  document.body.appendChild(node);
  setTimeout(() => node.remove(), ms);
}

// Kertas warna (atau emoji) yang jatuh dari atas layar
function drop(total, emojis) {
  for (let i = 0; i < total; i++) {
    const piece = document.createElement("span");
    piece.className = emojis ? "confetti emoji" : "confetti";
    if (emojis) piece.textContent = emojis[i % emojis.length];
    else piece.style.background = COLORS[i % COLORS.length];
    piece.style.left = random(0, 100) + "vw";
    piece.style.setProperty("--drift", random(-100, 100) + "px");
    piece.style.animationDuration = random(2, 4) + "s";
    piece.style.animationDelay = random(0, 1.2) + "s";
    addTemporary(piece, 7000);
  }
}

// Satu letusan kembang api: titik-titik berwarna menyebar ke segala arah
function firework(x, y) {
  const color = COLORS[Math.floor(random(0, COLORS.length))];
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2;
    const distance = random(70, 130);
    const dot = document.createElement("span");
    dot.className = "spark";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    dot.style.background = color;
    dot.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    dot.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    addTemporary(dot, 1000);
  }
}

// Dipanggil dari app.js setelah jawaban diperiksa
function celebrate(stars) {
  drop(REACTIONS[stars].confetti);
  if (stars === 5) drop(24, ["⭐", "🌙", "✨"]);

  const fireworks = stars === 5 ? 7 : stars === 4 ? 3 : 0;
  for (let i = 0; i < fireworks; i++) {
    setTimeout(() => firework(random(80, innerWidth - 80), random(100, innerHeight * 0.6)), i * 350);
  }
}
