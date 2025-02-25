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
  const [modalStep, setModalStep] = useState(null); // Tracks which modal is open
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword_confirmation, setnewPassword_confirmation] = useState('');
  const [error, setError] = useState(null);
  const deviceId = localStorage.getItem("device_id"); // Retrieve stored device ID
  const [passwordVisible, setPasswordVisible] = useState(false);

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
            localStorage.setItem('user_name', response.data.user_name);
            localStorage.setItem("device_id", response.data.device_id);
            console.log("Login successful, Device ID:", response.data.device_id);
          setError(null);
          alert('Login successful');
         // redirect('/dashboard');
         navigate('/dashboard'); 
          // Redirect to the dashboard
        } else {
          console.log('Response:', response.data);
          setError(response.data.message);
        }
        console.log("okk");
      } else {
        setError('Please enter email and password');
      }
    } catch (error) {
      setError(error.response.data.message || 'Something went wrong!');
      console.log("not okk");
       // setError('Something went wrong');
    }
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  // Step 1: Generate OTP
  const handleGenerateOtp = async () => {
    if (!email) return alert('Please enter your email');
    try {
      await axiosInstance.post(`/generateOtpMail`, { email });
      setModalStep('otp'); // Open OTP modal
    } catch (error) {
      alert(error.response?.data?.message || 'Error generating OTP');
    }
  };

  // Step 2: Validate OTP

  const handleValidateOtp = async () => {
    if (!otp) return alert('Please enter the OTP');
  
    try {
      const response = await axiosInstance.post(`/validateOtp`, { email, otp });
     // console.log(response.data);
      if (response.data.message === "OTP verified successfully") {
        setModalStep('resetPassword'); // Open Reset Password modal
        
         // Redirect to the dashboard
      } else {
        alert(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error validating OTP');
    }
  };

    // Step 3: Reset Password
    const handleResetPassword = async () => {
      if (!newPassword || !newPassword_confirmation) return alert('Please fill all fields');
      if (newPassword !== newPassword_confirmation) return alert('Passwords do not match');
      try {
        await axiosInstance.post(`/resetPassword`, { email, newPassword,newPassword_confirmation });
        alert('Password reset successful');
        setModalStep(null); // Close modal
      } catch (error) {
        alert(error.response?.data?.message || 'Error resetting password');
      }
    };

  return (
    <>
     <div className="login-container">
      <div className="login-box">
        <div className="image-section">
          <img src="../images/cricket_login.png" alt="Cricket Theme" />
        </div>
        <div className="login-form-section">
        <img src="../images/logo5.png" alt="Cricket Theme" />
          <h3>Admin Login</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
            {/* <img
                src="../images/account_circle.png"
                alt="User Icon"
                className="user-icon"
              /> */}
             <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            </div>
            <div className="input-group">
            <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <img
                src="../images/visibility.png" // Replace with your image path
                alt="Toggle Password Visibility"
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>
            <div className="forgot-password">
              <a href="#" onClick={() => setModalStep('email')} ><img src="../images/FORGOT_PASSWORD.png" /></a>
            </div>
            <button className="button_tag" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
        {/* Modals */}
        {modalStep === 'email' && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Your Email</h3>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleGenerateOtp}>Send OTP</button>
            <button onClick={() => setModalStep(null)}>Cancel</button>
          </div>
        </div>
      )}

      {modalStep === 'otp' && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter OTP</h3>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleValidateOtp}>Verify OTP</button>
            <button onClick={() => setModalStep(null)}>Cancel</button>
          </div>
        </div>
      )}

      {modalStep === 'resetPassword' && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reset Password</h3>
            <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm password" value={newPassword_confirmation} onChange={(e) => setnewPassword_confirmation(e.target.value)} />
            <button onClick={handleResetPassword}>Reset Password</button>
            <button onClick={() => setModalStep(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </>
  
  );
}

export default LoginPage;