function enterSite() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.body.style.overflow = "auto";

  // Start background music
  const songs = [
    "assets/song1.mp3",
    "assets/song2.mp3"
  ];
  const audio = document.getElementById("bgMusic");
  let current = 0;

  audio.src = songs[current];
  audio.play().catch(() => alert("Click again to allow music 🎧"));

  audio.addEventListener("ended", () => {
    current = (current + 1) % songs.length;
    audio.src = songs[current];
    audio.play();
  });
}
