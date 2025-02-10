import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaUsersCog, FaClipboardCheck } from "react-icons/fa";

import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setIsAdminOpen(!isAdminOpen)}>
          <i>🏠</i> Admin
          <ul className={`submenu ${isAdminOpen ? 'open' : ''}`}>
            <li><Link to="/create-user">Create User</Link></li>
            <li><Link to="/manage-users">Manage User</Link></li>
          </ul>
        </li>
        <li><i>📊</i><Link to="/dashboard">Dashboard</Link></li>
        <li><i>🗂️</i><Link to="/category_manage">Category</Link></li>
        <li>
        <i><FaUsersCog size={18} /></i>
        <Link to="/assign_match">Assign Match</Link>
        </li>
        <li>
        <i><FaUsersCog size={18} /></i>
        <Link to="/manage-ticket">Tickets</Link>
        </li>
        <li><i>⚙️</i> ODDS</li>
        <li><i>🔍</i> Review</li>
        <li><i>📋</i> CRM</li>
        <li><i>👤</i> Operator</li>
      </ul>
    </div>
  );
};

export default Sidebar;
