# Finaler Implementierungsplan für ASH Kurpfalz Umzüge Website

## 1. Projektübersicht

Die Website für ASH Kurpfalz Umzüge wird als professionelle React-basierte Multi-Page-Application implementiert. Die Site hebt die 20-jährige Erfahrung des Unternehmens hervor und bietet detaillierte Informationen zu allen Umzugsdienstleistungen (Privatumzüge, Büro-/Unternehmensumzüge, Büchereiumzüge und Laborumzüge) mit einem Fokus auf Conversion durch den interaktiven Umzugskostenrechner.

### Kernfunktionen

- Responsive Design mit den Unternehmensfarben #fcdc04 (Gelb) und #0474ac (Blau)
- Multi-Page-Structure für bessere SEO und klare Benutzerführung
- Spezialisierte Inhalte für alle Umzugstypen
- Interaktiver Umzugskostenrechner mit umzugstypspezifischen Optionen
- Kontaktformular und Call-to-Action Elemente
- Kundenreferenzen mit Testimonials
- Volles Set an rechtlichen Seiten (Impressum, Datenschutz, AGB)
- Cookie-Banner und Einwilligungsmanagement

## 2. Technologie-Stack

- **Frontend-Framework**: React.js
- **Styling**: CSS mit variables oder Optional: Tailwind CSS
- **Routing**: React Router v6
- **Formulare**: React Hook Form mit Yup-Validierung
- **State Management**: Context API für den Kostenrechner
- **Animation**: Framer Motion für subtile UI-Animationen
- **Icons**: React Icons
- **Deployment**: Node.js mit Express oder Vercel/Netlify

## 3. Implementierungsschritte

### Phase 1: Projektsetup (1-2 Tage)

1. React-Projekt erstellen mit Create React App

   ```bash
   npx create-react-app ash-kurpfalz-umzuege
   cd ash-kurpfalz-umzuege
   ```

2. Notwendige Dependencies installieren

   ```bash
   npm install react-router-dom react-hook-form yup @hookform/resolvers framer-motion react-icons
   ```

3. Ordnerstruktur implementieren (wie im bereitgestellten Artefakt)

   - Manuelle Erstellung der Ordnerstruktur
   - Anlegen grundlegender Component-Dateien

4. CSS-Variablen und Theming einrichten in `src/styles/variables.css`:

   ```css
   :root {
     --primary: #fcdc04;
     --secondary: #0474ac;
     --light: #f8f9fa;
     --dark: #343a40;
     /* weitere Variablen */
   }
   ```

5. Git-Repository einrichten:

   ```bash
   git init
   git add .
   git commit -m "Initial project setup"
   ```

### Phase 2: Grundlegende Komponenten (2-3 Tage)

1. Common Components implementieren:

   - Header mit Logo und Navigation
   - Footer mit Kontaktinformationen und Links
   - Button-Komponente mit verschiedenen Stilen
   - Container für einheitliche Seitenbreite
   - CookieBanner-Komponente

2. Routing einrichten in `src/App.js`:

   ```jsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import HomePage from './pages/HomePage';
   import ServicesPage from './pages/ServicesPage';
   import CalculatorPage from './pages/CalculatorPage';
   // weitere Imports
   
   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/leistungen" element={<ServicesPage />} />
           <Route path="/kostenrechner" element={<CalculatorPage />} />
           {/* weitere Routen */}
         </Routes>
       </BrowserRouter>
     );
   }
   ```

3. Implementierung der Logo-Komponente mit SVG:

   ```jsx
   const Logo = () => (
     <svg className="logo-img" width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
       {/* SVG-Pfade wie im HTML-Prototyp */}
     </svg>
   );
   ```

### Phase 3: Hauptseiten entwickeln (3-4 Tage)

1. Homepage mit Hero-Section, Services und CTA
2. Leistungsübersichtsseite
3. Detailseiten für jeden Umzugstyp:
   - Privatumzüge
   - Büro- und Unternehmensumzüge
   - Büchereiumzüge
   - Laborumzüge
4. Über uns Seite mit 20-jähriger Erfahrung
5. Referenzenseite mit Testimonials
6. Kontaktseite mit Formular und Google Maps
7. Rechtliche Seiten (Impressum, Datenschutz, AGB)

### Phase 4: Umzugskostenrechner (3-4 Tage)

1. `CalculatorContext.js` für State Management implementieren:

   ```jsx
   import { createContext, useContext, useState, useReducer } from 'react';
   
   const CalculatorContext = createContext();
   
   const initialState = {
     /* Status wie im Kostenrechner-Artefakt */
   };
   
   function calculatorReducer(state, action) {
     switch (action.type) {
       case 'SET_MOVING_TYPE':
         return { ...state, movingType: action.payload };
       // weitere Cases
       default:
         return state;
     }
   }
   
   export function CalculatorProvider({ children }) {
     const [state, dispatch] = useReducer(calculatorReducer, initialState);
     
     // Funktionen zum Ändern des States
     const setMovingType = (type) => {
       dispatch({ type: 'SET_MOVING_TYPE', payload: type });
     };
     
     return (
       <CalculatorContext.Provider value={{ state, setMovingType /* weitere Funktionen */ }}>
         {children}
       </CalculatorContext.Provider>
     );
   }
   
   export function useCalculator() {
     return useContext(CalculatorContext);
   }
   ```

