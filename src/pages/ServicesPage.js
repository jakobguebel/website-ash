// src/pages/ServicesPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div className="services-page section">
      <div className="container">
        <div className="section-title">
          <h1>Unsere Leistungen</h1>
          <p>Maßgeschneiderte Umzugslösungen für jeden Bedarf</p>
        </div>
        <p>Detaillierte Beschreibung der Leistungen folgt...</p>
        <div className="services-links">
          <Link to="/leistungen/privatumzug">Privatumzüge</Link>
          <Link to="/leistungen/bueroumzug">Büroumzüge</Link>
          <Link to="/leistungen/buechereiumzug">Büchereiumzüge</Link>
          <Link to="/leistungen/laborumzug">Laborumzüge</Link>
          <Link to="/leistungen/lagerung">Lagerung</Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;