// ====== welcome -> main and music logic ======
const enterBtn = document.getElementById('enterBtn');
const welcome = document.getElementById('welcome');
const main = document.getElementById('main');
const audio = document.getElementById('bgMusic');

// Put your song filenames from /assets here.
// Add as many as you upload. Example: ["assets/song1.mp3","assets/song2.mp3"]
const songs = [
  "assets/song1.mp3"
];

// audio control: cycle through songs
let index = 0;
function playCurrent() {
  if (!songs || songs.length === 0) return;
  audio.src = songs[index];
  audio.play().catch(err => {
    // autoplay might be blocked until user interacts -> it's okay
    console.log('audio play blocked:', err);
  });
}
audio.addEventListener('ended', () => {
  index = (index + 1) % songs.length;
  playCurrent();
});

// Enter button behavior
enterBtn.addEventListener('click', () => {
  // hide welcome, show main
  welcome.classList.remove('active');
  welcome.style.display = 'none';
  main.classList.add('active');

  // allow page to scroll
  document.body.style.overflow = 'auto';

  // start music
  playCurrent();
});

// ====== stars background generator (like shooting/ drifting stars) ======
(function createStars() {
  const starsEl = document.createElement('div');
  starsEl.className = 'stars';
  document.body.appendChild(starsEl);
  const starCount = Math.min(200, Math.floor(window.innerWidth / 4)); // adaptive
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement('div');
    s.style.position = 'absolute';
    s.style.width = (Math.random() * 2 + 1) + 'px';
    s.style.height = s.style.width;
    s.style.borderRadius = '50%';
    s.style.background = 'rgba(255,255,255,' + (0.2 + Math.random()*0.8) + ')';
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.boxShadow = '0 0 ' + (2 + Math.random()*6) + 'px rgba(135,206,235,0.6)';
    const dur = 8 + Math.random() * 18;
    s.style.opacity = 0.85;
    s.style.transform = 'translateY(0)';
    s.style.transition = `transform ${dur}s linear, opacity ${dur}s linear`;
    starsEl.appendChild(s);

    // animate stars drifting down-right slowly (loop)
    (function animateStar(el, d) {
      const startTop = parseFloat(el.style.top);
      const startLeft = parseFloat(el.style.left);
      function step() {
        // move by small random amount then reset when off-screen
        let newTop = startTop + (10 + Math.random() * 40);
        let newLeft = startLeft + (10 + Math.random() * 40);
        el.style.transform = `translate(${newLeft - startLeft}px, ${newTop - startTop}px)`;
        el.style.opacity = 0.5 + Math.random()*0.5;
        setTimeout(() => {
          // reset position and repeat
          el.style.transform = 'translate(0,0)';
          el.style.opacity = 0.8;
          // randomize next start
          el.style.top = Math.random() * 100 + '%';
          el.style.left = Math.random() * 100 + '%';
          setTimeout(step, 100 + Math.random()*2000);
        }, d*1000);
      }
      setTimeout(step, Math.random()*2000);
    })(s, dur);
  }
})();
