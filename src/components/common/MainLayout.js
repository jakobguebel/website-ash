// src/components/common/MainLayout.js
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

const MainLayout = () => {
  const location = useLocation();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const prevPathRef = useRef(location.pathname);
  
  // Verbesserte Scroll-to-top Funktion
  useEffect(() => {
    // Nur scrollen, wenn sich der Pfad geändert hat
    if (prevPathRef.current !== location.pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Sofortiges Scrollen ohne Animation
      });
      
      // Sicherheitsnetz: Nach einer kleinen Verzögerung nochmals scrollen
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  // Zusätzlicher Event-Listener für Link-Klicks
  useEffect(() => {
    const handleLinkClick = (e) => {
      // Finde das nächste <a>-Element im Pfad nach oben
      const link = e.target.closest('a');
      
      // Wenn es ein interner Link ist (kein externer Link)
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        // Speichere die Info, dass wir scrollten
        sessionStorage.setItem('scrollToTop', 'true');
      }
    };
    
    // Scrolle bei Seitenladung, wenn das Flag gesetzt ist
    if (sessionStorage.getItem('scrollToTop') === 'true') {
      window.scrollTo(0, 0);
      sessionStorage.removeItem('scrollToTop');
    }
    
    // Füge Event-Listener für alle Link-Klicks hinzu
    document.addEventListener('click', handleLinkClick);
    
    // Entferne den Event-Listener beim Aufräumen
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  // Check if cookie consent is already given
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (!consentGiven) {
      setShowCookieBanner(true);
    }
  }, []);
  
  // Cookie consent handlers
  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    setShowCookieBanner(false);
  };
  
  const handleCookieSettings = () => {
    // Für den Start akzeptieren wir einfach alle Cookies
    handleAcceptCookies();
  };

  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      {showCookieBanner && (
        <CookieBanner 
          onAccept={handleAcceptCookies}
          onSettings={handleCookieSettings}
        />
      )}
    </div>
  );
};

export default MainLayout;