import React, { useState, useEffect } from 'react';

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Highlight active nav item
      const sections = ['home', 'about', 'resume', 'services', 'projects', 'blog', 'contact'];
      let currentSection = 'home';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && window.scrollY >= el.offsetTop - 120) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: '// home', id: 'home' },
    { href: '#about', label: '// about', id: 'about' },
    { href: '#resume', label: '// tech stack', id: 'resume' },
    { href: '#services', label: '// services', id: 'services' },
    { href: '#projects', label: '// projects', id: 'projects' },
    { href: '#blog', label: '// blog', id: 'blog' },
    { href: '#contact', label: '// contact', id: 'contact' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div 
        id="scroll-bar" 
        style={{ 
          width: `${scrollProgress}%`,
          height: '2px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9997,
          background: theme === 'ai' ? '#00ff00' : 'var(--gradient)',
          transition: theme === 'ai' ? 'none' : 'width 0.08s'
        }} 
      />

      <nav>
        <a href="#home" className="nav-logo">
          {theme === 'ai' ? 'RANJEET.SYS' : 'RANJEET SAHOO'}
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.id ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Theme Toggle Button */}
          <div className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-toggle-label" id="themeLabel">
              {theme === 'ai' ? 'AI' : 'Human'}
            </span>
            <div className="theme-toggle-track">
              <div className="theme-toggle-thumb" />
            </div>
          </div>

          <a href="Ranjeet_sahoo_resume.pdf" download="Ranjeet_Sahoo_Resume.pdf" className="nav-cv" id="navCvBtn">
            Download CV
          </a>

          {/* Hamburger Menu Icon */}
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mmenu">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a 
          href="Ranjeet_sahoo_resume.pdf" 
          download="Ranjeet_Sahoo_Resume.pdf" 
          style={{ 
            marginTop: '1rem', 
            border: '1px solid var(--accent)', 
            padding: '8px 24px', 
            borderRadius: '20px' 
          }}
          onClick={() => setMenuOpen(false)}
        >
          Download CV
        </a>
      </div>
    </>
  );
}
