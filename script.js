// robust, minimal script — drop into repo and ensure assets exist
document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enterBtn');
  const welcome = document.getElementById('welcome');
  const main = document.getElementById('main');
  const audio = document.getElementById('bgMusic');
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext ? canvas.getContext('2d') : null;

  // ===== songs: edit filenames to match your assets folder =====
  const songs = [
    'assets/song1.mp3' // add more like 'assets/song2.mp3'
  ];
  let current = 0;

  function playSong() {
    if (!songs.length) return;
    audio.src = songs[current];
    // try play, swallow promise rejection (browsers may block autoplay)
    audio.play().catch(err => {
      // not fatal — user clicked Enter which is a gesture; but some browsers still block
      console.warn('Audio play blocked or failed:', err);
    });
  }

  audio.addEventListener('ended', () => {
    current = (current + 1) % songs.length;
    playSong();
  });

  enterBtn.addEventListener('click', () => {
    // show main, hide welcome
    welcome.classList.remove('active');
    welcome.style.display = 'none';
    main.classList.add('active');
    main.style.display = 'block';
    // allow page scrolling
    document.body.style.overflow = 'auto';
    // start music
    playSong();
  });

  // ------- simple canvas starfield -------
  if (ctx) {
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const STAR_COUNT = Math.min(250, Math.floor(window.innerWidth * 0.08));
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.6 + Math.random() * 1.6,
        vx: -0.2 + Math.random() * 0.4,
        vy: 0.2 + Math.random() * 0.8,
        alpha: 0.2 + Math.random() * 0.9,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x += s.vx;
        s.y += s.vy;
        // loop back
        if (s.y > canvas.height + 10) s.y = -10;
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  } // end if ctx

}); // DOMContentLoaded
