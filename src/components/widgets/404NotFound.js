// src/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1" style={{ color: '#F7941E' }}>404</h1>
      <p className="lead" style={{ color: '#333' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-warning btn-lg" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Go to Home
      </Link>
    
        <img 
          src="assets/images/404NotFound.webp" 
          alt="404 Illustration" 
          style={{ maxWidth: '20%', height: 'auto' }} 
        />
      
    </div>
  );
};

export default NotFound;
