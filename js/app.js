/* =====================================================
   LOGIKA APLIKASI (login, level, skor, bintang)
   Soal: data.js | Hewan: sprites.js | Efek: effects.js | Musik: song.js
   ===================================================== */

const state = {
  user: null,     // username yang sedang login
  best: {},       // nilai terbaik tiap level (jumlah benar), contoh { 1: 8, 2: 6 }
  level: null,    // level yang sedang dikerjakan
  answers: {},    // jawaban siswa: { idSoal: nomorPilihan }
  order: {},      // urutan pilihan yang diacak: { idSoal: [2, 0, 3, 1] }
  graded: false   // sudah diperiksa atau belum
};

const $ = (id) => document.getElementById(id);

/* ---------- Rumus: bintang, level terbuka, poin ---------- */
// Jumlah benar -> bintang 1 sampai 5
function toStars(correct, total) {
  return Math.max(1, Math.round(correct / total * 5));
}
function starsOf(level) {
  const correct = state.best[level.id];
  return correct === undefined ? 0 : toStars(correct, level.questions.length);
}
function isDone(level) {
  return starsOf(level) >= SETTINGS.passStars;
}
function isUnlocked(level) {
  return level.id === 1 || isDone(LEVELS[level.id - 2]);   // level sebelumnya harus lulus
}
function totalScore() {
  let sum = 0;
  Object.values(state.best).forEach((correct) => { sum += correct * SETTINGS.pointsPerCorrect; });
  return sum;
}

/* ---------- Penyimpanan akun & progres (di browser) ---------- */
function readUsers() {
  try { return JSON.parse(localStorage.getItem(SETTINGS.usersKey)) || {}; }
  catch (e) { return {}; }
}
function writeUsers(users) {
  localStorage.setItem(SETTINGS.usersKey, JSON.stringify(users));
}
function save() {
  const users = readUsers();
  users[state.user].progress = { best: state.best };
  writeUsers(users);
}

/* ---------- Password: diacak (hash) supaya tidak tersimpan apa adanya ---------- */
const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
const randomSalt = () => toHex(crypto.getRandomValues(new Uint8Array(16)));
async function hashPassword(password, salt) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + password));
  return toHex(new Uint8Array(buffer));
}

/* ---------- Helper kecil ---------- */
// Buat elemen HTML: el("p", "kelas", "isi teks")
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Urutan acak 0..n-1, dipakai untuk mengacak pilihan jawaban
function shuffled(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function stars(count) {            // 3 -> "★★★☆☆"
  return "★".repeat(count) + "☆".repeat(5 - count);
}

let toastTimer;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
}

// Tampilkan satu layar saja: "welcome", "auth", "map", atau "quiz"
function showScreen(name) {
  ["welcome", "auth", "map", "quiz"].forEach((n) => { $("screen-" + n).hidden = n !== name; });
  scrollTo({ top: 0 });
}

/* ---------- Hiasan: bulan, bintang, dan hewan yang berjalan ---------- */
function buildDecorations() {
  $("brand-moon").appendChild(makeSprite("bulan"));

  // bintang berkelip di header
  ["34%", "38%", "42%", "46%"].forEach((left, i) => {
    const star = makeSprite("bintang");
    star.style.left = left;
    star.style.top = (i % 2 ? 12 : 55) + "%";
    star.style.animationDelay = (i * 0.4) + "s";
    $("sky").appendChild(star);
  });

  // hewan berjalan dari kiri ke kanan, terus berulang
  ["kucing", "kambing", "sapi", "unta"].forEach((name, i) => {
    const walker = el("div", "walker");
    walker.style.animationDuration = (20 + i * 4) + "s";
    walker.style.animationDelay = (-i * 6) + "s";      // minus = langsung tersebar di layar
    walker.appendChild(makeSprite(name));
    $("parade").appendChild(walker);
  });
}

/* ---------- Header ---------- */
function renderHeader() {
  const done = LEVELS.filter(isDone).length;
  $("score").textContent = totalScore().toLocaleString("id-ID");
  $("progress-label").textContent = done + " / " + LEVELS.length + " level";
  $("progress-fill").style.width = (done / LEVELS.length * 100) + "%";
}

/* ---------- Layar daftar level ---------- */
function renderMap() {
  const grid = $("level-grid");
  grid.innerHTML = "";
  let lastTopic = "";

  LEVELS.forEach((level) => {
    // judul kelompok (Akhlak / Akidah / Sejarah Nabi) muncul sekali saja
    if (level.topic !== lastTopic) {
      grid.appendChild(el("h3", "topic-title", level.topic));
      lastTopic = level.topic;
    }

    const open = isUnlocked(level);
    const card = el("button", "level-card" + (isDone(level) ? " done" : ""));
    card.type = "button";
    card.disabled = !open;
    card.style.setProperty("--lv", level.color);
    card.addEventListener("click", () => startLevel(level));

    card.appendChild(el("span", "level-icon", level.icon));
    card.appendChild(el("span", "level-no", "Level " + level.id));
    card.appendChild(el("h3", "", level.topic));
    card.appendChild(el("span", "tag " + level.difficulty.toLowerCase(), level.difficulty));
    card.appendChild(el("p", "", level.description));
    card.appendChild(el("span", "level-stars", stars(starsOf(level))));
    card.appendChild(el("span", "level-status", open ? "Mulai →" : "Terkunci 🔒"));
    grid.appendChild(card);
  });

  $("finish-banner").hidden = !LEVELS.every(isDone);
  renderHeader();
}

