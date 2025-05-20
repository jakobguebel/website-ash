// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="experience-badge">Über 20 Jahre Erfahrung</div>
            <h1>Ihr zuverlässiger Umzugspartner in Mannheim</h1>
            <p>Professionelle Umzüge, persönliche Beratung und maßgeschneiderte Lösungen für Ihren stressfreien Umzug in der Kurpfalz und darüber hinaus.</p>
            <div className="hero-buttons">
              <Link to="/kontakt" className="btn btn-primary btn-lg">Kostenlos anfragen</Link>
              <Link to="/kostenrechner" className="btn btn-secondary btn-lg">Umzugskosten berechnen</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section section-light services-preview">
        <div className="container">
          <div className="section-title">
            <h2>Unsere Leistungen</h2>
            <p>Wir bieten umfassende Umzugsdienstleistungen für jeden Bedarf</p>
          </div>
          <div className="services-grid">
            {/* Diese würden normalerweise aus einer Datenquelle kommen und dynamisch gerendert werden */}
            <div className="service-card">
              <div className="service-img">
                {/* Platzhalter für Bild */}
                <div className="placeholder-img">Privatumzug</div>
              </div>
              <div className="service-content">
                <h3>Privatumzüge</h3>
                <p>Wir kümmern uns um Ihren gesamten Umzug - vom Einpacken bis zum Aufbau an Ihrem neuen Wohnort.</p>
                <Link to="/leistungen/privatumzug" className="btn btn-secondary">Mehr erfahren</Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-img">
                <div className="placeholder-img">Büroumzug</div>
              </div>
              <div className="service-content">
                <h3>Büroumzüge</h3>
                <p>Professionelle Umzüge für Unternehmen jeder Größe mit minimaler Geschäftsunterbrechung.</p>
                <Link to="/leistungen/bueroumzug" className="btn btn-secondary">Mehr erfahren</Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-img">
                <div className="placeholder-img">Laborumzug</div>
              </div>
              <div className="service-content">
                <h3>Laborumzüge</h3>
                <p>Sichere und fachgerechte Umzüge für sensible Laborausrüstung und wissenschaftliche Geräte.</p>
                <Link to="/leistungen/laborumzug" className="btn btn-secondary">Mehr erfahren</Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-img">
                <div className="placeholder-img">Büchereiumzug</div>
              </div>
              <div className="service-content">
                <h3>Büchereiumzüge</h3>
                <p>Spezialisierte Umzüge für Bibliotheken und Sammlungen mit systematischer Verpackung und Katalogisierung.</p>
                <Link to="/leistungen/buechereiumzug" className="btn btn-secondary">Mehr erfahren</Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/leistungen" className="btn btn-primary btn-lg">Alle Leistungen ansehen</Link>
          </div>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="section section-secondary calculator-cta">
        <div className="container">
          <h2>Berechnen Sie Ihre Umzugskosten</h2>
          <p>Mit unserem interaktiven Kostenrechner erhalten Sie in wenigen Schritten eine unverbindliche Preisschätzung für Ihren Umzug.</p>
          <Link to="/kostenrechner" className="btn btn-primary btn-lg">Zum Kostenrechner</Link>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section testimonials-preview">
        <div className="container">
          <div className="section-title">
            <h2>Kundenstimmen</h2>
            <p>Was unsere Kunden über uns sagen</p>
          </div>
          
          <div className="testimonials-grid">
            {/* Platzhalter für Testimonials */}
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>Der Umzug mit ASH Kurpfalz war perfekt organisiert. Das Team war pünktlich, freundlich und äußerst sorgfältig mit unseren Möbeln.</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">FM</div>
                <div className="testimonial-info">
                  <h4>Frank Müller</h4>
                  <p>Privatumzug in Mannheim</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>Unsere Agentur ist mit ASH umgezogen und wir waren beeindruckt von der effizienten Organisation. Die IT-Geräte wurden sicher transportiert.</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SK</div>
                <div className="testimonial-info">
                  <h4>Sandra Klein</h4>
                  <p>Büroumzug nach Heidelberg</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>Als wissenschaftliche Einrichtung war uns der sichere Transport unserer Laborgeräte besonders wichtig. ASH hat dies mit Fachwissen umgesetzt.</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">DR</div>
                <div className="testimonial-info">
                  <h4>Dr. Robert Wagner</h4>
                  <p>Laborumzug Universität Mannheim</p>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/referenzen" className="btn btn-secondary btn-lg">Alle Bewertungen lesen</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;