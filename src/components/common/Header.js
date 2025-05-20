// src/components/common/Header.js
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);
  
  // Change header style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close mobile menu when clicking a navigation link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <Logo />
          <div className="logo-text">ASH <span>Kurpfalz Umzüge</span></div>
        </Link>
        
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
                end
              >
                Startseite
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/leistungen" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Leistungen
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/kostenrechner" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Kostenrechner
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/ueber-uns" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Über uns
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/referenzen" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Referenzen
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/kontakt" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Kontakt
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;