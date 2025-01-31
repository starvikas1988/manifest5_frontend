import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import UserTable from "./UserTable";
import "../styles/SearchUser.css";

const SearchUser = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState({
    name: "",
    email: "",
    phoneno: "",
    role: "",
    device_id: "",
    effective_date: "",
    cease_date: "",
  });

  // ✅ Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [authToken]);

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [authToken, navigate, fetchUsers]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  // ✅ Handle search
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get("/users/search", {
        params: searchData,
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  // ✅ Handle reset
  const handleReset = () => {
    setSearchData({
      name: "",
      email: "",
      phoneno: "",
      role: "",
      device_id: "",
      effective_date: "",
      cease_date: "",
    });
    fetchUsers();
  };

  return (
    <div className="searchUser">
      <div className="searchUser-container">
        <div className="main-content">
          <div className="form-section">
            <h3>MANAGE USER</h3>
            <div className="form-grid">
              <div>
                <label>Name</label>
                <input type="text" name="name" value={searchData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Email ID</label>
                <input type="email" name="email" value={searchData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Mobile No.</label>
                <input type="text" name="phoneno" value={searchData.phoneno} onChange={handleChange} />
              </div>
              <div>
                <label>User Type</label>
                <select name="role" value={searchData.role} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
              <div>
                <label>Device ID</label>
                <input type="text" name="device_id" value={searchData.device_id} onChange={handleChange} />
              </div>
              <div>
                <label>Effective Date</label>
                <input type="date" name="effective_date" value={searchData.effective_date} onChange={handleChange} />
              </div>
              <div>
                <label>Cease Date</label>
                <input type="date" name="cease_date" value={searchData.cease_date} onChange={handleChange} />
              </div>
            </div>

            <div className="buttons">
              <button className="search" onClick={handleSearch}>🔍 Search</button>
              <button className="refresh" onClick={fetchUsers}>🔄 Refresh</button>
              <button className="cancel" onClick={handleReset}>❌ Cancel</button>
            </div>
          </div>

          <UserTable users={users} refreshUsers={fetchUsers} />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
