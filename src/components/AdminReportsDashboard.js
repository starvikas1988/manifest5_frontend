import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import Header from "./Header";
import Sidebar from "./Sidebar";
 import "../styles/AdminReportsDashboard.css";

const AdminReportsDashboard = () => {
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const datePickerRef = useRef(null);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("token"); // Check if logged in

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect if not logged in
    }
    fetchUsers();
  }, [authToken, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleLogout = async () => {
    try {
      // Get the token from localStorage

      if (!authToken) {
        // Handle the case where no token is found
        //console.error("No token found in localStorage");
        return; // Exit the function if no token is available
      }

      // Prepare the request headers with the token
      const headers = {
        Authorization: `Bearer ${authToken}`, // Assuming your API expects a Bearer token
      };

      // Make the logout request to the API
      const response = await axiosInstance.post("/logout", null, { headers });
      //console.log("Logout response:", response.data);
      // Check for successful logout response (optional)
      if (response.data.success) {
        // console.log("Logout successful from server");
      }

      // Remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("device_id");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      // console.error("Logout failed:", error);
      // Optionally, display an error message to the user
      alert("Logout failed. Please try again.");
    }
  };

  const handledatepickerClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the DatePicker
    }
  };

  const handleRaiseTicket = () => {
    navigate("/manage-ticket");
  };

  return (
    <>
      <div className="dashboard">
        <Header />
        <div className="all-container">
          <Sidebar />
          <div className="body-container">
            <div className="box">
              <div className="heading-box">
                <span className="heading-text">ADMIN REPORT ( 06 )</span>
                <div className="toggle-container">
                  <div className="toggle" style={{ left: "150px" }}></div>
                  <span className="all-reports">ALL REPORTS</span>
                </div>
              </div>

              {/* First Row */}
              <div className="content-container1">
                <div className="content1">
                  {/* TOTAL MATCH */}
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>
                  <div className="section">
                    <span className="section-title">TOTAL MATCH</span>
                    <img
                      src="../images/admin_reports/Group 1570.png"
                      alt="Total Match Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      120
                    </span>
                  </div>

                  <div className="separator"></div>

                  {/* ASSIGNED */}
                  <div className="section">
                    <span className="section-title">ASSIGNED</span>
                    <img
                      src="../images/admin_reports/Group 1527.png"
                      alt="Assigned Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#00AC4F" }}
                    >
                      80
                    </span>
                  </div>

                  <div className="separator"></div>

                  {/* PENDING */}
                  <div className="section">
                    <span className="section-title">PENDING</span>
                    <img
                      src="../images/admin_reports/Group 1536.png"
                      alt="Pending Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#FCA502" }}
                    >
                      40
                    </span>
                  </div>

                  <div className="separator"></div>

                  {/* ERROR */}
                  <div className="section">
                    <span className="section-title">ERROR</span>
                    <img
                      src="../images/admin_reports/Group 1537.png"
                      alt="Error Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#DF2330" }}
                    >
                      15
                    </span>
                  </div>

                  <div className="separator"></div>

                  {/* REVIEW */}
                  <div className="section">
                    <span className="section-title">REVIEW</span>
                    <img
                      src="../images/admin_reports/Group 1542.png"
                      alt="Review Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#007bff" }}
                    >
                      25
                    </span>
                  </div>

                  <div className="separator"></div>

                  {/* APPROVED */}
                  <div className="section">
                    <span className="section-title">APPROVED</span>
                    <img
                      src="../images/admin_reports/Group 1544.png"
                      alt="Approved Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#20c997" }}
                    >
                      90
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="heading-box">
                <span className="heading-text">OPERATOR REPORT ( 42 )</span>
                <div className="toggle-container">
                  <div className="toggle" style={{ left: "150px" }}></div>
                  <span className="all-reports">ALL OPERATORS </span>
                </div>
              </div>

              {/* First Row */}
              <div className="content-container1">
              <div className="content1">
                {/* TOTAL MATCH */}
                <div className="section">
                  <span className="section-title">OPERATOR 1</span>
                  <img
                    src="../images/admin_reports/Group 1546.png"
                    alt="Total Match Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#9F41A4" }}>
                    50
                  </span>
                </div>

                <div className="separator"></div>

                {/* ASSIGNED */}
                <div className="section">
                  <span className="section-title">OPERATOR 2</span>
                  <img
                    src="../images/admin_reports/Group 1577.png"
                    alt="Assigned Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#00AC4F" }}>
                    24
                  </span>
                </div>

                <div className="separator"></div>

                {/* PENDING */}
                <div className="section">
                  <span className="section-title">OPERATOR 3</span>
                  <img
                    src="../images/admin_reports/Group 1578.png"
                    alt="Pending Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#FCA502" }}>
                    23
                  </span>
                </div>

                <div className="separator"></div>

                {/* ERROR */}
                <div className="section">
                  <span className="section-title">OPERATOR 4</span>
                  <img
                    src="../images/admin_reports/Group 1579.png"
                    alt="Error Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#DF2330" }}>
                    01
                  </span>
                </div>

                <div className="separator"></div>

                {/* REVIEW */}
                <div className="section">
                  <span className="section-title">OPERATOR 5</span>
                  <img
                    src="../images/admin_reports/Group 1551.png"
                    alt="Review Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#007bff" }}>
                    01
                  </span>
                </div>

                <div className="separator"></div>

                {/* APPROVED */}
                <div className="section">
                  <span className="section-title">OPERATOR 6</span>
                  <img
                    src="../images/admin_reports/Group 1593.png"
                    alt="Approved Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#20c997" }}>
                    01
                  </span>
                </div>
              </div>
              </div>
            </div>

            <div className="box">
              <div className="heading-box">
                <span className="heading-text">MATCH CARD REPORT ( 06 )</span>
                <div className="toggle-container">
                  <div className="toggle" style={{ left: "150px" }}></div>
                  <span className="all-reports">ALL REPOORTS </span>
                </div>
              </div>

              {/* First Row */}
              <div className="content-container1">
              <div className="content1">
                {/* TOTAL MATCH */}
                <div className="section">
                  <span className="section-title">DATE</span>

                  <div class="circle-container">
                    <img
                      src="../images/admin_reports/Group 1554.png"
                      class="circle-img"
                      alt="Circle"
                    />
                    <img
                      src="../images/admin_reports/calendar_month.png"
                      class="icon-img"
                      alt="Icon"
                    />
                  </div>
                  <span className="section-number" style={{ color: "#9F41A4" }}>
                    50
                  </span>
                </div>

                <div className="separator"></div>

                {/* ASSIGNED */}
                <div className="section">
                  <span className="section-title">SERIES</span>
                  <div class="circle-container">
                    <img
                      src="../images/admin_reports/Group 1556.png"
                      class="circle-img"
                      alt="Circle"
                    />
                    <img
                      src="../images/admin_reports/add_notes.png"
                      class="icon-img"
                      alt="Icon"
                    />
                  </div>
                  <span className="section-number" style={{ color: "#00AC4F" }}>
                    24
                  </span>
                </div>

                <div className="separator"></div>

                {/* PENDING */}
                <div className="section">
                  <span className="section-title">CORRECTED</span>
                  <img
                    src="../images/admin_reports/Group 1686.png"
                    alt="Pending Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#FCA502" }}>
                    23
                  </span>
                </div>

                <div className="separator"></div>

                {/* ERROR */}
                <div className="section">
                  <span className="section-title">RESUBMIT</span>
                  <img
                    src="../images/admin_reports/Group 1584.png"
                    alt="Error Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#DF2330" }}>
                    01
                  </span>
                </div>

                <div className="separator"></div>

                {/* REVIEW */}
                <div className="section">
                  <span className="section-title">APPROVED</span>
                  <img
                    src="../images/admin_reports/Group 1576.png"
                    alt="Review Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#007bff" }}>
                    01
                  </span>
                </div>

                <div className="separator"></div>

                {/* APPROVED */}
                <div className="section">
                  <span className="section-title">SUBMITTED</span>
                  <img
                    src="../images/admin_reports/Group 1585.png"
                    alt="Approved Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#20c997" }}>
                    01
                  </span>
                </div>
              </div>
              </div>
            </div>

            <div className="box">
              <div className="heading-box">
                <span className="heading-text">CRM ERROR REPORT ( 04 )</span>
                <div className="toggle-container">
                  <div className="toggle" style={{ left: "150px" }}></div>
                  <span className="all-reports">ALL REPORTS </span>
                </div>
              </div>

              {/* First Row */}
              <div className="content-container1">
              <div className="content1">
                {/* TOTAL MATCH */}
                <div className="section">
                  <span className="section-title">ADMIN</span>
                  <img
                    src="../images/admin_reports/Group 1581.png"
                    alt="Total Match Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#9F41A4" }}>
                    50
                  </span>
                </div>

                <div className="separator"></div>

                {/* ASSIGNED */}
                <div className="section">
                  <span className="section-title">OPERATOR</span>
                  <img
                    src="../images/admin_reports/Group 1582.png"
                    alt="Assigned Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#00AC4F" }}>
                    24
                  </span>
                </div>

                <div className="separator"></div>

                {/* PENDING */}
                <div className="section">
                  <span className="section-title">USER</span>
                  <div class="circle-container">
                    <img
                      src="../images/admin_reports/Ellipse 3.png"
                      class="circle-img"
                      alt="Circle"
                    />
                    <img
                      src="../images/admin_reports/profile-2user.png"
                      class="icon-img"
                      alt="Icon"
                    />
                  </div>
                  <span className="section-number" style={{ color: "#FCA502" }}>
                    23
                  </span>
                </div>

                <div className="separator"></div>

                {/* ERROR */}
                <div className="section">
                  <span className="section-title">TECHNICAL</span>
                  <img
                    src="../images/admin_reports/Group 1687.png"
                    alt="Error Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#DF2330" }}>
                    01
                  </span>
                </div>

                <div className="separator"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReportsDashboard;
