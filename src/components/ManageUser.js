import React from 'react';
import { useState, useEffect,useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import Header from './Header';
import Sidebar from './Sidebar';
import SearchUser from './SearchUser';
import UserTable from './UserTable';
import '../styles/ManageUser.css';

const ManageUser = () => {
    const [users, setUsers] = useState([]); // ✅ Store users here
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token"); // Check if logged in
   

    // ✅ Wrap fetchUsers in useCallback to avoid re-creation
    const fetchUsers = useCallback(async () => {
        try {
        const response = await axiosInstance.get("/users", {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        setUsers(response.data);
        } catch (error) {
        console.error("Error fetching users:", error);
        }
    }, [authToken]);  // ✅ Dependency array only includes authToken

    useEffect(() => {
        if (!authToken) {
          navigate("/login"); // Redirect if not logged in
        }
        fetchUsers(); 
      }, [authToken, navigate,fetchUsers]);

 
    return (
        <div className="manageUser">
        <Header />
        <div className="manageUser-container">
          <Sidebar />
          <div className="main-content">
            <SearchUser onUserAdded={fetchUsers} />
          </div>
        </div>
      </div>
    );
};

export default ManageUser;
