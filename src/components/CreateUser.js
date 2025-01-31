import React from 'react';
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import Header from './Header';
import Sidebar from './Sidebar';
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../styles/CreateUser.css';

const CreateUser = () => {
  const [users, setUsers] = useState([]); // ✅ Store users here
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token"); // Check if logged in

    useEffect(() => {
        if (!authToken) {
          navigate("/login"); // Redirect if not logged in
        }
        fetchUsers(); 
      }, [authToken, navigate]);
  
       // ✅ Fetch users from API
   const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(response.data); // ✅ Set users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }; 
  
    return (
        <div className="createUser">
        <Header />
        <div className="createUser-container">
          <Sidebar />
          <div className="main-content">
            <UserForm  onUserAdded={fetchUsers}/>
            <UserTable users={users} refreshUsers={fetchUsers}/>
          </div>
        </div>
      </div>
    );
};

export default CreateUser;
