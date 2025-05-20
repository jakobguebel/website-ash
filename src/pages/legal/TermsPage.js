// src/pages/legal/TermsPage.js
import React from 'react';

const TermsPage = () => {
  return (
    <div className="legal-page section">
      <div className="container">
        <div className="section-title">
          <h1>Allgemeine Geschäftsbedingungen</h1>
        </div>
        <div className="legal-content">
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Umzugsleistungen und damit 
            zusammenhängende Leistungen zwischen der ASH Kurpfalz Umzüge (nachfolgend "Umzugsunternehmen" genannt) 
            und dem Auftraggeber (nachfolgend "Kunde" genannt).
          </p>
          
          <h2>2. Leistungsumfang</h2>
          <p>
            Der genaue Umfang der Leistungen ergibt sich aus dem individuellen Angebot des Umzugsunternehmens. 
            Sofern nicht anders vereinbart, beinhalten die Umzugsleistungen das Transportieren des Umzugsguts 
            von der Abhol- zur Lieferadresse.
          </p>
          
          <h2>3. Angebote und Vertragsabschluss</h2>
          <p>
            Angebote des Umzugsunternehmens sind freibleibend. Ein Vertrag kommt erst durch die schriftliche 
            Auftragsbestätigung des Umzugsunternehmens oder durch die Ausführung der Leistung zustande.
          </p>
          
          {/* Weitere AGB-Informationen würden hier folgen */}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;