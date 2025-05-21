// src/components/common/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Diese Komponente sorgt dafür, dass beim Seitenwechsel immer zum Anfang gescrollt wird.
 * Sie muss in der App.js oder im Router eingebettet werden.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sofort scrollen
    window.scrollTo(0, 0);
    
    // Zusätzlicher Scroll mit etwas Verzögerung (falls das erste nicht funktioniert)
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // Rendert nichts, nur Funktionalität
};

export default ScrollToTop;