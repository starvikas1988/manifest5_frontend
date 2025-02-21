import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import Header from './Header';
import Sidebar from './Sidebar';
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../styles/Dashboard.css';

const OperatorDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token"); // Check if logged in

  useEffect(() => {
      if (!authToken) {
        navigate("/login"); // Redirect if not logged in
      }
      fetchUsers();
    }, [authToken, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
  const handleUserAdded =  () => {
    fetchUsers();
  }

  const handleLogout = async () => {
    try {
      // Get the token from localStorage
    

      if (!authToken) {
        // Handle the case where no token is found
        //console.error("No token found in localStorage");
        return; // Exit the function if no token is available
      }

      // Prepare the request headers with the token
      const headers = {
        Authorization: `Bearer ${authToken}`, // Assuming your API expects a Bearer token
      };

      // Make the logout request to the API
      const response = await axiosInstance.post('/logout', null, { headers });
      //console.log("Logout response:", response.data);
      // Check for successful logout response (optional)
      if (response.data.success) {
       // console.log("Logout successful from server");
      }

      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('device_id');

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
     // console.error("Logout failed:", error);
      // Optionally, display an error message to the user
      alert("Logout failed. Please try again.");
    }
  };
    return (
        <div className="dashboard">
        <Header />
        <div className="dashboard-container">
          <Sidebar />
          <div className="main-content">
            <UserForm onUserAdded={handleUserAdded} />
            <UserTable users={users} refreshUsers={fetchUsers}/>
          </div>
        </div>
      </div>
    );
};

export default OperatorDashboard;
