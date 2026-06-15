import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import Portfolio from './components/Portfolio';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rs-theme') || 'human';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'ai' ? 'human' : 'ai'));
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <CanvasBackground theme={theme} />
      <Portfolio theme={theme} />
    </>
  );
}
