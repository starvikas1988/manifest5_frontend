import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/UserTable.css"; 

const UserTable = ({ users, refreshUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" or "edit"
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    navigate("/login"); // Redirect if not logged in
  }

 

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  // ✅ Toggle User Status (Active <-> Inactive)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axiosInstance.put(`/users/${id}/status`, { status: newStatus }, { headers });
      refreshUsers(); // Refresh user list after status change
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Handle View/Edit
  const handleAction = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/users/${id}`, { headers });
        refreshUsers(); // Refresh user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="table-section">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Device ID</th>
            <th>Effective Date</th>
            <th>Cease Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10">No users found</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phoneno}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.device_id || "N/A"}</td> 
                <td>{user.effective_date || "N/A"}</td> 
                <td>{user.cease_date || "N/A"}</td>
                <td>
                  <button
                    className={`status ${user.status === "Active" ? "active" : "inactive"}`}
                    onClick={() => toggleStatus(user.id, user.status)}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="action-icons">
                  <span onClick={() => handleAction(user, "view")}>🔍</span>
                  <span onClick={() => handleAction(user, "edit")}>✏️</span>
                  <span onClick={() => handleDelete(user.id)}>🗑️</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for View/Edit */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          type={modalType}
          headers={headers}
          onClose={() => setIsModalOpen(false)}
          refreshUsers={refreshUsers}
        />
      )}
    </div>
  );
};

// ✅ User Modal Component (Handles View & Edit)
const UserModal = ({ user, type, onClose, refreshUsers, headers }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone input
    if (name === "phoneno" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Save (Update API Call)
  const handleSave = async () => {
    try {
      await axiosInstance.put(`/users/${user.id}`, formData, { headers });
      refreshUsers();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{type === "view" ? "View User" : "Edit User"}</h2>
        <div className="modal-body">
          <label>Name:</label>
          {type === "view" ? <p>{user.name}</p> : <input type="text" name="name" value={formData.name} onChange={handleChange} />}
          
          <label>Email:</label>
          {type === "view" ? <p>{user.email}</p> : <input type="email" name="email" value={formData.email} onChange={handleChange} />}
          
          <label>Phone:</label>
          {type === "view" ? (
            <p>{user.phoneno}</p>
          ) : (
            <input
              type="tel"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength="15"
              placeholder="Enter phone number"
            />
          )}
          
          <label>User Type:</label>
          {type === "view" ? (
            <p>{user.role}</p>
          ) : (
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="operator">Operator</option>
              <option value="user">User</option>
            </select>
          )}
          <label>Effective Date:</label>
          {type === "view" ? <p>{user.effective_date}</p> : <input type="date" name="effective_date" value={formData.effective_date} onChange={handleChange} />}
          <label>Cease Date:</label>
          {type === "view" ? <p>{user.cease_date}</p> : <input type="date" name="cease_date" value={formData.cease_date} onChange={handleChange} />}
          <label>Device ID:</label>
          {type === "view" ? <p>{user.device_id}</p> : <input type="text" name="device_id" value={formData.device_id} onChange={handleChange} />}
        </div>
        <div className="modal-footer">
          {type === "edit" && <button onClick={handleSave}>Save Changes</button>}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
