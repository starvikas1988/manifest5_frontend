import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import "../styles/UserForm.css";

const UserForm = ({onUserAdded}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    role: "",
    effective_date: "",
    cease_date: "",
    device_id: "",
    host_name: "",
    status: "Active",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axiosInstance.post("/users", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage("User created successfully!");
      setFormData({
        name: "",
        email: "",
        phoneno: "",
        role: "",
        effective_date: "",
        cease_date: "",
        device_id: "",
        host_name: "",
        status: "Active",
      });
      onUserAdded(); // Notify Dashboard to refresh the table
    } catch (err) {
      setError(err.response?.data?.message || "Error creating user.");
    }
  };

  return (
    <div className="user-form">
      <div className="form-section">
        <h3>USER CREATION</h3>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email ID (User Name)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Mobile No.</label>
              <input type="text" name="phoneno" value={formData.mobile_no} onChange={handleChange} required />
            </div>
            <div>
              <label>User Type</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                {/* <option value="admin">Admin</option> */}
                <option value="user">User</option>
                <option value="operator">Operator</option>
              </select>
            </div>
            <div>
              <label>Effective Date</label>
              <input type="date" name="effective_date" value={formData.effective_date} onChange={handleChange} />
            </div>
            <div>
              <label>Cease Date</label>
              <input type="date" name="cease_date" value={formData.cease_date} onChange={handleChange} />
            </div>
          </div>

          {/* <h3>USER ACCESS DETAILS</h3>
          <div className="form-grid">
            <div>
              <label>User MAC ID (Device ID)</label>
              <input type="text" name="device_id" value={formData.device_id} onChange={handleChange} />
            </div>
            <div>
              <label>User Host Name</label>
              <input type="text" name="host_name" value={formData.host_name} onChange={handleChange}  min={formData.effective_date}/>
            </div>
          </div> */}

          {/* <h3>USER STATUS</h3>
          <div className="form-grid">
            <div>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div> */}

          <div className="buttons">
            <button type="submit" className="save">💾 Save</button>
            <button type="reset" className="refresh" onClick={() => setFormData({
              name: "", email: "", phoneno: "", role: "", effective_date: "", cease_date: "", device_id: "", host_name: "", status: "Active"
            })}>🔄 Refresh</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
