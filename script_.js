let count = 0;
let isMuted = localStorage.getItem("muted") === "true";

// Load previous values
if (localStorage.getItem("count")) {
  count = parseInt(localStorage.getItem("count"));
}
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}

function playSound(id) {
  if (!isMuted) {
    const sound = document.getElementById(id);
    sound.currentTime = 0;
    sound.play();
  }
}

function updateDisplay() {
  const countDisplay = document.getElementById("count");
  countDisplay.textContent = count;
  countDisplay.style.color = count === 0 ? "#ccc" : "#00ffcc";
  countDisplay.style.transform = "scale(1.2)";
  setTimeout(() => {
    countDisplay.style.transform = "scale(1)";
  }, 200);

  localStorage.setItem("count", count);
}

function celebrate() {
  if ([10, 20, 30, 40, 50, 60, 70, 80, 90, 100].includes(count)) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function increment() {
  count++;
  playSound("sound-plus");
  updateDisplay();
  celebrate();
}

function decrement() {
  count--;
  playSound("sound-minus");
  updateDisplay();
}

function reset() {
  count = 0;
  playSound("sound-reset");
  updateDisplay();
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  playSound("sound-theme");
}

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("muted", isMuted);
  const muteBtn = document.getElementById("muteBtn");
  muteBtn.textContent = isMuted ? "🔇 Unmute" : "🔊 Mute";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("muteBtn").textContent = isMuted ? "🔇 Unmute" : "🔊 Mute";
  updateDisplay();
});
