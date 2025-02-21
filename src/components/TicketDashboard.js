import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import Modal from "./Modal"; // Import the Modal component
import "../styles/TicketDashboard.css";
import pathUrl from "../utils/path_url"; 

const { imageURL } = pathUrl;

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" or "edit"
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [assignedTo, setassignedTo] = useState([]);

  //console.log(isModalOpen);

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
  useEffect(() => {
    fetchTickets();
    fetchUsers();
  },[]);

  const authToken = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get("/tickets", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleAddTicket = async (newTicket) => {
    try {
      const formData = new FormData();
      Object.keys(newTicket).forEach((key) => {
        formData.append(key, newTicket[key]);
      });

      const response = await axiosInstance.post("/tickets", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authToken}` },
      });

      setTickets([...tickets, response.data]); 
      setMessage("Ticket added successfully!");
      setError(null);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setError("Failed to add ticket. Please try again.");
      setMessage(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Open Modal for View or Edit
  const openModal = (type, ticket) => {
    console.log("openModal", type, ticket);
    setModalType(type);
    setSelectedTicket({
      ...ticket,
      file: typeof ticket.file === "string" ? ticket.file : "",
  });
  setFormData({
    ...ticket,
    file: typeof ticket.file === "string" ? ticket.file : "",
    assigned_to: ticket.assigned?.id ?? "",
    match_id: ticket.match?.id || "", 
    user_id: ticket.user?.id || "", 
});
    setIsModalOpen(true);
    console.log("isModalOpen:", isModalOpen);
  };
console.log(selectedTicket);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  

  // Handle Save Ticket Edits
  const handleSave = async () => {
    try {

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "file" && !formData[key]) return;  // ✅ Prevent empty file upload
        formDataToSend.append(key, formData[key]);
      });

       await axiosInstance.post(`/tickets/${formData.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authToken}` },
      });

      await fetchTickets();
      // const updatedTicket = response.data;
      // setTickets(tickets.map(ticket => (ticket.id === updatedTicket.id ? updatedTicket : ticket)));
      setMessage("Ticket updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating ticket:", error);
      setError("Failed to update ticket.");
    }
  };

  // Handle Delete Ticket
  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await axiosInstance.delete(`/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      setMessage("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setError("Failed to delete ticket.");
    }
  };

  // Toggle Ticket Status (Active/Inactive)
  const handleToggleStatus = async (ticketId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

      await axiosInstance.put(
        `/tickets/${ticketId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      setTickets(tickets.map(ticket => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket)));
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setError("Failed to update status.");
    }
  };

  return (
    <div className="ticket-dashboard">
      <Header />
      <div className="ticket-container">
        <Sidebar />
        <div className="main-content">
          <TicketForm message={message} error={error} onSubmit={handleAddTicket} />
          <TicketList 
            tickets={tickets}  
            onToggleStatus={handleToggleStatus}
            onAction={openModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modal for Viewing/Editing Ticket */}
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === "edit" ? "Edit Ticket" : "View Ticket"}>
      {selectedTicket && (
        
        <div>
            <input type="hidden" name="match_id"  value="2" onChange={handleInputChange} />
            <input type="hidden" name="user_id"  value="1" onChange={handleInputChange} />
          <label>Ticket Date:</label>
          {modalType === "edit" ? (
            <input type="date" name="ticket_date" value={formData.ticket_date} onChange={handleInputChange} />
          ) : (
            <p>{selectedTicket.ticket_date}</p>
          )}

           <label>User Name:</label>
          {modalType === "edit" ? (
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          ) : (
            <p>{selectedTicket.username}</p>
          )}
          <label>Subject:</label>
          {modalType === "edit" ? (
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} />
          ) : (
            <p>{selectedTicket.subject}</p>
          )}

          <label>Assigned To:</label>
          
          {modalType === "edit" ? (
        <select name="assigned_to" value={formData.assigned_to || ""} onChange={handleInputChange}>
          <option value="">Select User</option> {/* ✅ Default option */}
          {assignedTo.map((user) => (
            <option key={user.id} value={user.id} selected={selectedTicket.assigned?.id === user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      ) : (
        <p>{selectedTicket.assigned?.name || "N/A"}</p>
      )}

        <label>Subject:</label>
          {modalType === "edit" ? (
            <select name="subject" value={formData.subject} onChange={handleInputChange}>
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{selectedTicket.subject}</p>
          )}

          <label>Priority:</label>
          {modalType === "edit" ? (
            <select name="priority" value={formData.priority} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <p>{selectedTicket.priority}</p>
          )}

          <label>Error Type:</label>

          {modalType === "edit" ? (
            <select name="error_type" value={formData.error_type} onChange={handleInputChange}>
              <option value="Critical">Critical</option>
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
            </select>
          ) : (
            <p>{selectedTicket.error_type}</p>
          )}

          <label>Status:</label>
          {modalType === "edit" ? (
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          ) : (
            <p>{selectedTicket.status}</p>
          )}

          {/* Display Image or PDF */}
          {selectedTicket.file &&  typeof selectedTicket.file === "string" ?(
          <div className="file-preview">
            <h3>Attached File:</h3>

            <div className="file-container">
              {selectedTicket.file.endsWith(".pdf") ? (
                <a
                  href={`${imageURL}/${selectedTicket.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-view-link"
                >
                  📄 View PDF
                </a>
              ) : (
                <img
                  src={`${imageURL}/${selectedTicket.file}`}
                  alt="Attached File"
                  className="file-thumbnail"
                />
              )}
            </div>

            <div className="download-section">
              <a
                href={`${imageURL}/${selectedTicket.file}`}
                download
                className="download-link"
              >
                ⬇ Download File
              </a>
            </div>
          </div>
        ): (
          <p>No file attached</p> // Fallback if no valid file is present
        )}
        {modalType === "edit" && (
          <div className="file-upload">
            <label>Upload New File:</label>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
        )}

        {modalType === "edit" && <button className="save-button" onClick={handleSave}>Save Changes</button>}

        </div>
      )}
      </Modal>

    </div>
  );
};

export default TicketDashboard;
