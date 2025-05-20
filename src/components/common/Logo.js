// src/components/common/Logo.js
import React from 'react';

const Logo = () => {
  return (
    <svg className="logo-img" width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Außenkreis */}
      <circle cx="100" cy="100" r="95" fill="#fcdc04" stroke="#0474ac" strokeWidth="5"/>
      
      {/* A */}
      <path d="M70 140 L90 70 L110 70 L130 140 L110 140 L105 120 L95 120 L90 140 L70 140 Z M97 105 L103 105 L100 85 L97 105 Z" fill="#0474ac"/>
      
      {/* S */}
      <path d="M145 90 C145 80 135 75 125 75 C115 75 105 80 105 90 C105 135 145 115 145 140 C145 150 135 155 125 155 C115 155 105 150 105 140 L125 140 C125 145 145 145 125 130 C115 125 85 115 85 90 C85 75 95 65 125 65 C155 65 165 80 165 90 L145 90 Z" fill="#0474ac"/>
      
      {/* H */}
      <path d="M45 65 L65 65 L65 95 L75 95 L75 65 L95 65 L95 140 L75 140 L75 110 L65 110 L65 140 L45 140 L45 65 Z" fill="#0474ac"/>
      
      {/* Moving Icon */}
      <rect x="80" y="150" width="40" height="30" fill="#0474ac" rx="5"/>
      <rect x="90" y="145" width="20" height="5" fill="#0474ac"/>
    </svg>
  );
};

export default Logo;