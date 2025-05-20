// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page section">
      <div className="container text-center">
        <h1>404</h1>
        <h2>Seite nicht gefunden</h2>
        <p>Die von Ihnen gesuchte Seite existiert leider nicht.</p>
        <Link to="/" className="btn btn-primary">Zurück zur Startseite</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;