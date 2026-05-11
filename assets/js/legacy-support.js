(function legacySupport() {
  var docEl = document.documentElement;

  function addClass(name) {
    if (docEl.className.indexOf(name) === -1) {
      docEl.className = (docEl.className ? docEl.className + ' ' : '') + name;
    }
  }

  function supportsBackdropFilter() {
    if (!window.CSS || !window.CSS.supports) return false;
    return CSS.supports('(backdrop-filter: blur(1px))') || CSS.supports('(-webkit-backdrop-filter: blur(1px))');
  }

  function supportsGrid() {
    if (!window.CSS || !window.CSS.supports) return false;
    return CSS.supports('display', 'grid');
  }

  if (!supportsBackdropFilter()) addClass('no-backdrop-filter');
  if (!supportsGrid()) addClass('no-css-grid');
  if (!('IntersectionObserver' in window)) addClass('no-intersection-observer');

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (window.Element && !Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
      var el = this;
      while (el && el.nodeType === 1) {
        if (el.matches(selector)) return el;
        el = el.parentElement || el.parentNode;
      }
      return null;
    };
  }

  if (docEl.className.indexOf('no-intersection-observer') !== -1) {
    var revealEls = document.querySelectorAll('.reveal');
    for (var i = 0; i < revealEls.length; i++) {
      revealEls[i].className += ' visible';
    }
  }
})();
