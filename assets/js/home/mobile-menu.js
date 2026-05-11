(function initMobileMenu() {
  var h = document.querySelector('.hamburger');
  var m = document.getElementById('mobile-menu');
  if (!h || !m) return;

  function addSection(text, marginTop) {
    var section = document.createElement('div');
    section.className = 'mobile-menu-section';
    section.textContent = text.replace(/[▾▸]/g, '').trim();
    if (marginTop) section.style.marginTop = marginTop;
    m.appendChild(section);
  }

  function addLinkFromElement(a) {
    var c = a.cloneNode(true);
    c.className = 'mobile-menu-link';
    m.appendChild(c);
  }

  function addViewAllLink(href) {
    if (!href || href === '#') return;
    var link = document.createElement('a');
    link.className = 'mobile-menu-link';
    link.href = href;
    link.textContent = 'Ver todo';
    m.appendChild(link);
  }

  function closeMenu() {
    h.classList.remove('active');
    m.classList.remove('active');
    document.body.classList.remove('menu-open');
    h.setAttribute('aria-expanded', 'false');
  }

  var dropdowns = document.querySelectorAll('.nav-left > .nav-dropdown');
  for (var i = 0; i < dropdowns.length; i++) {
    var dd = dropdowns[i];
    var topLink = dd.getElementsByTagName('a')[0];
    if (!topLink) continue;

    addSection(topLink.textContent);
    addViewAllLink(topLink.getAttribute('href'));

    var menu = dd.querySelector('.dropdown-menu');
    if (!menu) continue;

    for (var childIndex = 0; childIndex < menu.children.length; childIndex++) {
      var child = menu.children[childIndex];
      if (child.tagName === 'A') {
        addLinkFromElement(child);
        continue;
      }

      if (child.className.indexOf('dropdown-submenu') !== -1) {
        var subTop = child.getElementsByTagName('a')[0];
        if (!subTop) continue;

        addSection(subTop.textContent, '.75rem');
        addViewAllLink(subTop.getAttribute('href'));

        var subMenu = child.querySelector('.dropdown-submenu-menu');
        if (!subMenu) continue;
        var subLinks = subMenu.getElementsByTagName('a');
        for (var s = 0; s < subLinks.length; s++) {
          addLinkFromElement(subLinks[s]);
        }
      }
    }
  }

  var nr = document.querySelector('.nav-right');
  if (nr) {
    addSection('Más');
    var rightLinks = nr.getElementsByTagName('a');
    for (var r = 0; r < rightLinks.length; r++) {
      addLinkFromElement(rightLinks[r]);
    }
  }

  h.addEventListener('click', function() {
    var willOpen = !m.classList.contains('active');
    h.classList.toggle('active');
    m.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    h.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });

  m.addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && m.classList.contains('active')) closeMenu();
  });
})();
