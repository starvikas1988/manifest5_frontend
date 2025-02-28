import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Header.css';
import profileImg from "../images/profile.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  return (
    <div className="header">
      <div className="logo">
        <img src="images/logo2.png" alt="Logo" />
      </div>
      {/* <button onClick={handleLogout} className="logout-button">
        Logout
      </button> */}
      <div className="profile-container">
        <img
          src={profileImg}
          alt="Profile"
          className="profile-image"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => navigate("/profile")}>{userName}</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