/* ---------- Layar soal ---------- */
function startLevel(level) {
  state.level = level;
  state.answers = {};
  state.graded = false;
  state.order = {};
  level.questions.forEach((q) => { state.order[q.id] = shuffled(q.options.length); });

  $("quiz-title").textContent = "Level " + level.id + " · " + level.topic + " (" + level.difficulty + ")";
  $("quiz-sub").textContent = "Jawab semua soal, lalu tekan \"Periksa jawaban\"";

  renderQuestions();
  $("result").hidden = true;
  $("btn-submit").hidden = false;
  $("btn-retry").hidden = true;
  $("btn-next").hidden = true;
  showScreen("quiz");
}

function renderQuestions() {
  const wrap = $("questions");
  wrap.innerHTML = "";

  state.level.questions.forEach((q, number) => {
    const chosen = state.answers[q.id];
    const isCorrect = chosen === q.answer;

    const box = el("div", "card question" + (state.graded ? (isCorrect ? " correct" : " incorrect") : ""));
    const title = el("h3");
    title.appendChild(el("span", "num", number + 1));
    title.appendChild(el("span", "prompt", q.prompt));
    box.appendChild(title);

    const list = el("div", "options");
    state.order[q.id].forEach((optionIndex, position) => {
      let cls = "option";
      if (state.graded && optionIndex === q.answer) cls += " is-right";
      else if (state.graded && optionIndex === chosen) cls += " is-wrong";
      else if (optionIndex === chosen) cls += " selected";

      const btn = el("button", cls);
      btn.type = "button";
      btn.disabled = state.graded;
      btn.appendChild(el("span", "letter", String.fromCharCode(65 + position)));
      btn.appendChild(el("span", "", q.options[optionIndex]));

      btn.addEventListener("click", () => {
        state.answers[q.id] = optionIndex;
        list.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      list.appendChild(btn);
    });
    box.appendChild(list);

    if (state.graded) {
      const info = el("div", "explain");
      info.appendChild(el("strong", "", chosen === undefined ? "Belum dijawab. " : isCorrect ? "Benar! " : "Kurang tepat. "));
      info.appendChild(document.createTextNode(q.explain));
      box.appendChild(info);
    }
    wrap.appendChild(box);
  });
}

function submitLevel() {
  const level = state.level;
  const total = level.questions.length;
  const unanswered = level.questions.filter((q) => state.answers[q.id] === undefined).length;
  if (unanswered > 0 && !confirm(unanswered + " soal belum dijawab. Tetap periksa jawaban?")) return;

  state.graded = true;
  const correct = level.questions.filter((q) => state.answers[q.id] === q.answer).length;
  const starCount = toStars(correct, total);

  // simpan hanya jika lebih baik dari nilai sebelumnya
  const before = state.best[level.id] || 0;
  const gained = Math.max(0, correct - before) * SETTINGS.pointsPerCorrect;
  if (correct > before) state.best[level.id] = correct;
  save();
  renderHeader();
  renderQuestions();

  showResult(correct, total, starCount, gained);
  celebrate(starCount);
}

function showResult(correct, total, starCount, gained) {
  const reaction = REACTIONS[starCount];

  // hewan maskot ikut bereaksi (makin tinggi bintang, makin heboh)
  const animals = ["kucing", "kambing", "sapi", "unta"];
  $("result-mascot").innerHTML = "";
  $("result-mascot").className = "mascot mood-" + starCount;
  $("result-mascot").appendChild(makeSprite(animals[Math.floor(Math.random() * animals.length)]));

  // bintang muncul satu per satu
  const row = $("result-stars");
  row.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = el("span", "star" + (i <= starCount ? " on" : ""), "★");
    star.style.setProperty("--i", i);
    row.appendChild(star);
  }

  $("result-title").textContent = reaction.title + " " + starCount + "/5";
  $("result-text").textContent = reaction.text;
  $("result-count").textContent = correct + " dari " + total + " soal benar";
  $("result-note").textContent = starCount >= SETTINGS.passStars
    ? "Level lulus! " + (gained ? "+" + gained + " poin" : "Level berikutnya sudah terbuka.")
    : "Dapatkan minimal " + SETTINGS.passStars + " bintang untuk membuka level berikutnya.";

  $("result").className = "card result " + (starCount >= SETTINGS.passStars ? "pass" : "fail");
  $("result").hidden = false;
  $("btn-submit").hidden = true;
  $("btn-retry").hidden = false;
  $("btn-next").hidden = false;
  $("result").scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetProgress() {
  if (!confirm("Hapus semua progres dan poin untuk akun ini?")) return;
  state.best = {};
  save();
  showScreen("map");
  renderMap();
  showToast("Progres dihapus");
}

/* ---------- Masuk, daftar, keluar ---------- */
function showError(id, message) {
  $(id).textContent = message;
  $(id).hidden = !message;
}

function switchTab(mode) {
  const isLogin = mode === "login";
  $("tab-login").classList.toggle("active", isLogin);
  $("tab-signup").classList.toggle("active", !isLogin);
  $("form-login").hidden = !isLogin;
  $("form-signup").hidden = isLogin;
  $("auth-title").textContent = isLogin ? "Masuk ke Kuis Islami" : "Buat Akun Baru";
  showError("login-error", "");
  showError("signup-error", "");
}

function enterApp(username) {
  const user = readUsers()[username];
  state.user = username;
  state.best = (user.progress && user.progress.best) || {};
  localStorage.setItem(SETTINGS.sessionKey, username);

  $("user-name").textContent = user.name;
  $("hero-title").textContent = "Assalamualaikum, " + user.name.split(" ")[0] + "! Pilih level untuk mulai";
  $("stats").hidden = false;
  $("btn-reset").hidden = false;
  showScreen("map");
  renderMap();
}

function logout() {
  state.user = null;
  localStorage.removeItem(SETTINGS.sessionKey);
  $("stats").hidden = true;
  $("btn-reset").hidden = true;
  $("form-login").reset();
  $("form-signup").reset();
  showScreen("welcome");
  showToast("Kamu sudah keluar");
}

async function handleLogin(event) {
  event.preventDefault();
  const username = $("login-username").value.trim().toLowerCase();
  const password = $("login-password").value;
  const user = readUsers()[username];

  // pesan sama untuk username salah maupun password salah
  const failMessage = "Username atau password salah.";
  if (!user) return showError("login-error", failMessage);
  if (await hashPassword(password, user.salt) !== user.hash) return showError("login-error", failMessage);

  showError("login-error", "");
  enterApp(username);
}

async function handleSignup(event) {
  event.preventDefault();
  const name = $("signup-name").value.trim();
  const username = $("signup-username").value.trim().toLowerCase();
  const password = $("signup-password").value;
  const users = readUsers();

  if (name.length < 2) return showError("signup-error", "Nama lengkap minimal 2 karakter.");
  if (!/^[a-z0-9_]{3,20}$/.test(username)) return showError("signup-error", "Username 3-20 karakter: huruf kecil, angka, atau _.");
  if (users[username]) return showError("signup-error", "Username sudah dipakai, pilih yang lain.");
  if (password.length < 6) return showError("signup-error", "Password minimal 6 karakter.");
  if (password !== $("signup-password2").value) return showError("signup-error", "Konfirmasi password tidak sama.");

  const salt = randomSalt();
  users[username] = { name: name, salt: salt, hash: await hashPassword(password, salt), progress: { best: {} } };
  writeUsers(users);
  showToast("Akun berhasil dibuat");
  enterApp(username);
}

/* ---------- Layar pembuka ---------- */
// Setiap huruf dibungkus <span> supaya bisa diberi warna sendiri dan melompat bergantian (CSS)
let letterNo = 0;
function rainbow(id) {
  const el = $(id);
  el.innerHTML = el.textContent.split(" ").map((word) =>
    '<span class="word">' + [...word].map((ch) =>
      `<span style="--c:${COLORS[letterNo % COLORS.length]};--i:${letterNo++}">${ch}</span>`).join("") + "</span>"
  ).join(" ");
}
rainbow("welcome-title");

const openAuth = (mode) => { switchTab(mode); showScreen("auth"); };
$("go-login").addEventListener("click", () => openAuth("login"));
$("go-signup").addEventListener("click", () => openAuth("signup"));
$("btn-welcome").addEventListener("click", () => showScreen("welcome"));

/* ---------- Mulai ---------- */
$("tab-login").addEventListener("click", () => switchTab("login"));
$("tab-signup").addEventListener("click", () => switchTab("signup"));
$("form-login").addEventListener("submit", handleLogin);
$("form-signup").addEventListener("submit", handleSignup);
$("btn-logout").addEventListener("click", logout);
const backToMap = () => { showScreen("map"); renderMap(); };
$("btn-back").addEventListener("click", backToMap);
$("btn-next").addEventListener("click", backToMap);
$("btn-submit").addEventListener("click", submitLevel);
$("btn-retry").addEventListener("click", () => startLevel(state.level));
$("btn-reset").addEventListener("click", resetProgress);

buildDecorations();

// Jika masih ada sesi login, langsung masuk
const savedUser = localStorage.getItem(SETTINGS.sessionKey);
if (savedUser && readUsers()[savedUser]) enterApp(savedUser);
else showScreen("welcome");
