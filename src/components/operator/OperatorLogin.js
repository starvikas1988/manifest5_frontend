import React,{useState} from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../../styles/operator/OperatorLogin.css"; // Import the custom CSS file
import axiosInstance from "../../utils/axiosInstance";

const OperatorLogin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const deviceId = localStorage.getItem("device_id"); // Retrieve stored device ID    
    const navigate = useNavigate(); // Get the navigate function

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {   
        setPassword(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (email && password) {
                const response = await axiosInstance.post(`/operator_login`, {email, password},
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
                    localStorage.setItem("operator_id", response.data.operator_id);
                    console.log("Login successful, Device ID:", response.data.device_id);
                    setError(null);
                    alert('Login successful');
                    navigate('/operator_dashboard'); 
                } else {
                    console.log('Response:', response.data);
                    setError(response.data.message);
                }
            } else {
                setError('Please enter email and password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    }
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-section">
          <img src="../images/cricket_login.png" alt="Cricket Theme" />
        </div>
        <div className="login-form-section">
        <img src="../images/logo5.png" alt="Cricket Theme" />
          <h3>Operator Login</h3>
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
              placeholder="User Name"
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
              <a href="#"><img src="../images/FORGOT_PASSWORD.png" /></a>
            </div>
            <button className="button_tag" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OperatorLogin;
