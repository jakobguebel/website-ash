// src/pages/CalculatorPage.js
import React, { useState } from 'react';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    movingType: '',
    size: 0,
    distance: 0,
    furniture: {
      small: 0,
      medium: 0,
      large: 0
    },
    specialItems: {
      labEquipment: {
        small: 0,
        medium: 0,
        large: 0
      },
      books: {
        shelfMeter: 0
      }
    },
    additionalServices: {
      packing: false,
      assembly: false,
      disposal: false,
      storage: false,
      cleaning: false,
      specialPacking: false,
      cataloging: false
    },
    accessOld: {
      floor: 'ground',
      elevator: true,
      parking: 'easy'
    },
    accessNew: {
      floor: 'ground',
      elevator: true,
      parking: 'easy'
    }
  });
  
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  
  // Handler für Formulareingaben
  const handleInputChange = (field, value) => {
    // Tiefe Nestvariante für verschiedene Formularebenen
    if (field.includes('.')) {
      const parts = field.split('.');
      
      if (parts.length === 2) {
        setFormData({
          ...formData,
          [parts[0]]: {
            ...formData[parts[0]],
            [parts[1]]: value
          }
        });
      } else if (parts.length === 3) {
        setFormData({
          ...formData,
          [parts[0]]: {
            ...formData[parts[0]],
            [parts[1]]: {
              ...formData[parts[0]][parts[1]],
              [parts[2]]: value
            }
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };
  
  // Handler für nächsten Schritt
  const handleNextStep = () => {
    if (currentStep === 6) {
      // Hier würde die Berechnung stattfinden
      calculatePrice();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handler für vorherigen Schritt
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Vereinfachte Berechnung (für Demozwecke)
  const calculatePrice = () => {
    // Basispreis je nach Umzugstyp
    let price = 0;
    
    switch(formData.movingType) {
      case 'privateMoving':
        price = 300;
        break;
      case 'officeMoving':
        price = 500;
        break;
      case 'libraryMoving':
        price = 600;
        break;
      case 'labMoving':
        price = 750;
        break;
      default:
        price = 300;
    }
    
    // Größe-Faktor
    price += formData.size * 2.5;
    
    // Entfernung
    price += formData.distance * 1.5;
    
    // Möbel
    if (formData.movingType === 'privateMoving' || formData.movingType === 'officeMoving') {
      price += formData.furniture.small * 10;
      price += formData.furniture.medium * 25;
      price += formData.furniture.large * 50;
    }
    
    // Zusatzleistungen
    if (formData.additionalServices.packing) price += 150;
    if (formData.additionalServices.assembly) price += 120;
    if (formData.additionalServices.disposal) price += 200;
    if (formData.additionalServices.storage) price += 100;
    if (formData.additionalServices.cleaning) price += 180;
    
    // Spezialleistungen
    if (formData.additionalServices.specialPacking) price += 250;
    if (formData.additionalServices.cataloging) price += 300;
    
    setCalculatedPrice(price);
  };
  
  // Umzugstyp-Auswahl-Inhalt
  const renderTypeSelection = () => (
    <div className="calculator-step-content">
      <h3>Wählen Sie Ihren Umzugstyp</h3>
      <div className="calculator-options">
        <div 
          className={`calculator-option ${formData.movingType === 'privateMoving' ? 'active' : ''}`}
          onClick={() => handleInputChange('movingType', 'privateMoving')}
        >
          <div className="option-icon">🏠</div>
          <h4>Privatumzug</h4>
          <p>Für Wohnungen und Häuser</p>
        </div>
        
        <div 
          className={`calculator-option ${formData.movingType === 'officeMoving' ? 'active' : ''}`}
          onClick={() => handleInputChange('movingType', 'officeMoving')}
        >
          <div className="option-icon">🏢</div>
          <h4>Büroumzug</h4>
          <p>Für Unternehmen jeder Größe</p>
        </div>
        
        <div 
          className={`calculator-option ${formData.movingType === 'libraryMoving' ? 'active' : ''}`}
          onClick={() => handleInputChange('movingType', 'libraryMoving')}
        >
          <div className="option-icon">📚</div>
          <h4>Büchereiumzug</h4>
          <p>Für Bibliotheken und Archive</p>
        </div>
        
        <div 
          className={`calculator-option ${formData.movingType === 'labMoving' ? 'active' : ''}`}
          onClick={() => handleInputChange('movingType', 'labMoving')}
        >
          <div className="option-icon">🧪</div>
          <h4>Laborumzug</h4>
          <p>Für wissenschaftliche Einrichtungen</p>
        </div>
      </div>
    </div>
  );
  
  // Größe & Entfernung Inhalt
  const renderSizeDistance = () => (
    <div className="calculator-step-content">
      <h3>Größe & Entfernung</h3>
      <div className="form-group">
        <label htmlFor="size">Größe (in m²):</label>
        <input 
          type="number" 
          id="size" 
          value={formData.size} 
          onChange={(e) => handleInputChange('size', Number(e.target.value) || 0)}
          min="0"
          required
        />
        <p className="form-hint">
          {formData.movingType === 'privateMoving' ? 'Wohnungsgröße' : 
           formData.movingType === 'officeMoving' ? 'Bürofläche' : 
           formData.movingType === 'libraryMoving' ? 'Bibliotheksfläche' : 
           formData.movingType === 'labMoving' ? 'Laborfläche' : 'Fläche'} in Quadratmetern
        </p>
      </div>
      
      <div className="form-group">
        <label htmlFor="distance">Entfernung (in km):</label>
        <input 
          type="number" 
          id="distance" 
          value={formData.distance} 
          onChange={(e) => handleInputChange('distance', Number(e.target.value) || 0)}
          min="0"
          required
        />
        <p className="form-hint">Distanz zwischen altem und neuem Standort</p>
      </div>
    </div>
  );
  
  // Private/Office Möbel Inhalt
  const renderFurniture = () => (
    <div className="calculator-step-content">
      <h3>Möbelstücke</h3>
      <div className="form-group">
        <label htmlFor="smallFurniture">Kleine Möbelstücke (Stühle, kleine Tische, etc.):</label>
        <input 
          type="number" 
          id="smallFurniture" 
          value={formData.furniture.small} 
          onChange={(e) => handleInputChange('furniture.small', Number(e.target.value) || 0)}
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="mediumFurniture">Mittlere Möbelstücke (Schreibtisch, Sideboard, etc.):</label>
        <input 
          type="number" 
          id="mediumFurniture" 
          value={formData.furniture.medium} 
          onChange={(e) => handleInputChange('furniture.medium', Number(e.target.value) || 0)}
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="largeFurniture">Große Möbelstücke (Schrank, Sofa, Bett, etc.):</label>
        <input 
          type="number" 
          id="largeFurniture" 
          value={formData.furniture.large} 
          onChange={(e) => handleInputChange('furniture.large', Number(e.target.value) || 0)}
          min="0"
        />
      </div>
    </div>
  );
  
  // Ergebnisanzeige
  const renderResults = () => (
    <div className="calculator-results">
      <div className="result-header">
        <h3>Ihre geschätzten Umzugskosten:</h3>
        <div className="price-amount">{calculatedPrice?.toLocaleString('de-DE')} €</div>
      </div>
      
      <p className="result-disclaimer">
        Diese Schätzung basiert auf den von Ihnen angegebenen Daten. 
        Die genauen Kosten können nach einer persönlichen Besichtigung variieren.
      </p>
      
      <div className="result-details">
        <h4>Ihre Angaben:</h4>
        <ul>
          <li><strong>Umzugstyp:</strong> {
            formData.movingType === 'privateMoving' ? 'Privatumzug' :
            formData.movingType === 'officeMoving' ? 'Büroumzug' :
            formData.movingType === 'libraryMoving' ? 'Büchereiumzug' :
            formData.movingType === 'labMoving' ? 'Laborumzug' : ''
          }</li>
          <li><strong>Größe:</strong> {formData.size} m²</li>
          <li><strong>Entfernung:</strong> {formData.distance} km</li>
          {/* Weitere Details würden hier angezeigt */}
        </ul>
      </div>
      
      <div className="result-actions">
        <button className="btn btn-primary" onClick={() => window.location.href = '/kontakt'}>
          Angebot anfragen
        </button>
        <button className="btn btn-secondary" onClick={() => {
          setCurrentStep(1);
          setCalculatedPrice(null);
        }}>
          Neu berechnen
        </button>
      </div>
    </div>
  );
  
  // Rendern des aktuellen Schritts basierend auf currentStep
  const renderCurrentStep = () => {
    if (calculatedPrice !== null) {
      return renderResults();
    }
    
    switch (currentStep) {
      case 1:
        return renderTypeSelection();
      case 2:
        return renderSizeDistance();
      case 3:
        // Vereinfacht für dieses Beispiel
        return renderFurniture();
      case 4:
      case 5:
      case 6:
        return <div className="calculator-step-content">
          <h3>Weitere Angaben</h3>
          <p>Dieser Schritt wird in der finalen Version implementiert.</p>
          <p>Klicken Sie auf "Weiter", um zur Preisschätzung zu gelangen.</p>
        </div>;
      default:
        return <div>Unbekannter Schritt</div>;
    }
  };

  return (
    <div className="calculator-page">
      <div className="calculator-header">
        <div className="container">
          <h1>Umzugskostenrechner</h1>
          <p>Berechnen Sie schnell und einfach die Kosten für Ihren Umzug.</p>
        </div>
      </div>
      
      <div className="calculator-container">
        <div className="container">
          {/* Fortschrittsanzeige, nur sichtbar wenn kein Ergebnis angezeigt wird */}
          {calculatedPrice === null && (
            <div className="calculator-progress">
              {[1, 2, 3, 4, 5, 6].map(step => (
                <div 
                  key={step} 
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                >
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 ? 'Umzugstyp' : 
                     step === 2 ? 'Größe' : 
                     step === 3 ? 'Inventar' : 
                     step === 4 ? 'Leistungen' : 
                     step === 5 ? 'Zugang alt' : 'Zugang neu'}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="calculator-content">
            {renderCurrentStep()}
          </div>
          
          {/* Navigation buttons, nur sichtbar wenn kein Ergebnis angezeigt wird */}
          {calculatedPrice === null && (
            <div className="calculator-navigation">
              {currentStep > 1 && (
                <button 
                  className="btn btn-secondary" 
                  onClick={handlePrevStep}
                >
                  Zurück
                </button>
              )}
              
              <button 
                className="btn btn-primary" 
                onClick={handleNextStep}
                disabled={currentStep === 1 && !formData.movingType}
              >
                {currentStep === 6 ? 'Berechnen' : 'Weiter'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;