// src/context/CalculatorContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Erstelle den Context
const CalculatorContext = createContext();

// Initialer State
const initialState = {
  currentStep: 1,
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
  },
  calculatedPrice: null,
  priceBreakdown: {}
};

// Preisdaten
const PRICE_DATA = {
  basePrice: {
    privateMoving: 300,
    officeMoving: 500,
    libraryMoving: 600,
    labMoving: 750
  },
  sizeMultiplier: {
    privateMoving: 2.5,
    officeMoving: 3.5,
    libraryMoving: 4.0,
    labMoving: 5.0
  },
  distancePrice: {
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
    labEquipment: {
      small: 30,
      medium: 100,
      large: 250
    },
    books: {
      shelfMeter: 15
    }
  },
  additionalServices: {
    packing: 150,
    assembly: 120,
    disposal: 200,
    storage: 100,
    cleaning: 180,
    specialPacking: 250,
    cataloging: 300
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

// Reducer-Funktion
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep < 6 ? state.currentStep + 1 : state.currentStep
      };
    
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: state.currentStep > 1 ? state.currentStep - 1 : state.currentStep
      };
    
    case 'SET_MOVING_TYPE':
      return {
        ...state,
        movingType: action.payload
      };
    
    case 'SET_SIZE':
      return {
        ...state,
        size: action.payload
      };
    
    case 'SET_DISTANCE':
      return {
        ...state,
        distance: action.payload
      };
    
    case 'SET_FURNITURE':
      return {
        ...state,
        furniture: {
          ...state.furniture,
          [action.payload.type]: action.payload.value
        }
      };
    
    case 'SET_SPECIAL_ITEM':
      return {
        ...state,
        specialItems: {
          ...state.specialItems,
          [action.payload.category]: {
            ...state.specialItems[action.payload.category],
            [action.payload.type]: action.payload.value
          }
        }
      };
    
    case 'SET_ADDITIONAL_SERVICE':
      return {
        ...state,
        additionalServices: {
          ...state.additionalServices,
          [action.payload.service]: action.payload.value
        }
      };
    
    case 'SET_ACCESS':
      return {
        ...state,
        [action.payload.location]: {
          ...state[action.payload.location],
          [action.payload.property]: action.payload.value
        }
      };
    
    case 'CALCULATE_PRICE':
      const calculatedPrice = calculatePrice(state);
      return {
        ...state,
        calculatedPrice: calculatedPrice.totalPrice,
        priceBreakdown: calculatedPrice.breakdown
      };
    
    case 'RESET_CALCULATOR':
      return {
        ...initialState,
        currentStep: 1
      };
    
    default:
      return state;
  }
}

