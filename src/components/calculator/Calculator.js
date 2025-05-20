// src/components/calculator/Calculator.js
import React, { useState, useEffect } from 'react';
import CalculatorStep from './CalculatorStep';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';
import './Calculator.css';

// Preisdaten - könnten aus einer externen JSON-Datei geladen werden
const PRICE_DATA = {
  basePrice: {
    privateMoving: 300,
    officeMoving: 500,
    libraryMoving: 600,
    labMoving: 750
  },
  sizeMultiplier: {
    // Preis pro m²
    privateMoving: 2.5,
    officeMoving: 3.5,
    libraryMoving: 4.0,
    labMoving: 5.0
  },
  distancePrice: {
    // Preis pro km
    base: 1.5,
    above50km: 1.2,
    above100km: 0.9
  },
  furniturePrice: {
    small: 10,
    medium: 25,
    large: 50
  },
  specialItemsPrice: {
    // Für Labor- und Bibliotheksumzüge
    labEquipment: {
      small: 30, // Kleingeräte
      medium: 100, // Mittelgroße Geräte
      large: 250 // Großgeräte
    },
    books: {
      // Preis pro Regalmeter
      shelfMeter: 15
    }
  },
  additionalServices: {
    packing: 150,
    assembly: 120,
    disposal: 200,
    storage: 100,
    cleaning: 180,
    specialPacking: 250, // Für empfindliche Laborgeräte
    cataloging: 300 // Für Büchereiumzüge
  },
  accessDifficulty: {
    elevator: 0,
    noElevator: {
      ground: 0,
      firstFloor: 50,
      secondFloor: 100,
      thirdFloor: 150,
      aboveThirdFloor: 200
    },
    parkingDifficulty: {
      easy: 0,
      medium: 50,
      difficult: 100
    }
  }
};

