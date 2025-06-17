import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const quote = '“Stay focused and never give up!” — TaskForge AI';

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigation on mobile
  };

  return (
    <div className="welcome-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🚀 TaskForge</div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <button onClick={() => handleNav('/about')}>About</button>
          <button onClick={() => handleNav('/features')}>Features</button>
          <button onClick={() => handleNav('/contact')}>Contact</button>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => handleNav('/about')}>About</button>
          <button onClick={() => handleNav('/features')}>Features</button>
          <button onClick={() => handleNav('/contact')}>Contact</button>
        </div>
      )}

      {/* Background & Main */}
      <div className="background-animation"></div>

      <div className="welcome-content">
        <h1 className="logo">🚀 TaskForge</h1>
        <p className="quote">{quote}</p>
        <div className="buttons">
          <button className="btn" onClick={() => handleNav('/register')}>Get Started</button>
          <button className="btn" onClick={() => handleNav('/login')}>Login</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TaskForge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;
