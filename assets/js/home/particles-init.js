(function initParticles() {
  if (typeof particlesJS !== 'function') return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: { enable: true, value_area: 800 }
      },
      color: { value: '#58a6ff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: {
        value: 4,
        random: true,
        anim: { enable: true, speed: 5, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#58a6ff',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: { opacity: 0.6 }
        }
      }
    },
    retina_detect: true
  });
})();
