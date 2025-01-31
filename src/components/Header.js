import React from 'react';
import '../styles/Header.css';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="images/manifest.png" alt="Logo" />
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Header;
