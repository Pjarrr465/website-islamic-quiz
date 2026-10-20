/* Kontrol musik: nyala/mati, volume, dan ukuran pemutar. */

const audio = document.getElementById("bgm");
const box = document.getElementById("music");
const playSong = () => audio.play().catch(() => {});

document.getElementById("music-toggle").onclick = () => (audio.paused ? playSong() : audio.pause());
document.getElementById("music-vol").oninput = (e) => (audio.volume = e.target.value);

document.getElementById("music-min").onclick = document.getElementById("music-expand").onclick =
  () => box.classList.toggle("is-min");

audio.onplay = audio.onpause = () => box.classList.toggle("is-off", audio.paused);

audio.volume = 0.5;
