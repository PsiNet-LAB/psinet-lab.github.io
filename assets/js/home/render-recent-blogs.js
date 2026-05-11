(function renderRecentBlogs() {
  var grid = document.getElementById('blog-grid');
  if (!grid || typeof BLOG_ENTRIES === 'undefined') return;

  var entries = BLOG_ENTRIES.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 3);

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var hasLink = entry.url && entry.url !== '#';
    var wrapper = document.createElement(hasLink ? 'a' : 'div');
    wrapper.className = 'blog-card reveal';
    if (hasLink) wrapper.href = entry.url;
    if (i > 0) wrapper.style.transitionDelay = (i * 0.1) + 's';

    var imgContent = entry.image
      ? '<img src="' + entry.image + '" alt="' + entry.title + '">'
      : entry.emoji;

    wrapper.innerHTML =
      '<div class="blog-card-img">' + imgContent + '</div>' +
      '<div class="blog-card-body">' +
        '<span class="blog-tag">' + entry.tag + '</span>' +
        '<h3>' + entry.title + '</h3>' +
        '<p>' + entry.excerpt + '</p>' +
      '</div>';

    grid.appendChild(wrapper);
  }
})();
