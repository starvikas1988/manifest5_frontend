import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/TicketForm.css";

const TicketForm = ({ onSubmit , error,message}) => {
  const [formData, setFormData] = useState({
    priority: "",
    username: "",
    subject: "",
    error_type: "",
    error_details: "",
    assigned_to: "",
    match_id: "2",
    user_id: "1",
    status: "Active",
    ticket_date: "",
    file: null,
  });

  const [assignedTo, setassignedTo] = useState([]); // Store user data
  const authToken = localStorage.getItem("token"); // Check if logged in
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users", {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        setassignedTo(response.data); // Store users in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Passes data to parent
    setFormData({
        priority: "",
        username: "",
        subject: "",
        error_type: "",
        error_details: "",
        assigned_to: "",
        match_id: "2",
        user_id: "1",
        status: "Active",
        ticket_date: "",
        file: null,
      });
  };

  return (
    <>
     <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-container">
      <h2>RAISE TICKET</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <input type="hidden" name="match_id"  value="2" onChange={handleChange} />
      <input type="hidden" name="user_id"  value="1" onChange={handleChange} />
      <div className="form-row">
        <div className="form-group">
          <label>Ticket Date</label>
          <input type="date" name="ticket_date" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <input type="text" name="priority" onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Subject</label>
          <select name="subject" onChange={handleChange}>
            <option value="">Select Subject</option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Other">Other</option>
        </select>
        </div>
        <div className="form-group">
          <label>Error Type</label>
          <select name="error_type" onChange={handleChange}>
            <option value="">Select Error Type</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
        </select>
        </div>
        <div className="form-group">
          <label>Assigning To</label>
          <select name="assigned_to" onChange={handleChange}>
            <option value="">Assign To</option>
            {assignedTo.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
        </select>
        </div>
      </div>

      <div className="form-group">
        <label>Error Details</label>
        <textarea name="error_details" className="errorDetails" onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Upload Error File</label>
        <input type="file" className="filedata" onChange={handleFileChange} />
      </div>
   </div>
    <div className="form-actions">
        <button type="submit" className="submit-btn"> <img src={`../images/icons/submit-icon.png`} alt="Submit" className="btn-icon" /></button>
        <button type="reset"  className="reset-btn"><img src={`../images/icons/refresh-icon.png`} alt="Submit" className="btn-icon" /></button>
        <button type="button" className="cancel-btn"><img src={`../images/icons/cancel-icon.png`} alt="Submit" className="btn-icon" /></button>
    </div>
    </form>
    </>
   
  );
};

export default TicketForm;
