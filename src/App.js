// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout';

// Pages - Direct imports statt lazy loading für den Start
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicesPage from './pages/ServicesPage';
import PrivateMovingPage from './pages/services/PrivateMovingPage';
import OfficeMovingPage from './pages/services/OfficeMovingPage';
import LibraryMovingPage from './pages/services/LibraryMovingPage';
import LabMovingPage from './pages/services/LabMovingPage';
import StoragePage from './pages/services/StoragePage';
import CalculatorPage from './pages/CalculatorPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ImpressumPage from './pages/legal/ImpressumPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsPage from './pages/legal/TermsPage';

// Wir können den Context später hinzufügen, wenn wir ihn implementieren
// import { CalculatorProvider } from './context/CalculatorContext';

// Da wir noch nicht alle Komponenten fertig haben, verwenden wir zunächst
// eine vereinfachte Version ohne CalculatorProvider und Lazy Loading
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<ServicesPage />} />
          <Route path="leistungen/privatumzug" element={<PrivateMovingPage />} />
          <Route path="leistungen/bueroumzug" element={<OfficeMovingPage />} />
          <Route path="leistungen/buechereiumzug" element={<LibraryMovingPage />} />
          <Route path="leistungen/laborumzug" element={<LabMovingPage />} />
          <Route path="leistungen/lagerung" element={<StoragePage />} />
          <Route path="kostenrechner" element={<CalculatorPage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="referenzen" element={<TestimonialsPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          
          {/* Legal Pages */}
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<PrivacyPolicyPage />} />
          <Route path="agb" element={<TermsPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;