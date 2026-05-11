(function revealOnScroll() {
  var items = document.querySelectorAll('.reveal');
  if (!items || !items.length) return;

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (var j = 0; j < items.length; j++) {
    observer.observe(items[j]);
  }
})();
