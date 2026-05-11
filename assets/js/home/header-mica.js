(function headerMicaEffect() {
  var header = document.querySelector('header');
  if (!header) return;

  var bienvenidaSection = document.getElementById('bienvenida');
  var micaThreshold = bienvenidaSection ? bienvenidaSection.offsetTop - header.offsetHeight : 50;

  function updateThreshold() {
    micaThreshold = bienvenidaSection ? bienvenidaSection.offsetTop - header.offsetHeight : 50;
  }

  function toggleScrolled() {
    header.classList.toggle('scrolled', window.scrollY > micaThreshold);
  }

  window.addEventListener('resize', updateThreshold);
  window.addEventListener('scroll', toggleScrolled);
  toggleScrolled();
})();
