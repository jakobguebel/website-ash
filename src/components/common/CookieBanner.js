// src/components/common/CookieBanner.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const CookieBanner = ({ onAccept, onSettings }) => {
  return (
    <div className="cookie-banner">
      <div className="container cookie-container">
        <p className="cookie-text">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
          Durch die weitere Nutzung der Website stimmen Sie der Verwendung von Cookies zu. 
          Weitere Informationen finden Sie in unserer{' '}
          <Link to="/datenschutz" className="cookie-link">Datenschutzerklärung</Link>.
        </p>
        <div className="cookie-buttons">
          <button 
            className="btn btn-primary" 
            onClick={onAccept}
          >
            Akzeptieren
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={onSettings}
          >
            Einstellungen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;