2. Alle Rechner-Komponenten implementieren:

   - CalculatorStep
   - Schrittspezifische Formulare
   - CalculatorResults
   - Fortschrittsanzeige

3. Berechnungslogik implementieren:

   ```jsx
   const calculatePrice = () => {
     /* Implementierung wie im Kostenrechner-Artefakt */
   };
   ```

4. Integration mit React Hook Form für bessere Formularvalidierung

### Phase 5: Mobile Optimierung & UI Verbesserungen (2-3 Tage)

1. Responsive Design sicherstellen:

   ```css
   @media (max-width: 768px) {
     /* Mobile Styles */
   }
   
   @media (max-width: 480px) {
     /* Smartphone Styles */
   }
   ```

2. Hamburger-Menü für mobile Geräte:

   ```jsx
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   
   return (
     <nav>
       <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
         {/* Hamburger Icon */}
       </div>
       <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
         {/* Menüpunkte */}
       </ul>
     </nav>
   );
   ```

3. Animation für bessere UX mit Framer Motion:

   ```jsx
   import { motion } from 'framer-motion';
   
   const variants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0 }
   };
   
   return (
     <motion.div
       initial="hidden"
       animate="visible"
       variants={variants}
       transition={{ duration: 0.5 }}
     >
       {/* Inhalt */}
     </motion.div>
   );
   ```

4. Lazy Loading für Bilder und Komponenten:

   ```jsx
   import { lazy, Suspense } from 'react';
   
   const Calculator = lazy(() => import('./components/Calculator'));
   
   return (
     <Suspense fallback={<div>Lädt...</div>}>
       <Calculator />
     </Suspense>
   );
   ```

### Phase 6: Testing & Optimierung (2-3 Tage)

1. Cross-Browser-Tests (Chrome, Firefox, Safari, Edge)
2. Performance-Optimierung:
   - Komponentenoptimierung mit React.memo
   - Code-Splitting
   - Bildoptimierung
3. Accessibility (a11y) Tests:
   - Semantische HTML-Struktur
   - ARIA-Attribute
   - Tastaturnavigation
4. SEO-Optimierung:
   - Meta-Tags
   - Semantische Struktur
   - Sitemap.xml und robots.txt

### Phase 7: Finalisierung & Deployment (1-2 Tage)

1. Finale Qualitätssicherung

2. Deployment vorbereiten:

   ```bash
   npm run build
   ```

3. Umgebungsvariablen für Produktionsumgebung

4. Deployment auf Webserver/Hosting-Plattform

## 4. Umzugskostenrechner-Implementierung

Der Umzugskostenrechner ist ein zentrales Feature der Website. Er bietet eine dynamische Benutzeroberfläche, die sich je nach gewähltem Umzugstyp anpasst:

### Datenstruktur

Die Preisdaten werden in einer JSON-Datei gespeichert (`src/assets/data/calculator-data.json`):

```json
{
  "basePrice": {
    "privateMoving": 300,
    "officeMoving": 500,
    "libraryMoving": 600,
    "labMoving": 750
  },
  "sizeMultiplier": {
    "privateMoving": 2.5,
    "officeMoving": 3.5,
    "libraryMoving": 4.0,
    "labMoving": 5.0
  },
  /* weitere Preisdaten */
}
```

### Dynamische Formulare

Für jeden Umzugstyp werden spezifische Formularfelder angezeigt:

```jsx
const renderMovingTypeSpecificContent = () => {
  switch (formData.movingType) {
    case 'privateMoving':
    case 'officeMoving':
      return /* Möbelformular */;
    case 'labMoving':
      return /* Laborausrüstungsformular */;
    case 'libraryMoving':
      return /* Bibliotheksbestandsformular */;
    default:
      return /* Standardanzeige */;
  }
};
```

### Preisberechnung

Die Preisberechnung erfolgt schrittweise, basierend auf allen Benutzereingaben. Die Ergebnisse werden detailliert aufgeschlüsselt.

## 5. Zukunftssichere Erweiterbarkeit

Die Website-Architektur ist so gestaltet, dass sie leicht erweitert werden kann:

1. **CMS-Integration**: Vorbereitung für die spätere Anbindung an ein Headless CMS (z.B. Strapi, Contentful)
2. **Backend-API**: Schnittstellen für zukünftige Backend-Integration
3. **Analytics**: Vorbereitung für Conversion-Tracking und Nutzeranalyse
4. **Multi-Language Support**: Struktur für mehrsprachige Inhalte

## 6. Testing-Strategie

1. **Komponententests**: Jest und React Testing Library
2. **Browser-Tests**: Manuelle Tests in allen gängigen Browsern
3. **Validierungen**: HTML5, CSS3 und Accessibility (WCAG)
4. **Leistungstests**: Lighthouse und WebPageTest

## 7. Wartung und Updates

Nach dem Launch der Website wird ein regelmäßiger Wartungsplan empfohlen:

1. Monatliche Sicherheitsupdates
2. Quartalsweise Content-Aktualisierungen
3. Halbjährliche Feature-Erweiterungen
4. Jährliches Design-Refresh