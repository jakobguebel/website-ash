// src/components/calculator/CalculatorResults.js
import React from 'react';

const CalculatorResults = ({ price, breakdown, formData, onRestart }) => {
  // Helfer-Funktion zur Formatierung von Zahlen als Währung
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
  };
  
  // Umzugstyp-Label
  const getMovingTypeLabel = (type) => {
    switch(type) {
      case 'privateMoving': return 'Privatumzug';
      case 'officeMoving': return 'Büro-/Unternehmensumzug';
      case 'libraryMoving': return 'Büchereiumzug';
      case 'labMoving': return 'Laborumzug';
      default: return type;
    }
  };
  
  // Zusatzleistungen, die ausgewählt wurden
  const selectedServices = Object.keys(formData.additionalServices)
    .filter(service => formData.additionalServices[service]);
  
  // Services-Labels
  const getServiceLabel = (service) => {
    switch(service) {
      case 'packing': return 'Einpackservice';
      case 'assembly': return 'Möbelmontage';
      case 'disposal': return 'Entsorgung';
      case 'storage': return 'Zwischenlagerung';
      case 'cleaning': return 'Reinigungsservice';
      case 'specialPacking': return 'Spezialverpackung für empfindliche Geräte';
      case 'cataloging': return 'Katalogisierung und systematische Verpackung';
      default: return service;
    }
  };
  
  // Dynamische Inventaranzeige basierend auf Umzugstyp
  const renderInventoryDetails = () => {
    switch(formData.movingType) {
      case 'privateMoving':
      case 'officeMoving':
        return (
          <>
            <p><strong>Möbelstücke:</strong></p>
            <ul>
              <li>Kleine Möbel: {formData.furniture.small} Stück</li>
              <li>Mittlere Möbel: {formData.furniture.medium} Stück</li>
              <li>Große Möbel: {formData.furniture.large} Stück</li>
            </ul>
          </>
        );
      case 'labMoving':
        return (
          <>
            <p><strong>Laborausrüstung:</strong></p>
            <ul>
              <li>Kleingeräte: {formData.specialItems.labEquipment.small} Stück</li>
              <li>Mittelgroße Geräte: {formData.specialItems.labEquipment.medium} Stück</li>
              <li>Großgeräte: {formData.specialItems.labEquipment.large} Stück</li>
            </ul>
          </>
        );
      case 'libraryMoving':
        return (
          <>
            <p><strong>Bibliotheksbestand:</strong></p>
            <ul>
              <li>Regalmeter Bücher: {formData.specialItems.books.shelfMeter} Meter</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };
  
  // Dynamische Preisaufschlüsselung basierend auf Umzugstyp
  const renderPriceBreakdownDetails = () => {
    const breakdownItems = [
      {
        label: `Grundpreis (${getMovingTypeLabel(formData.movingType)})`,
        value: breakdown.basePrice,
        show: true
      },
      {
        label: `${formData.movingType === 'privateMoving' ? 'Wohnungsgröße' : 
                formData.movingType === 'officeMoving' ? 'Bürofläche' : 
                formData.movingType === 'libraryMoving' ? 'Bibliotheksfläche' : 
                'Laborfläche'} (${formData.size} m²)`,
        value: breakdown.sizePrice,
        show: true
      },
      {
        label: `Entfernung (${formData.distance} km)`,
        value: breakdown.distancePrice,
        show: true
      },
      {
        label: `Möbel (${formData.furniture.small + formData.furniture.medium + formData.furniture.large} Stück)`,
        value: breakdown.furniturePrice,
        show: ['privateMoving', 'officeMoving'].includes(formData.movingType) && breakdown.furniturePrice > 0
      },
      {
        label: formData.movingType === 'labMoving' ? 'Laborgeräte' : 'Bibliotheksbestand',
        value: breakdown.specialItemsPrice,
        show: ['labMoving', 'libraryMoving'].includes(formData.movingType) && breakdown.specialItemsPrice > 0
      },
      {
        label: 'Zusatzleistungen',
        value: breakdown.additionalServicesPrice,
        show: breakdown.additionalServicesPrice > 0
      },
      {
        label: 'Erschwernis alte Location',
        value: breakdown.accessOldPrice,
        show: breakdown.accessOldPrice > 0
      },
      {
        label: 'Erschwernis neue Location',
        value: breakdown.accessNewPrice,
        show: breakdown.accessNewPrice > 0
      }
    ];
    
    return (
      <>
        {breakdownItems.filter(item => item.show).map((item, index) => (
          <div key={index} className="breakdown-item">
            <span>{item.label}</span>
            <span>{formatCurrency(item.value)}</span>
          </div>
        ))}
        <div className="breakdown-item">
          <span>Gesamtpreis</span>
          <span>{formatCurrency(breakdown.totalPrice)}</span>
        </div>
      </>
    );
  };
  
  // Kundenspezifischer Begleittext basierend auf Umzugstyp
  const getTypeSpecificMessage = () => {
    switch(formData.movingType) {
      case 'privateMoving':
        return "Bei Privatumzügen bieten wir Ihnen eine persönliche Beratung mit individueller Betreuung. Unser erfahrenes Team sorgt für einen reibungslosen Ablauf.";
      case 'officeMoving':
        return "Für Büroumzüge planen wir gemeinsam mit Ihnen den optimalen Zeitpunkt, um Geschäftsunterbrechungen zu minimieren. Bei Bedarf können wir auch am Wochenende oder außerhalb der Geschäftszeiten umziehen.";
      case 'libraryMoving':
        return "Büchereiumzüge erfordern ein systematisches Vorgehen. Wir sorgen für die sichere Verpackung und sorgfältige Katalogisierung Ihres Bestands, damit alles am neuen Standort korrekt eingeordnet werden kann.";
      case 'labMoving':
        return "Bei Laborumzügen liegt unser Fokus auf dem sicheren Transport empfindlicher Geräte. Unser Spezialistenteam verfügt über die nötige Erfahrung und Ausrüstung für den fachgerechten Umzug Ihrer wertvollen Geräte.";
      default:
        return "Für eine detaillierte Beratung zu Ihrem individuellen Umzugsprojekt stehen wir Ihnen gerne zur Verfügung.";
    }
  };

  return (
    <div className="calculator-results">
      <h3>Ihre geschätzten Umzugskosten</h3>
      
      <div className="price-result">
        {formatCurrency(price)}
      </div>
      
      <p>
        Diese Schätzung basiert auf den von Ihnen angegebenen Daten. 
        Die genauen Kosten können nach einer persönlichen Besichtigung variieren.
      </p>
      
      <div className="price-breakdown">
        <h3>Preisübersicht</h3>
        {renderPriceBreakdownDetails()}
      </div>
      
      <div className="selected-services">
        <h3>Ihre Auswahl</h3>
        <p><strong>Umzugstyp:</strong> {getMovingTypeLabel(formData.movingType)}</p>
        <p><strong>Größe:</strong> {formData.size} m²</p>
        <p><strong>Entfernung:</strong> {formData.distance} km</p>
        
        {renderInventoryDetails()}
        
        {selectedServices.length > 0 && (
          <>
            <p><strong>Gewählte Zusatzleistungen:</strong></p>
            <ul>
              {selectedServices.map(service => (
                <li key={service}>{getServiceLabel(service)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      <div className="type-specific-message">
        <p>{getTypeSpecificMessage()}</p>
      </div>
      
      <div className="contact-info">
        <h3>Nächste Schritte</h3>
        <p>
          Für ein verbindliches Angebot oder weitere Fragen kontaktieren Sie uns bitte.
          Mit über 20 Jahren Erfahrung in der Umzugsbranche steht unser Team Ihnen gerne zur Verfügung!
        </p>
        
        <div className="contact-buttons">
          <a href="tel:+4962112345678" className="btn btn-primary">
            Jetzt anrufen
          </a>
          <a href="/kontakt" className="btn btn-secondary">
            Kontaktformular
          </a>
          <button onClick={onRestart} className="btn btn-secondary">
            Neue Berechnung
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;