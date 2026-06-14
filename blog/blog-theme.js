/**
 * blog-theme.js — Theme sync for blog pages
 * Reads rs-theme from localStorage (set by main portfolio index.html)
 * Applies data-theme to <html> and wires up the toggle button
 */
(function () {
  /* Apply saved theme immediately to prevent flash */
  var saved = localStorage.getItem('rs-theme') || 'human';
  document.documentElement.setAttribute('data-theme', saved);

  /* Update footer year dynamically */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.addEventListener('DOMContentLoaded', function () {
    var label = document.getElementById('btt-label');
    if (label) label.textContent = saved === 'ai' ? 'AI' : 'Human';
  });

  window.blogToggleTheme = function () {
    var html  = document.documentElement;
    var curr  = html.getAttribute('data-theme');
    var next  = curr === 'ai' ? 'human' : 'ai';
    html.setAttribute('data-theme', next);
    localStorage.setItem('rs-theme', next);
    var lbl = document.getElementById('btt-label');
    if (lbl) lbl.textContent = next === 'ai' ? 'AI' : 'Human';
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };
})();
