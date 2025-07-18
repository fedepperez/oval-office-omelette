// Elementi principali
const splashScreen = document.getElementById("splash-screen");
const gameContainer = document.getElementById("game-container");
const trump = document.getElementById("trump");
const splash = document.getElementById("splash");
const eggCounter = document.getElementById("egg-counter");
const eggMessage = document.getElementById("egg-message");
const bgm = document.getElementById("bgm");
const resetBtn = document.getElementById("reset-button");
const audioToggle = document.getElementById("audio-toggle");

let eggCount = 0;

// Avvio gioco
function startGame() {
  splashScreen.style.display = "none";
  gameContainer.style.display = "block";
  bgm.play().catch(e => console.warn("Audio bloccato:", e));

  // Posiziona il messaggio subito sotto Trump
  positionEggMessage();
}

// Riposiziona il messaggio se la finestra cambia dimensione
window.addEventListener("resize", () => {
  if (gameContainer.style.display !== "none") {
    positionEggMessage();
  }
});

function positionEggMessage() {
  const trumpRect = trump.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const newTop = trumpRect.bottom + scrollTop + window.innerHeight * 0.01;

  eggMessage.style.top = `${newTop}px`;
}

// Gestione click/touch sul gioco
function handleEgg(event) {
  if (splashScreen.style.display !== "none") return;

  const x = event.clientX || (event.touches && event.touches[0].clientX);
  const y = event.clientY || (event.touches && event.touches[0].clientY);
  if (!x || !y) return;

  // Splash visivo
  splash.style.left = `${x - 50}px`;
  splash.style.top = `${y - 50}px`;
  splash.style.opacity = 1;
  setTimeout(() => splash.style.opacity = 0, 400);

  // Contatore
  eggCount++;
  eggCounter.textContent = `Eggsecutive Order x${eggCount}`;

  // Se colpisce Trump
  const rect = trump.getBoundingClientRect();
  if (
    x >= rect.left && x <= rect.right &&
    y >= rect.top && y <= rect.bottom
  ) {
    eggMessage.style.opacity = 1;
    setTimeout(() => eggMessage.style.opacity = 0, 800);
  }
}

// Reset gioco
function resetGame() {
  eggCount = 0;
  eggCounter.textContent = `Eggsecutive Order x${eggCount}`;
  eggMessage.style.opacity = 0;
  splash.style.opacity = 0;

  gameContainer.style.display = "none";
  splashScreen.style.display = "flex";

  // Ferma del tutto l'audio
  bgm.pause();
  bgm.currentTime = 0;

  // 🔁 Reset della gif
  trump.src = "";
  trump.src = "trump.gif";
}

// Mute toggle (audio in sync)
function toggleAudio() {
  bgm.muted = !bgm.muted;
  audioToggle.textContent = bgm.muted ? "🔇" : "🎵";
}

// Eventi
splashScreen.addEventListener("click", startGame);
splashScreen.addEventListener("touchstart", startGame);
document.addEventListener("click", handleEgg);
document.addEventListener("touchstart", handleEgg);
resetBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  resetGame();
});
audioToggle.addEventListener("click", toggleAudio);
audioToggle.addEventListener("touchstart", (e) => {
  e.preventDefault();
  toggleAudio();
});
