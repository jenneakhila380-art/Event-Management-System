import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isExplore = location.pathname === '/events';

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        Event<span>ify</span>
      </Link>

      <nav className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
          Home
        </Link>
        <Link to="/events" className={isExplore ? 'active' : ''} onClick={closeMenu}>
          Explore Events
        </Link>
        <a href={isExplore ? "/#categories" : "#categories"} onClick={closeMenu}>
          Categories
        </a>
        <a href={isExplore ? "/#about" : "#about"} onClick={closeMenu}>
          About
        </a>
      </nav>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Get Started</button>
      </div>

      <button className="menu-btn" id="menuBtn" onClick={toggleMenu} aria-label="Toggle Navigation">
        {menuOpen ? '✕' : '☰'}
      </button>
    </header>
  );
};
