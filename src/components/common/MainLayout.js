// src/components/common/MainLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

const MainLayout = () => {
  const location = useLocation();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  
  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
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