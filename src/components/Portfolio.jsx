import React, { useState, useEffect } from 'react';

export default function Portfolio({ theme }) {
  // Active tab in Tech Stack section
  const [activeTab, setActiveTab] = useState('frontend');
  
  // Custom cursor state (for desktop)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterStrings = [
    'Business Systems Architect',
    'ERP Consultant',
    'AI Automation Consultant',
    'Digital Transformation Specialist',
    'Custom ERP Developer',
    'Business Process Optimizer'
  ];
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // 1. Custom Cursor Follower logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animId;
    const updateRing = () => {
      setRingPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.14,
          y: prev.y + dy * 0.14
        };
      });
      animId = requestAnimationFrame(updateRing);
    };
    updateRing();
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  // Add hover effect listeners to cursor
  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const interactiveElements = document.querySelectorAll(
      'a, button, .tech-card, .proj-card, .svc-card, .blog-card, .stat-card, .process-icon, .theme-toggle'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // 2. Typewriter subtitle logic
  useEffect(() => {
    let timer;
    const currentFullString = typewriterStrings[stringIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(currentFullString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentFullString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIndex === currentFullString.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % typewriterStrings.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  // 3. Structured WhatsApp Message Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formattedText = `Hi Ranjeet,\n\nMy name is *${name}* (${email}).\n*Subject*: ${subject || 'Inquiry'}\n\n*Message*:\n${message}`;
    const encodedText = encodeURIComponent(formattedText);
    const waUrl = `https://wa.me/918917412728?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Skills config
  const skills = [
    { name: 'Frontend Development', pct: 85 },
    { name: 'Backend Development', pct: 78 },
    { name: 'DSA & Problem Solving', pct: 72 },
    { name: 'Communication & Collaboration', pct: 90 },
    { name: 'AI / Prompt Engineering', pct: 82 }
  ];

  // Tech stack config
  const techStack = {
    frontend: {
      title: 'Frontend',
      desc: 'UI, frameworks & styling',
      icon: '🎨',
      items: [
        { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
        { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
        { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Redux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
        { name: 'Sass', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' }
      ]
    },
    backend: {
      title: 'Backend',
      desc: 'Servers, APIs & runtime',
      icon: '⚙️',
      items: [
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' }
      ]
    },
    databases: {
      title: 'Databases',
      desc: 'Storage & caching',
      icon: '🗄️',
      items: [
        { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
      ]
    },
    ai: {
      title: 'AI & LLM Tools',
      desc: 'Models, assistants & generative AI',
      icon: '🤖',
      items: [
        { name: 'ChatGPT', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg', filter: 'invert(1) sepia(1) saturate(5) hue-rotate(100deg)' },
        { name: 'Claude', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/anthropic.svg', filter: 'invert(60%) sepia(90%) saturate(400%) hue-rotate(230deg)' },
        { name: 'Gemini', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlegemini.svg', filter: 'invert(50%) sepia(90%) saturate(500%) hue-rotate(190deg)' },
        { name: 'Copilot', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg', filter: 'invert(70%) sepia(50%) saturate(600%) hue-rotate(200deg)' },
        { name: 'Perplexity', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/perplexity.svg', filter: 'invert(60%) sepia(80%) saturate(400%) hue-rotate(160deg)' },
        { name: 'HuggingFace', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/huggingface.svg', filter: 'sepia(1) saturate(3) hue-rotate(5deg)' },
        { name: 'Cursor AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
      ]
    },
    devops: {
      title: 'DevOps & Tools',
      desc: 'Version control & deployment',
      icon: '🛠️',
      items: [
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
      ]
    }
  };

  // Services offerings
  const servicesList = [
    { title: 'Fullstack Web Development', desc: 'End-to-end web applications built from scratch — fast, scalable, and production-ready. Covers everything from the user interface to the server, database, and deployment.', tags: ['Web App', 'React', 'Node.js', 'REST API'], iconPath: <polyline points="16,18 22,12 16,6" /> },
    { title: 'Business Website & Landing Pages', desc: 'Professional websites that convert visitors into customers. Clean design, mobile-first, fast loading, and built to rank on Google. Perfect for local businesses, service providers, and startups.', tags: ['Business Site', 'Landing Page', 'Mobile-First', 'Fast Load'], iconPath: <rect x="2" y="3" width="20" height="14" rx="2" /> },
    { title: 'SEO & Search Visibility', desc: 'Get found on Google by people already looking for what you offer. On-page SEO, technical fixes, content structure, local SEO, and keyword strategy — so the right people find you first.', tags: ['On-page SEO', 'Local SEO', 'Keywords', 'Rankings'], iconPath: <circle cx="11" cy="11" r="8" /> },
    { title: 'Branding & Digital Identity', desc: 'Logo, colour palette, typography, and brand guidelines — giving your business a consistent, professional identity across your website, social media, and every customer touchpoint.', tags: ['Logo Design', 'Brand Guide', 'Identity', 'Visual System'], iconPath: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
    { title: 'AI & Automation', desc: 'Add AI to your existing business — smart chatbots, automated replies, content generation, intelligent dashboards. Save hours of manual work every week without hiring more people.', tags: ['AI Chatbot', 'Automation', 'OpenAI', 'Workflows'], iconPath: <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 010 2h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 010-2h1a7 7 0 017-7h1V5.73A2 2 0 0110 4a2 2 0 012-2z" /> },
    { title: 'Business Operations Software', desc: 'Custom internal tools, ERP systems, booking platforms, inventory management, and dashboards — built to match exactly how your business works, not a generic off-the-shelf product.', tags: ['ERP', 'Booking', 'Inventory', 'Dashboard'], iconPath: <rect x="3" y="3" width="18" height="18" rx="2" /> }
  ];

  // Process list
  const processSteps = [
    { num: '01', title: 'Discovery Call', desc: '30-min free call. Understand goals, pain points, budget & timeline.', iconPath: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /> },
    { num: '02', title: 'Scope & Proposal', desc: 'Every feature, milestone & deliverable in a clear written proposal.', iconPath: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /> },
    { num: '03', title: 'UI/UX Design', desc: 'Figma wireframes approved before a single line of code is written.', iconPath: <rect x="3" y="3" width="18" height="18" rx="2" /> },
    { num: '04', title: 'Development', desc: 'Sprint-based builds with weekly updates. Clean, documented code.', iconPath: <polyline points="16,18 22,12 16,6" /> },
    { num: '05', title: 'Testing & QA', desc: 'Every feature tested cross-device. UAT session included.', iconPath: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { num: '06', title: 'Deploy & Support', desc: 'Deployment on Vercel/AWS. 30-day post-launch support included.', iconPath: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> }
  ];

  // Projects list
  const projectsList = [
    { title: 'AI Productivity Tool', badge: 'AI SaaS', desc: 'A smart AI-powered productivity assistant that automates repetitive tasks, generates content, and provides intelligent suggestions. Built with LLM backend, real-time API integration, and a clean React dashboard.', tags: ['React', 'Node.js', 'OpenAI API', 'REST API'], icon: <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 010 2h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 010-2h1a7 7 0 017-7h1V5.73A2 2 0 0110 4a2 2 0 012-2z" /> },
    { title: 'Hotel ERP System', badge: 'ERP Enterprise', desc: 'Full-scale Hotel ERP covering front desk, room & housekeeping, restaurant billing, inventory, staff scheduling, and financial reporting with multi-branch support and RBAC.', tags: ['React', 'Node.js', 'MySQL', 'RBAC', 'Dashboard'], icon: <path d="M3 22V8a1 1 0 011-1h16a1 1 0 011 1v14" /> },
    { title: 'Service Desk Platform', badge: 'SaaS ITSM', desc: 'ITSM-grade service desk with ticket lifecycle, SLA tracking, priority queues, auto-assignment, real-time notifications, knowledge base & analytics.', tags: ['React', 'Node.js', 'WebSocket', 'SLA', 'Analytics'], icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /> },
    { title: 'Manufacturing ERP System', badge: 'ERP Enterprise', desc: 'End-to-end manufacturing ERP with production planning, BOM management, shop floor tracking, quality control, and complete financial integration for discrete manufacturers.', tags: ['Java', 'Spring Boot', 'MySQL', 'RBAC', 'Reports'], icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> }
  ];

  // All 10 blog posts configuration
  const blogsList = [
    {
      title: 'AI Agents for Small Businesses',
      cat: 'AI & Automation',
      date: 'June 2026',
      read: '6 min read',
      excerpt: 'AI agents are no longer just for big tech. Small businesses can use them to handle customer support, scheduling, and follow-ups automatically.',
      link: 'blog/ai-agents-for-small-businesses.html',
      gradient: 'linear-gradient(135deg,rgba(0,200,255,0.1),rgba(123,47,255,0.07))',
      svg: <circle cx="12" cy="12" r="10" />
    },
    {
      title: 'How AI Can Reduce Administrative Costs',
      cat: 'AI & Automation',
      date: 'May 2026',
      read: '7 min read',
      excerpt: 'Administrative work eats profit. From invoicing to follow-ups, AI tools can cut manual hours and shrink overhead without hiring more people.',
      link: 'blog/ai-reduce-administrative-costs.html',
      gradient: 'linear-gradient(135deg,rgba(52,211,153,0.1),rgba(16,185,129,0.06))',
      svg: <rect x="2" y="3" width="20" height="14" rx="2" />
    },
    {
      title: 'Building a Digital-First Business',
      cat: 'Digital Strategy',
      date: 'May 2026',
      read: '8 min read',
      excerpt: "Going digital isn't just a website anymore. It means designing operations, customer experience, and workflows around technology from day one.",
      link: 'blog/building-digital-first-business.html',
      gradient: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.06))',
      svg: <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
    },
    {
      title: 'Business Automation Roadmap for SMEs',
      cat: 'Automation Roadmap',
      date: 'April 2026',
      read: '9 min read',
      excerpt: 'A step-by-step roadmap to move your business from manual chaos to automated operations - without disrupting daily work or breaking the budget.',
      link: 'blog/business-automation-roadmap-smes.html',
      gradient: 'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(244,114,182,0.07))',
      svg: <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    },
    {
      title: 'Cost of Not Having an ERP System',
      cat: 'ERP Solutions',
      date: 'March 2026',
      read: '7 min read',
      excerpt: "Duplicate work, lost orders, stock errors, and slow reporting - the hidden costs of running without an ERP add up fast. Here's how to calculate yours.",
      link: 'blog/cost-not-having-erp-system.html',
      gradient: 'linear-gradient(135deg,rgba(244,114,182,0.1),rgba(251,113,133,0.06))',
      svg: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    },
    {
      title: 'ERP vs Excel: When Should a Business Upgrade?',
      cat: 'Systems Upgrade',
      date: 'Feb 2026',
      read: '6 min read',
      excerpt: "Excel works until it doesn't. Learn the exact signs that mean your business has outgrown spreadsheets and is ready for a real ERP system.",
      link: 'blog/erp-vs-excel-business-upgrade.html',
      gradient: 'linear-gradient(135deg,rgba(26,139,107,0.1),rgba(52,211,153,0.06))',
      svg: <rect x="3" y="3" width="18" height="18" rx="2" />
    },
    {
      title: 'How Hotels Can Automate Operations',
      cat: 'Hospitality Automation',
      date: 'Jan 2026',
      read: '8 min read',
      excerpt: "From check-in to housekeeping to billing, hotel operations have dozens of repetitive touchpoints. Here's how automation reduces friction, errors, and wait times.",
      link: 'blog/how-hotels-automate-operations.html',
      gradient: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(123,47,255,0.05))',
      svg: <path d="M3 22V8a1 1 0 011-1h16a1 1 0 011 1v14" />
    },
    {
      title: 'Common Process Bottlenecks in Manufacturing',
      cat: 'Manufacturing ERP',
      date: 'Dec 2025',
      read: '9 min read',
      excerpt: 'A single slow step can stall an entire production line. How to spot bottlenecks early, measure their impact, and fix them with data.',
      link: 'blog/process-bottlenecks-manufacturing.html',
      gradient: 'linear-gradient(135deg,rgba(0,200,255,0.1),rgba(52,211,153,0.05))',
      svg: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    },
    {
      title: 'Sustainable Business Growth Through Technology',
      cat: 'Business Strategy',
      date: 'Nov 2025',
      read: '7 min read',
      excerpt: 'Growth that lasts depends on systems, not luck. How the right technology investments create predictable, scalable, and sustainable business expansion.',
      link: 'blog/sustainable-business-growth-technology.html',
      gradient: 'linear-gradient(135deg,rgba(139,53,200,0.1),rgba(26,139,107,0.05))',
      svg: <path d="M12 2v20M17 5H9.5" />
    },
    {
      title: 'Why Most SMEs Fail to Scale Their Operations',
      cat: 'Operations Strategy',
      date: 'Oct 2025',
      read: '8 min read',
      excerpt: "Most growing businesses hit the same ceiling - broken processes, scattered data, and teams that can't keep up. Discover why scaling fails and what to fix first.",
      link: 'blog/why-smes-fail-scale-operations.html',
      gradient: 'linear-gradient(135deg,rgba(212,99,26,0.1),rgba(139,53,200,0.05))',
      svg: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    }
  ];

  return (
    <div id="content-wrap" className="content-wrap">
      {/* Custom Cursor */}
      <div id="cursor-dot" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      <div id="cursor-ring" style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }} className={isHovered ? 'cursor-hover' : ''} />

      {/* HERO SECTION */}
      <section id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                <span className="hero-eyebrow-text">AVAILABLE FOR REMOTE WORK WORLDWIDE</span>
              </div>
              <h1 className="hero-name" id="hero-name" style={{ opacity: 1, transform: 'none' }}>
                Ranjeet Sahoo<br />
                <span className="grad">Systems Architect</span>
              </h1>
              <p className="hero-sub" style={{ opacity: 1, transform: 'none' }}>
                I design & build <span id="typed-el">{typewriterText}</span>
                <span className="typed-cursor">|</span>
              </p>
              <p className="hero-desc" style={{ opacity: 1, transform: 'none' }}>
                I engineer custom ERP platforms, digital automation workflows, and high-performance SaaS applications that solve real-world operational bottlenecks.
              </p>
              <div className="avail-badge">
                <span className="avail-dot" />
                <span className="avail-text">Available for engagements</span>
              </div>
              <div className="hero-btns">
                <a href="#contact" className="btn-fill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22,2 11,13" /><polygon points="22,2 15,22 11,13 2,9 22,2" /></svg>
                  Get In Touch
                </a>
                <a href="#projects" className="btn-ghost">View Projects</a>
              </div>
              <div className="hero-socials" id="heroSocials" style={{ opacity: 1, transform: 'none' }}>
                <a href="https://github.com/0ranjeet" target="_blank" rel="noopener noreferrer" className="hero-social-icon" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/007ranjeet/" target="_blank" rel="noopener noreferrer" className="hero-social-icon" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="tel:+918984167404" className="hero-social-icon" title="Phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011.1 2.19 2 2 0 013.09 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.9v2.02z" /></svg>
                </a>
                <a href="https://wa.me/918917412728" target="_blank" rel="noopener noreferrer" className="hero-social-icon" title="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M11.999 2h-.001C6.477 2 2 6.477 2 12c0 1.989.574 3.842 1.565 5.408L2 22l4.703-1.542A9.96 9.96 0 0012 22c5.522 0 10-4.477 10-10S17.522 2 12 2z" /></svg>
                </a>
              </div>
            </div>
            
            <div className="hero-terminal-card" id="heroTerminalCard">
              <div className="ht-glow-ring"></div>
              <div className="ht-window">
                <div className="ht-titlebar">
                  <div className="tdot td-r"></div><div className="tdot td-y"></div><div className="tdot td-g"></div>
                  <span className="ht-filename">ranjeet_sahoo.json</span>
                </div>
                <div className="ht-body">
                  <div><span className="ht-ln">1</span><span className="ht-br">{"{"}</span></div>
                  <div><span className="ht-ln">2</span>&nbsp;&nbsp;<span className="ht-kw">"name"</span><span className="ht-br">:</span> <span className="ht-st">"Ranjeet Sahoo"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">3</span>&nbsp;&nbsp;<span className="ht-kw">"role"</span><span className="ht-br">:</span> <span className="ht-st">"Business Systems Architect"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">4</span>&nbsp;&nbsp;<span className="ht-kw">"focus"</span><span className="ht-br">:</span> <span className="ht-st">"ERP · AI Automation · Digital Transformation"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">5</span>&nbsp;&nbsp;<span className="ht-kw">"experience"</span><span className="ht-br">:</span> <span className="ht-st">"1200+ hrs"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">6</span>&nbsp;&nbsp;<span className="ht-kw">"stack"</span><span className="ht-br">:</span> <span className="ht-br">[</span></div>
                  <div><span className="ht-ln">7</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"React"</span><span className="ht-br">,</span> <span className="ht-st">"Node.js"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"Java"</span><span className="ht-br">,</span> <span className="ht-st">"MySQL"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">9</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"AI/LLM"</span></div>
                  <div><span className="ht-ln">10</span>&nbsp;&nbsp;<span className="ht-br">],</span></div>
                  <div><span className="ht-ln">11</span>&nbsp;&nbsp;<span className="ht-kw">"builds"</span><span className="ht-br">:</span> <span className="ht-br">[</span></div>
                  <div><span className="ht-ln">12</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"Hotel ERP"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">13</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"Service Desk"</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">14</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ht-st">"AI SaaS Tools"</span></div>
                  <div><span className="ht-ln">15</span>&nbsp;&nbsp;<span className="ht-br">],</span></div>
                  <div><span className="ht-ln">16</span>&nbsp;&nbsp;<span className="ht-kw">"open_to_work"</span><span className="ht-br">:</span> <span className="ht-cn">true</span><span className="ht-br">,</span></div>
                  <div><span className="ht-ln">17</span>&nbsp;&nbsp;<span className="ht-kw">"email"</span><span className="ht-br">:</span> <span className="ht-st" style={{ fontSize: '11px' }}>"ranjeetsahoo007@gmail.com"</span></div>
                  <div><span className="ht-ln">18</span><span className="ht-br">{"}"}</span></div>
                </div>
              </div>
              <div className="hero-badge glass">
                <span className="hero-badge-label">Status</span>
                <span className="hero-badge-val"><span className="hero-badge-dot"></span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// get to know me</p>
            <h2 className="sec-title revealed">About Me</h2>
          </div>
          <div className="about-grid">
            <div className="about-profile">
              <div className="about-code-block glass">
                <div className="code-tb">
                  <div className="tdot td-r"></div><div className="tdot td-y"></div><div className="tdot td-g"></div>
                  <span className="code-fn">AboutMe.java</span>
                </div>
                <div className="code-body">
                  <div><span className="ln">1</span><span className="kw">public class</span> <span className="cn">AboutMe</span> <span style={{ color: 'var(--muted)' }}>{"{"}</span></div>
                  <div><span className="ln">2</span></div>
                  <div><span className="ln">3</span>&nbsp;&nbsp;<span className="cm">// Hello World</span></div>
                  <div><span className="ln">4</span>&nbsp;&nbsp;<span className="kw">public static void</span> <span className="fn2">main</span><span style={{ color: 'var(--muted)' }}>(String[] args) {"{"}</span></div>
                  <div><span className="ln">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="cn">System</span>.<span class="fn2">out</span>.<span class="fn2">println</span><span style={{ color: 'var(--muted)' }}>(</span></div>
                  <div><span className="ln">6</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="st2">"Fullstack developer &amp;"</span></div>
                  <div><span className="ln">7</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="st2">"consistent learner."</span></div>
                  <div><span className="ln">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--muted)' }}>)</span>;</div>
                  <div><span className="ln">9</span>&nbsp;&nbsp;<span style={{ color: 'var(--muted)' }}>{"}"}</span></div>
                  <div><span className="ln">10</span><span style={{ color: 'var(--muted)' }}>{"}"}</span></div>
                </div>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '2rem' }}>
                I'm a fullstack developer with a passion for building things that genuinely matter. Every commit, every solved problem, and every shipped feature brings me closer to mastery. I'm drawn to real customer problems with clear business justification.
              </p>
              <p className="sec-tag" style={{ marginBottom: '1.25rem' }}>// skills</p>
              <div className="skills-wrap">
                {skills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <div className="skill-top">
                      <span>{skill.name}</span>
                      <span className="skill-pct">{skill.pct}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${skill.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section id="stats">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// by the numbers</p>
            <h2 className="sec-title revealed">Statistics</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass"><div className="stat-num">1,200+</div><div className="stat-lbl">Hours of fullstack coding</div></div>
            <div className="stat-card glass"><div className="stat-num">321+</div><div className="stat-lbl">DSA problems solved</div></div>
            <div className="stat-card glass"><div className="stat-num">410+</div><div className="stat-lbl">Git commits pushed</div></div>
            <div className="stat-card glass"><div className="stat-num">6+</div><div className="stat-lbl">Products shipped</div></div>
            <div className="stat-card glass"><div className="stat-num">100+</div><div className="stat-lbl">Soft skill hours</div></div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="resume">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// tools &amp; technologies</p>
            <h2 className="sec-title revealed">Tech Stack</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '1rem', maxWidth: '600px' }}>
              Everything I use across the full product lifecycle — from UI to server to deployment to AI.
            </p>
          </div>

          <div className="tech-tabs">
            {Object.keys(techStack).map((key) => (
              <button
                key={key}
                className={`tech-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {techStack[key].icon} {techStack[key].title}
              </button>
            ))}
          </div>

          <div className="tech-panel active" style={{ display: 'grid' }}>
            <div className="tech-grid stack-grid">
              {techStack[activeTab].items.map((item) => (
                <div className="tech-card glass" key={item.name}>
                  {item.logo ? (
                    <img
                      src={item.logo}
                      width="30"
                      height="30"
                      alt={item.name}
                      loading="lazy"
                      style={
                        item.filter
                          ? { filter: item.filter }
                          : item.invert
                          ? { background: '#fff', borderRadius: '4px', padding: '2px' }
                          : {}
                      }
                    />
                  ) : null}
                  <span className="tech-label">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stack-cv-strip glass">
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                // want the full picture?
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Download my resume for a complete overview of experience &amp; projects.</p>
            </div>
            <a href="Ranjeet_sahoo_resume.pdf" download="Ranjeet_Sahoo_Resume.pdf" className="btn-fill" id="dlCvBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.879a2 2 0 001.939-1.515L22 17" /></svg>
              Download Resume PDF
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// what i offer</p>
            <h2 className="sec-title revealed">Services</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '1rem', maxWidth: '640px' }}>
              Whether you want to build a product, rank on Google, run ads, grow your brand, or streamline operations — I cover the full picture.
            </p>
          </div>
          <div className="services-grid">
            {servicesList.map((svc) => (
              <div className="svc-card glass" key={svc.title}>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                    {svc.iconPath}
                  </svg>
                </div>
                <p className="svc-title">{svc.title}</p>
                <p className="svc-desc">{svc.desc}</p>
                <div className="svc-tags">
                  {svc.tags.map((tag) => (
                    <span className="svc-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  href={`https://wa.me/918917412728?text=${encodeURIComponent(`Hi Ranjeet, I am interested in your service: *${svc.title}*.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="svc-wa-btn"
                >
                  Discuss Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// how i work</p>
            <h2 className="sec-title revealed">My Process</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '1rem', maxWidth: '560px' }}>
              Every project follows a clear, repeatable workflow. No guesswork, no scope creep.
            </p>
          </div>
          <div className="process-grid">
            <div className="process-line" />
            {processSteps.map((step) => (
              <div className="process-step" key={step.num}>
                <span className="process-num">{step.num}</span>
                <div className="process-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                    {step.iconPath}
                  </svg>
                </div>
                <p className="process-step-title">{step.title}</p>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// things i've built</p>
            <h2 className="sec-title revealed">Projects</h2>
          </div>
          <div className="proj-grid">
            {projectsList.map((proj) => (
              <div className="proj-card glass featured" key={proj.title}>
                <div className="proj-top">
                  <div className="proj-icon-wrap" style={{ background: 'rgba(var(--accentRgb), 0.1)', borderColor: 'rgba(var(--accentRgb), 0.2)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                      {proj.icon}
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="proj-badge badge-ai">{proj.badge}</span>
                    <div className="proj-actions">
                      <a href="https://github.com/0ranjeet" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
                <p className="proj-name">{proj.title}</p>
                <p className="proj-desc">{proj.desc}</p>
                <div className="tags">
                  {proj.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// insights &amp; guides</p>
            <h2 className="sec-title revealed">Blog</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '1rem', maxWidth: '600px' }}>
              Practical guides for business owners, founders, and teams looking to grow through technology — no jargon, no code, just clear thinking.
            </p>
          </div>
          <div className="blog-grid">
            {blogsList.map((blog) => (
              <a href={blog.link} className="blog-card glass" aria-label={blog.title} key={blog.title}>
                <div className="blog-thumb" style={{ background: blog.gradient }}>
                  <svg className="blog-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.3">
                    {blog.svg}
                  </svg>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span className="blog-cat">{blog.cat}</span>
                    <span className="blog-date">{blog.date}</span>
                  </div>
                  <p className="blog-title">{blog.title}</p>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <div className="blog-footer">
                    <span className="blog-read">Read article &rarr;</span>
                    <span className="blog-time">{blog.read}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <div className="container">
          <div className="sec-header">
            <p className="sec-tag">// let's connect</p>
            <h2 className="sec-title revealed">Contact Me</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                Available for freelance projects, consulting, and full-time roles. Have a product idea, a team that needs a dev, or just want to talk tech?
              </p>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                </div>
                <div>
                  <div className="c-label">GitHub</div>
                  <div className="c-text">
                    <a href="https://github.com/0ranjeet" target="_blank" rel="noopener noreferrer">github.com/0ranjeet</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </div>
                <div>
                  <div className="c-label">LinkedIn</div>
                  <div className="c-text">
                    <a href="https://www.linkedin.com/in/007ranjeet/" target="_blank" rel="noopener noreferrer">linkedin.com/in/007ranjeet</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
                </div>
                <div>
                  <div className="c-label">Email</div>
                  <div className="c-text">
                    <a href="mailto:ranjeetsahoo007@gmail.com">ranjeetsahoo007@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                    <path d="M8 7v6h12" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <div className="c-label">Calendly</div>
                  <div className="c-text">
                    <a href="https://calendly.com/ranjeet0/30min" target="_blank" rel="noopener noreferrer">Schedule 30‑min meeting</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011.1 2.19 2 2 0 013.09 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.9v2.02z" /></svg>
                </div>
                <div>
                  <div className="c-label">Phone</div>
                  <div className="c-text">
                    <a href="tel:+918984167404">+91 8984167404</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="c-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M11.999 2h-.001C6.477 2 2 6.477 2 12c0 1.989.574 3.842 1.565 5.408L2 22l4.703-1.542A9.96 9.96 0 0012 22c5.522 0 10-4.477 10-10S17.522 2 12 2z" /></svg>
                </div>
                <div>
                  <div className="c-label">WhatsApp</div>
                  <div className="c-text">
                    <a href="https://wa.me/918917412728" target="_blank" rel="noopener noreferrer">+91 8917412728</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="contact-form glass" style={{ padding: '2rem', borderRadius: '16px' }} onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  className="f-input"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <input
                  type="email"
                  className="f-input"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <input
                  type="text"
                  className="f-input"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                  className="f-area"
                  placeholder="Your message..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="f-btn" id="fBtn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9 22,2" /></svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer>
        <div className="footer-socials">
          <a href="https://github.com/0ranjeet" target="_blank" rel="noopener noreferrer" className="footer-social" title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/007ranjeet/" target="_blank" rel="noopener noreferrer" className="footer-social" title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="mailto:ranjeetsahoo007@gmail.com" className="footer-social" title="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
          </a>
          <a href="https://wa.me/918917412728" target="_blank" rel="noopener noreferrer" className="footer-social" title="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M11.999 2h-.001C6.477 2 2 6.477 2 12c0 1.989.574 3.842 1.565 5.408L2 22l4.703-1.542A9.96 9.96 0 0012 22c5.522 0 10-4.477 10-10S17.522 2 12 2z" /></svg>
          </a>
        </div>
        <p>Crafted with <span className="footer-gradient">passion &amp; precision</span> by Ranjeet Sahoo &mdash; &copy; 2026</p>
        <p style={{ marginTop: '0.4rem', fontSize: '10px', opacity: 0.5 }}>Available worldwide &middot; Remote engagements welcome</p>
      </footer>
    </div>
  );
}
