// --- Welcome transition ---
const enterBtn = document.getElementById("enterBtn");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");
const music = document.getElementById("bgMusic");

// your music files
const songs = [
  "assets/song1.mp3",
  "assets/song2.mp3"
];
let current = 0;

enterBtn.addEventListener("click", () => {
  welcome.style.display = "none";
  main.style.display = "block";
  document.body.style.overflow = "auto";

  playSong();
});

music.addEventListener("ended", () => {
  current = (current + 1) % songs.length;
  playSong();
});

function playSong() {
  if (songs.length > 0) {
    music.src = songs[current];
    music.play().catch(err => console.log("Autoplay blocked:", err));
  }
}

// --- Stars animation ---
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    d: Math.random() * 1.5,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveStars();
}

let angle = 0;
function moveStars() {
  angle += 0.01;
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    s.y += Math.cos(angle + s.d) + 1 + s.r / 2;
    s.x += Math.sin(angle) * 0.5;
    if (s.y > canvas.height) {
      stars[i] = { x: Math.random() * canvas.width, y: 0, r: s.r, d: s.d };
    }
  }
}

setInterval(drawStars, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
