// src/pages/legal/ImpressumPage.js
import React from 'react';

const ImpressumPage = () => {
  return (
    <div className="legal-page section">
      <div className="container">
        <div className="section-title">
          <h1>Impressum</h1>
        </div>
        <div className="legal-content">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            ASH Kurpfalz Umzüge<br />
            Landzungenstraße 8<br />
            68159 Mannheim
          </p>
          
          <h3>Vertreten durch</h3>
          <p>Max Mustermann</p>
          
          <h3>Kontakt</h3>
          <p>
            Telefon: +49 (0) 621 12345678<br />
            E-Mail: info@ash-kurpfalz-umzuege.de
          </p>
          
          <h3>Umsatzsteuer-ID</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE123456789
          </p>
          
          <h3>Haftungshinweis</h3>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
            Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;