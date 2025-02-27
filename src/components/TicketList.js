import React from "react";
import "../styles/TicketList.css";
//import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import viewIcon from "../images/view_icon.png";
import editIcon from "../images/edit_icon.png";
import deleteIcon from "../images/save_icon.png";

const TicketList = ({ tickets, onAction, onDelete ,onToggleStatus }) => {
  return (
    <div className="ticket-list">
      <table>
        <thead>
          <tr>
            <th>Ticket No</th>
            <th>Raised By</th>
            <th>Raised To</th>
            <th>Subject</th>
            <th>Error Types</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.id}</td>
                <td>{ticket.username}</td>
                <td>{ticket.assigned?.name || "Not Assigned"}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.error_type}</td>
                <td>{ticket.priority}</td>
                 <td>
                  <input
                    type="button"
                    className={`status-btn ${ticket.status.toLowerCase()}`}
                    value={ticket.status.toUpperCase()}
                    onClick={() => onToggleStatus(ticket.id, ticket.status)}
                  />
                </td>
                <td className="action-icons">
                  <img src={viewIcon} alt="View" className="icon view" title="View" onClick={() => onAction("view", ticket)} />
                  <img src={editIcon} alt="Edit" className="icon edit" title="Edit" onClick={() => onAction("edit", ticket)} />
                  <span  className="icon view" onClick={() => onDelete(ticket.id)}>🗑️</span>
                  {/* <img src={deleteIcon} alt="Delete" className="icon delete"  title="Delete" onClick={() => onDelete(ticket.id)} /> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No tickets available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
