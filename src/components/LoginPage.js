import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/LoginPage.css'; // Import the CSS styles
import cricketImg from '../images/cricket.png'; 
import manifestImg from '../images/manifest.png';
import hiddenIcon from '../images/hidden.png';
import eyeIcon from '../images/eye.png';
// import axios from 'axios';
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const deviceId = localStorage.getItem("device_id"); // Retrieve stored device ID

  const navigate = useNavigate(); // Get the navigation function

  //const apiUrl = 'http://localhost:8000/'; 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const response = await axiosInstance.post(`/login`, {email, password},
            {
                headers: {
                  "Device-ID": deviceId || "", // Send stored device ID (if exists)
                },
            }
        );
        
       
        console.log('Response:', response.data);
        if (response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("device_id", response.data.device_id);
            console.log("Login successful, Device ID:", response.data.device_id);
          setError(null);
          alert('Login successful');
         // redirect('/dashboard');
         navigate('/dashboard'); 
          // Redirect to the dashboard
        } else {
          setError(response.data.message);
        }
      } else {
        setError('Please enter email and password');
      }
    } catch (error) {
        setError('Something went wrong');
    }
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="illustration">
        <img src={cricketImg} alt="Illustration" /> 
      </div>
      <div className="login-form">
        <div className="logo">
          <img src={manifestImg} alt="Manifest5 Logo" /> 
        </div>
        <h2>Welcome To Admin Panel</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <img
              src={showPassword ? eyeIcon : hiddenIcon} 
              alt="Eye Icon"
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;