// Hilfsfunktion zur Preisberechnung
function calculatePrice(state) {
  // Basispreis je nach Umzugstyp
  let price = PRICE_DATA.basePrice[state.movingType];
  
  // Preisaufschlag basierend auf Größe
  const sizePrice = state.size * PRICE_DATA.sizeMultiplier[state.movingType];
  price += sizePrice;
  
  // Preisaufschlag basierend auf Entfernung
  let distancePrice = 0;
  if (state.distance <= 50) {
    distancePrice = state.distance * PRICE_DATA.distancePrice.base;
  } else if (state.distance <= 100) {
    distancePrice = 50 * PRICE_DATA.distancePrice.base + 
             (state.distance - 50) * PRICE_DATA.distancePrice.above50km;
  } else {
    distancePrice = 50 * PRICE_DATA.distancePrice.base + 
             50 * PRICE_DATA.distancePrice.above50km +
             (state.distance - 100) * PRICE_DATA.distancePrice.above100km;
  }
  price += distancePrice;
  
  // Preisaufschlag für Möbel (bei Privat- und Büroumzügen)
  let furniturePrice = 0;
  if (['privateMoving', 'officeMoving'].includes(state.movingType)) {
    furniturePrice = 
      state.furniture.small * PRICE_DATA.furniturePrice.small +
      state.furniture.medium * PRICE_DATA.furniturePrice.medium +
      state.furniture.large * PRICE_DATA.furniturePrice.large;
  }
  price += furniturePrice;
  
  // Preisaufschlag für spezielle Gegenstände (bei Labor- und Büchereiumzügen)
  let specialItemsPrice = 0;
  if (state.movingType === 'labMoving') {
    specialItemsPrice = 
      state.specialItems.labEquipment.small * PRICE_DATA.specialItemsPrice.labEquipment.small +
      state.specialItems.labEquipment.medium * PRICE_DATA.specialItemsPrice.labEquipment.medium +
      state.specialItems.labEquipment.large * PRICE_DATA.specialItemsPrice.labEquipment.large;
  } else if (state.movingType === 'libraryMoving') {
    specialItemsPrice = state.specialItems.books.shelfMeter * PRICE_DATA.specialItemsPrice.books.shelfMeter;
  }
  price += specialItemsPrice;
  
  // Zusätzliche Dienste
  let additionalServicesPrice = 0;
  Object.keys(state.additionalServices).forEach(service => {
    if (state.additionalServices[service] && PRICE_DATA.additionalServices[service]) {
      additionalServicesPrice += PRICE_DATA.additionalServices[service];
    }
  });
  price += additionalServicesPrice;
  
  // Erschwernis beim Zugang (alter Standort)
  let accessOldPrice = 0;
  if (!state.accessOld.elevator) {
    accessOldPrice += PRICE_DATA.accessDifficulty.noElevator[state.accessOld.floor];
  }
  accessOldPrice += PRICE_DATA.accessDifficulty.parkingDifficulty[state.accessOld.parking];
  
  // Erschwernis beim Zugang (neuer Standort)
  let accessNewPrice = 0;
  if (!state.accessNew.elevator) {
    accessNewPrice += PRICE_DATA.accessDifficulty.noElevator[state.accessNew.floor];
  }
  accessNewPrice += PRICE_DATA.accessDifficulty.parkingDifficulty[state.accessNew.parking];
  
  price += accessOldPrice + accessNewPrice;
  
  // Preisübersicht erstellen
  const breakdown = {
    basePrice: PRICE_DATA.basePrice[state.movingType],
    sizePrice,
    distancePrice,
    furniturePrice,
    specialItemsPrice,
    additionalServicesPrice,
    accessOldPrice,
    accessNewPrice,
    totalPrice: price
  };
  
  return {
    totalPrice: price,
    breakdown
  };
}

// Provider-Komponente
export function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  // Aktionen für den Calculator
  const setStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };
  
  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };
  
  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };
  
  const setMovingType = (type) => {
    dispatch({ type: 'SET_MOVING_TYPE', payload: type });
  };
  
  const setSize = (size) => {
    dispatch({ type: 'SET_SIZE', payload: size });
  };
  
  const setDistance = (distance) => {
    dispatch({ type: 'SET_DISTANCE', payload: distance });
  };
  
  const setFurniture = (type, value) => {
    dispatch({ type: 'SET_FURNITURE', payload: { type, value } });
  };
  
  const setSpecialItem = (category, type, value) => {
    dispatch({ type: 'SET_SPECIAL_ITEM', payload: { category, type, value } });
  };
  
  const setAdditionalService = (service, value) => {
    dispatch({ type: 'SET_ADDITIONAL_SERVICE', payload: { service, value } });
  };
  
  const setAccess = (location, property, value) => {
    dispatch({ type: 'SET_ACCESS', payload: { location, property, value } });
  };
  
  const calculatePrice = () => {
    dispatch({ type: 'CALCULATE_PRICE' });
  };
  
  const resetCalculator = () => {
    dispatch({ type: 'RESET_CALCULATOR' });
  };
  
  // Stellte Aktionen und State über den Context bereit
  const value = {
    state,
    setStep,
    nextStep,
    prevStep,
    setMovingType,
    setSize,
    setDistance,
    setFurniture,
    setSpecialItem,
    setAdditionalService,
    setAccess,
    calculatePrice,
    resetCalculator,
    PRICE_DATA
  };
  
  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Custom Hook zum Verwenden des Calculators
export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}