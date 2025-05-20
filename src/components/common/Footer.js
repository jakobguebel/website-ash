// src/components/common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>ASH Kurpfalz Umzüge</h3>
            <p>Ihr zuverlässiger Partner für Umzüge in Mannheim und der Kurpfalz mit über 20 Jahren Erfahrung.</p>
            <p>
              Landzungenstraße 8<br />
              68159 Mannheim<br />
              Geschäftsführer: Max Mustermann
            </p>
          </div>
          
          <div className="footer-col">
            <h3>Kontakt</h3>
            <ul className="contact-list">
              <li>
                <FaPhoneAlt className="footer-icon" />
                <a href="tel:+4962112345678">+49 (0) 621 12345678</a>
              </li>
              <li>
                <FaEnvelope className="footer-icon" />
                <a href="mailto:info@ash-kurpfalz-umzuege.de">info@ash-kurpfalz-umzuege.de</a>
              </li>
              <li>
                <FaClock className="footer-icon" />
                Mo-Fr, 8:00-18:00 Uhr
              </li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Links</h3>
            <ul className="footer-links">
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><Link to="/agb">AGB</Link></li>
              <li><Link to="/karriere">Karriere</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Folgen Sie uns</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaYoutube />
              </a>
            </div>
            
            <div className="payment-info">
              <h4>Zahlungsmethoden</h4>
              <div className="payment-methods">
                <span className="payment-method">Barzahlung</span>
                <span className="payment-method">Überweisung</span>
                <span className="payment-method">EC-Karte</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {currentYear} ASH Kurpfalz Umzüge. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;