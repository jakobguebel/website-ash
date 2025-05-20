// src/pages/legal/PrivacyPolicyPage.js
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="legal-page section">
      <div className="container">
        <div className="section-title">
          <h1>Datenschutzerklärung</h1>
        </div>
        <div className="legal-content">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
            wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
            werden können.
          </p>
          
          <h3>Datenerfassung auf unserer Website</h3>
          <p>
            Wer ist verantwortlich für die Datenerfassung auf dieser Website?<br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
            können Sie dem Impressum dieser Website entnehmen.
          </p>
          
          <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie 
            dieser Datenschutzerklärung.
          </p>
          
          <p>
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
            Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
            erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck 
            das geschieht.
          </p>
          
          {/* Weitere Datenschutzinformationen würden hier folgen */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;