const Calculator = () => {
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
  const [priceBreakdown, setPriceBreakdown] = useState({});

  // Berechnung des Preises
  const calculatePrice = () => {
    // Basispreis je nach Umzugstyp
    let price = PRICE_DATA.basePrice[formData.movingType];
    
    // Preisaufschlag basierend auf Größe
    price += formData.size * PRICE_DATA.sizeMultiplier[formData.movingType];
    
    // Preisaufschlag basierend auf Entfernung
    if (formData.distance <= 50) {
      price += formData.distance * PRICE_DATA.distancePrice.base;
    } else if (formData.distance <= 100) {
      price += 50 * PRICE_DATA.distancePrice.base + 
               (formData.distance - 50) * PRICE_DATA.distancePrice.above50km;
    } else {
      price += 50 * PRICE_DATA.distancePrice.base + 
               50 * PRICE_DATA.distancePrice.above50km +
               (formData.distance - 100) * PRICE_DATA.distancePrice.above100km;
    }
    
    // Preisaufschlag für Möbel (bei Privat- und Büroumzügen)
    let furniturePrice = 0;
    if (['privateMoving', 'officeMoving'].includes(formData.movingType)) {
      furniturePrice = 
        formData.furniture.small * PRICE_DATA.furniturePrice.small +
        formData.furniture.medium * PRICE_DATA.furniturePrice.medium +
        formData.furniture.large * PRICE_DATA.furniturePrice.large;
    }
    price += furniturePrice;
    
    // Preisaufschlag für spezielle Gegenstände (bei Labor- und Büchereiumzügen)
    let specialItemsPrice = 0;
    if (formData.movingType === 'labMoving') {
      specialItemsPrice = 
        formData.specialItems.labEquipment.small * PRICE_DATA.specialItemsPrice.labEquipment.small +
        formData.specialItems.labEquipment.medium * PRICE_DATA.specialItemsPrice.labEquipment.medium +
        formData.specialItems.labEquipment.large * PRICE_DATA.specialItemsPrice.labEquipment.large;
    } else if (formData.movingType === 'libraryMoving') {
      specialItemsPrice = formData.specialItems.books.shelfMeter * PRICE_DATA.specialItemsPrice.books.shelfMeter;
    }
    price += specialItemsPrice;
    
    // Zusätzliche Dienste
    let additionalServicesPrice = 0;
    Object.keys(formData.additionalServices).forEach(service => {
      if (formData.additionalServices[service] && PRICE_DATA.additionalServices[service]) {
        additionalServicesPrice += PRICE_DATA.additionalServices[service];
      }
    });
    price += additionalServicesPrice;
    
    // Erschwernis beim Zugang (alter Standort)
    let accessOldPrice = 0;
    if (!formData.accessOld.elevator) {
      accessOldPrice += PRICE_DATA.accessDifficulty.noElevator[formData.accessOld.floor];
    }
    accessOldPrice += PRICE_DATA.accessDifficulty.parkingDifficulty[formData.accessOld.parking];
    
    // Erschwernis beim Zugang (neuer Standort)
    let accessNewPrice = 0;
    if (!formData.accessNew.elevator) {
      accessNewPrice += PRICE_DATA.accessDifficulty.noElevator[formData.accessNew.floor];
    }
    accessNewPrice += PRICE_DATA.accessDifficulty.parkingDifficulty[formData.accessNew.parking];
    
    price += accessOldPrice + accessNewPrice;
    
    // Preisübersicht erstellen
    const breakdown = {
      basePrice: PRICE_DATA.basePrice[formData.movingType],
      sizePrice: formData.size * PRICE_DATA.sizeMultiplier[formData.movingType],
      distancePrice: formData.distance <= 50 
        ? formData.distance * PRICE_DATA.distancePrice.base
        : formData.distance <= 100
          ? 50 * PRICE_DATA.distancePrice.base + (formData.distance - 50) * PRICE_DATA.distancePrice.above50km
          : 50 * PRICE_DATA.distancePrice.base + 50 * PRICE_DATA.distancePrice.above50km + (formData.distance - 100) * PRICE_DATA.distancePrice.above100km,
      furniturePrice,
      specialItemsPrice,
      additionalServicesPrice,
      accessOldPrice,
      accessNewPrice,
      totalPrice: price
    };
    
    setCalculatedPrice(price);
    setPriceBreakdown(breakdown);
  };

  // Formular-Handler
  const handleInputChange = (field, value) => {
    setFormData(prevData => {
      // Für verschachtelte Objekte
      if (field.includes('.')) {
        const parts = field.split('.');
        if (parts.length === 2) {
          return {
            ...prevData,
            [parts[0]]: {
              ...prevData[parts[0]],
              [parts[1]]: value
            }
          };
        } else if (parts.length === 3) {
          return {
            ...prevData,
            [parts[0]]: {
              ...prevData[parts[0]],
              [parts[1]]: {
                ...prevData[parts[0]][parts[1]],
                [parts[2]]: value
              }
            }
          };
        }
      }
      
      // Für einfache Felder
      return {
        ...prevData,
        [field]: value
      };
    });
  };
  
  // Next Step Handler
  const handleNextStep = () => {
    if (currentStep === 6) {
      calculatePrice();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Previous Step Handler
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Dynamische Anzeige basierend auf dem Umzugstyp
  const renderMovingTypeSpecificContent = () => {
    switch (formData.movingType) {
      case 'privateMoving':
      case 'officeMoving':
        return (
          <div className="calculator-furniture">
            <div className="form-group">
              <label htmlFor="smallFurniture">Kleine Möbelstücke (Stühle, kleine Tische, etc.):</label>
              <input 
                type="number" 
                id="smallFurniture" 
                value={formData.furniture.small} 
                onChange={(e) => handleInputChange('furniture.small', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mediumFurniture">Mittlere Möbelstücke (Schreibtisch, Sideboard, etc.):</label>
              <input 
                type="number" 
                id="mediumFurniture" 
                value={formData.furniture.medium} 
                onChange={(e) => handleInputChange('furniture.medium', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="largeFurniture">Große Möbelstücke (Schrank, Sofa, Bett, etc.):</label>
              <input 
                type="number" 
                id="largeFurniture" 
                value={formData.furniture.large} 
                onChange={(e) => handleInputChange('furniture.large', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        );
      case 'labMoving':
        return (
          <div className="calculator-lab-equipment">
            <div className="form-group">
              <label htmlFor="smallEquipment">Kleingeräte (bis 5kg):</label>
              <input 
                type="number" 
                id="smallEquipment" 
                value={formData.specialItems.labEquipment.small} 
                onChange={(e) => handleInputChange('specialItems.labEquipment.small', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mediumEquipment">Mittelgroße Geräte (5-50kg):</label>
              <input 
                type="number" 
                id="mediumEquipment" 
                value={formData.specialItems.labEquipment.medium} 
                onChange={(e) => handleInputChange('specialItems.labEquipment.medium', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="largeEquipment">Großgeräte (über 50kg):</label>
              <input 
                type="number" 
                id="largeEquipment" 
                value={formData.specialItems.labEquipment.large} 
                onChange={(e) => handleInputChange('specialItems.labEquipment.large', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        );
      case 'libraryMoving':
        return (
          <div className="calculator-library">
            <div className="form-group">
              <label htmlFor="shelfMeter">Regalmeter Bücher:</label>
              <input 
                type="number" 
                id="shelfMeter" 
                value={formData.specialItems.books.shelfMeter} 
                onChange={(e) => handleInputChange('specialItems.books.shelfMeter', parseInt(e.target.value) || 0)}
                min="0"
              />
              <p className="form-hint">Ein Regalmeter entspricht ca. 50-60 Büchern.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="calculator-no-selection">
            <p>Bitte wählen Sie zuerst einen Umzugstyp aus.</p>
          </div>
        );
    }
  };
  
  // Dynamische Anzeige der Zusatzleistungen basierend auf dem Umzugstyp
  const renderAdditionalServices = () => {
    let services = [
      { id: 'packing', label: 'Einpackservice (+150€)', types: ['privateMoving', 'officeMoving', 'libraryMoving', 'labMoving'] },
      { id: 'assembly', label: 'Möbelmontage/-demontage (+120€)', types: ['privateMoving', 'officeMoving'] },
      { id: 'disposal', label: 'Entsorgung (+200€)', types: ['privateMoving', 'officeMoving'] },
      { id: 'storage', label: 'Zwischenlagerung (+100€)', types: ['privateMoving', 'officeMoving', 'libraryMoving', 'labMoving'] },
      { id: 'cleaning', label: 'Reinigungsservice (+180€)', types: ['privateMoving', 'officeMoving'] },
      { id: 'specialPacking', label: 'Spezialverpackung für empfindliche Geräte (+250€)', types: ['labMoving'] },
      { id: 'cataloging', label: 'Katalogisierung und systematische Verpackung (+300€)', types: ['libraryMoving'] },
    ];
    
    // Filtere Services basierend auf dem ausgewählten Umzugstyp
    const filteredServices = services.filter(service => service.types.includes(formData.movingType));
    
    return (
      <div className="calculator-services">
        {filteredServices.map(service => (
          <div key={service.id} className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id={service.id} 
              checked={formData.additionalServices[service.id] || false} 
              onChange={(e) => handleInputChange(`additionalServices.${service.id}`, e.target.checked)}
            />
            <label htmlFor={service.id}>{service.label}</label>
          </div>
        ))}
      </div>
    );
  };
  
  // Schritte des Rechners
  const steps = [
    {
      id: 1,
      title: "Umzugstyp",
      content: (
        <div className="calculator-type-selection">
          <div className="form-group">
            <label htmlFor="movingType">Wählen Sie Ihren Umzugstyp:</label>
            <select 
              id="movingType" 
              value={formData.movingType} 
              onChange={(e) => handleInputChange('movingType', e.target.value)}
              required
            >
              <option value="">Bitte wählen</option>
              <option value="privateMoving">Privatumzug</option>
              <option value="officeMoving">Büro-/Unternehmensumzug</option>
              <option value="libraryMoving">Büchereiumzug</option>
              <option value="labMoving">Laborumzug</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Größe & Entfernung",
      content: (
        <div className="calculator-size-distance">
          <div className="form-group">
            <label htmlFor="size">Größe (in m²):</label>
            <input 
              type="number" 
              id="size" 
              value={formData.size} 
              onChange={(e) => handleInputChange('size', parseInt(e.target.value) || 0)}
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
              onChange={(e) => handleInputChange('distance', parseInt(e.target.value) || 0)}
              min="0"
              required
            />
            <p className="form-hint">Distanz zwischen altem und neuem Standort</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Inventar",
      content: renderMovingTypeSpecificContent()
    },
    {
      id: 4,
      title: "Zusatzleistungen",
      content: renderAdditionalServices()
    },
    {
      id: 5,
      title: "Zugang alte Location",
      content: (
        <div className="calculator-access">
          <div className="form-group">
            <label htmlFor="oldFloor">Stockwerk:</label>
            <select 
              id="oldFloor" 
              value={formData.accessOld.floor} 
              onChange={(e) => handleInputChange('accessOld.floor', e.target.value)}
            >
              <option value="ground">Erdgeschoss</option>
              <option value="firstFloor">1. Stock</option>
              <option value="secondFloor">2. Stock</option>
              <option value="thirdFloor">3. Stock</option>
              <option value="aboveThirdFloor">Über 3. Stock</option>
            </select>
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="oldElevator" 
              checked={formData.accessOld.elevator} 
              onChange={(e) => handleInputChange('accessOld.elevator', e.target.checked)}
            />
            <label htmlFor="oldElevator">Aufzug vorhanden</label>
          </div>
          <div className="form-group">
            <label htmlFor="oldParking">Parkmöglichkeit:</label>
            <select 
              id="oldParking" 
              value={formData.accessOld.parking} 
              onChange={(e) => handleInputChange('accessOld.parking', e.target.value)}
            >
              <option value="easy">Gut (direkt vor der Tür)</option>
              <option value="medium">Mittel (bis 50m entfernt)</option>
              <option value="difficult">Schwierig (über 50m entfernt/keine Haltemöglichkeit)</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Zugang neue Location",
      content: (
        <div className="calculator-access">
          <div className="form-group">
            <label htmlFor="newFloor">Stockwerk:</label>
            <select 
              id="newFloor" 
              value={formData.accessNew.floor} 
              onChange={(e) => handleInputChange('accessNew.floor', e.target.value)}
            >
              <option value="ground">Erdgeschoss</option>
              <option value="firstFloor">1. Stock</option>
              <option value="secondFloor">2. Stock</option>
              <option value="thirdFloor">3. Stock</option>
              <option value="aboveThirdFloor">Über 3. Stock</option>
            </select>
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="newElevator" 
              checked={formData.accessNew.elevator} 
              onChange={(e) => handleInputChange('accessNew.elevator', e.target.checked)}
            />
            <label htmlFor="newElevator">Aufzug vorhanden</label>
          </div>
          <div className="form-group">
            <label htmlFor="newParking">Parkmöglichkeit:</label>
            <select 
              id="newParking" 
              value={formData.accessNew.parking} 
              onChange={(e) => handleInputChange('accessNew.parking', e.target.value)}
            >
              <option value="easy">Gut (direkt vor der Tür)</option>
              <option value="medium">Mittel (bis 50m entfernt)</option>
              <option value="difficult">Schwierig (über 50m entfernt/keine Haltemöglichkeit)</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  // Aktualisiere den Inhalt des dritten Schritts, wenn sich der Umzugstyp ändert
  useEffect(() => {
    steps[2].content = renderMovingTypeSpecificContent();
    steps[3].content = renderAdditionalServices();
  }, [formData.movingType]);

  return (
    <div className="calculator-container">
      <h2>Umzugskostenrechner</h2>
      <p className="calculator-description">
        Berechnen Sie schnell und einfach die geschätzten Kosten für Ihren Umzug.
        Beantworten Sie einige Fragen zu Ihrem Umzug, um ein unverbindliches Angebot zu erhalten.
      </p>
      
      {/* Fortschrittsanzeige */}
      <div className="calculator-progress">
        {steps.map(step => (
          <div 
            key={step.id} 
            className={`progress-step ${currentStep >= step.id ? 'active' : ''}`}
          >
            <div className="step-number">{step.id}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
      
      {calculatedPrice === null ? (
        <>
          {/* Formularschritte */}
          <div className="calculator-form">
            <CalculatorStep
              title={steps[currentStep - 1].title}
              content={steps[currentStep - 1].content}
            />
          </div>
          
          {/* Navigation Buttons */}
          <div className="calculator-buttons">
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
              {currentStep === steps.length ? 'Berechnen' : 'Weiter'}
            </button>
          </div>
        </>
      ) : (
        /* Ergebnisanzeige */
        <CalculatorResults 
          price={calculatedPrice} 
          breakdown={priceBreakdown}
          formData={formData}
          onRestart={() => {
            setCalculatedPrice(null);
            setCurrentStep(1);
          }}
        />
      )}
    </div>
  );
};

export default Calculator;