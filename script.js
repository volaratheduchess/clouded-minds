// ── AUDIO SETUP (shared across all pages) ──
const AUDIO_SRC = "Clouded-Minds.mp3";

// Reuse one Audio instance stored on window so navigation doesn't reset it
if (!window._cmAudio) {
  window._cmAudio = new Audio(AUDIO_SRC);
  window._cmAudio.loop = true;
  window._cmAudio.volume = 0.5;
}
const audio = window._cmAudio;

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const btn = document.getElementById("audio-btn");

  // ── LOADER ──
  document.body.classList.add("loading");
  setTimeout(() => loader.classList.add("fade-out"), 1000);
  setTimeout(() => {
    loader.style.display = "none";
    document.body.classList.remove("loading");
    content.style.display = "block";
    content.classList.add("show");
  }, 2200);

  // ── AUDIO BUTTON ──
  function syncBtn() {
    if (!btn) return;
    btn.textContent = audio.paused ? "♪" : "♬";
    btn.classList.toggle("playing", !audio.paused);
    btn.title = audio.paused ? "Play music" : "Pause music";
  }

  if (btn) {
    syncBtn();
    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      syncBtn();
    });
  }

  audio.addEventListener("play", syncBtn);
  audio.addEventListener("pause", syncBtn);
});