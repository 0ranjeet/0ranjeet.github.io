(function(){
  const html = document.documentElement;
  const saved = localStorage.getItem('rs-theme') || html.getAttribute('data-theme') || 'human';
  html.setAttribute('data-theme', saved);

  const label = document.getElementById('themeLabel');
  if (label) label.textContent = saved === 'ai' ? 'AI' : 'Human';

  window.toggleTheme = function(){
    const current = html.getAttribute('data-theme') || 'human';
    const next = current === 'ai' ? 'human' : 'ai';
    html.setAttribute('data-theme', next);
    localStorage.setItem('rs-theme', next);
    if (label) label.textContent = next === 'ai' ? 'AI' : 'Human';
  };

  window.toggleMenu = function(){
    const ham = document.getElementById('ham');
    const menu = document.getElementById('mmenu');
    if (ham) ham.classList.toggle('open');
    if (menu) menu.classList.toggle('open');
  };

  window.closeMenu = function(){
    const ham = document.getElementById('ham');
    const menu = document.getElementById('mmenu');
    if (ham) ham.classList.remove('open');
    if (menu) menu.classList.remove('open');
  };

  const scrollBar = document.getElementById('scroll-bar');
  if (scrollBar) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', updateProgress, {passive:true});
    updateProgress();
  }

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }, {passive:true});
    const animateCursor = () => { rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateCursor); };
    animateCursor();
    document.querySelectorAll('a,button,.card,.blog-card,.proj-card,.svc-card,.stat-card,.process-icon').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12}) : null;

  document.querySelectorAll('.fade-up').forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add('visible');
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let cur = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) cur = section.id;
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + cur) link.classList.add('active');
      });
    }, {passive:true});
  }
})();
