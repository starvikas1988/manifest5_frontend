import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaUsersCog, FaClipboardCheck } from "react-icons/fa";
import dashboardIcon from "../../images/dashboard.png";

import '../../styles/operator/Sidebar.css';

const Sidebar = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCategoryOpen , setCategoryOpen] = useState(false);
  const [isReportsOpen,setReportsOpen] = useState(false);
  const [isReviewOpen,setReviewOpen] = useState(false);
  const [isCrmOpen,setCrmOpen] = useState(false);

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setIsAdminOpen(!isAdminOpen)}>
          <div style={{display:"flex"}}><i><img src='../../images/shield_person.png'/></i>  Admin</div>
          <ul className={`submenu ${isAdminOpen ? 'open' : ''}`}>
            <li><Link to="/create-user">Create User</Link></li>
            <li><Link to="/manage-users">Manage User</Link></li>
          </ul>
        </li>
        <li>
          <div style={{display:"flex"}}><img src="../../images/dashboard_icon.png" style={{width:"21.98px", height:"25px"}} alt="Dashboard" className="" />
          <Link to="/dashboard">Dashboard</Link>
          </div>
        
        </li>
        <li onClick={() => setReportsOpen(!isReportsOpen)}>
          <div style={{display:"flex"}}><i><img src='../../images/lab_profile.png'/></i>  Reports (06)</div>
          <ul className={`submenu ${isReportsOpen ? 'open' : ''}`}>
            <li><Link to="/admin_reports_dashboard">Admin (06)</Link></li>
            <li><Link to="/">Operator (42)</Link></li>
            <li><Link to="/">Match Card (06)</Link></li>
            <li><Link to="/">Review (06)</Link></li>
            <li><Link to="/">CRM Error (04)</Link></li>
          </ul>
        </li>
        <li onClick={() => setCategoryOpen(!isCategoryOpen)}>
          <div style={{display:"flex"}}><i><img src='../../images/ODDS.png'/></i>  ODDS</div>
          <ul className={`submenu ${isCategoryOpen ? 'open' : ''}`}>
            <li><Link to="/category_manage">Manage Category</Link></li>
            <li><Link to="/manage-market">Manage Market</Link></li>
          </ul>
        </li>

        <li onClick={() => setReviewOpen(!isReviewOpen)}>
          <div style={{display:"flex"}}><i><img src='../../images/reviews.png'/></i>  Review</div>
          <ul className={`submenu ${isReviewOpen ? 'open' : ''}`}>
            <li><Link to="/">Manage Review</Link></li>
          </ul>
        </li>

        <li onClick={() => setCrmOpen(!isCrmOpen)}>
          <div style={{display:"flex"}}><i><img src='../../images/contact_support.png'/></i>CRM</div>
          <ul className={`submenu ${isCrmOpen ? 'open' : ''}`}>
            <li><Link to="/crm">Manage CRM</Link></li>
          </ul>
        </li>
       
        <li>
        <i><FaUsersCog size={18} /></i>
        <Link to="/assign_match">Assign Match</Link>
        </li>
        
        <li>
        <i><FaUsersCog size={18} /></i>
        <Link to="/manage-ticket">Tickets</Link>
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;
