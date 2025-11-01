document.getElementById("enterBtn").addEventListener("click", function() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.body.style.overflow = "auto";

  // Music setup
  const songs = [
    "assets/song1.mp3",
    "assets/song2.mp3"
  ];
  const music = document.getElementById("bgMusic");
  let index = 0;

  music.src = songs[index];
  music.play().catch(() => alert("Click again to allow music 🎧"));

  music.addEventListener("ended", () => {
    index = (index + 1) % songs.length;
    music.src = songs[index];
    music.play();
  });
});
