import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
    console.log("Modal State in Modal.js:", isOpen);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
