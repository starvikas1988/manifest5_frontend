import React from "react";
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import "../styles/Crm.css";

const Crm = () => {
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

  const handleRaiseTicket = ()=>{
    navigate('/manage-ticket');
  }

  const handledatepickerClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the DatePicker
    }
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
                <span className="heading-text">CRM ERROR REPORT ( 04 )</span>
                <div className="toggle-container">
                <div className="toggle" style={{ left: "150px" }}></div>
                <span className="all-reports">ALL REPORTS</span>
                </div>
                
              </div>

              <div className="content">
                <div className="section">
                  <span className="section-title">ADMIN</span>
                  <img
                    src="images/dashboard/Group 1581.png"
                    alt="Admin Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#9f41a4" }}>
                    50
                  </span>
                </div>

                <div
                  className="separator"
                  style={{ marginLeft: "-60px" }}
                ></div>
                <div className="section">
                  <span
                    className="section-title"
                    style={{ marginLeft: "-171px", marginRight: "0px" }}
                  >
                    OPERATOR
                  </span>
                  <img
                    src="images/dashboard/Group 1582.png"
                    alt="Operator Icon"
                    className="section-icon"
                    style={{ marginLeft: "-205px" }}
                  />
                  <span
                    className="section-number"
                    style={{ color: "#00ac4f", marginLeft: "-73px" }}
                  >
                    24
                  </span>
                </div>

                <div
                  className="separator"
                  style={{ marginLeft: "-134px", marginRight: "-100px" }}
                ></div>

                <div className="section">
                  <span
                    className="section-title"
                    style={{ marginLeft: "-62px" }}
                  >
                    USER
                  </span>
                  <img
                    src="images/dashboard/Ellipse 3.png"
                    alt="User Icon"
                    className="section-icon"
                    style={{ marginLeft: "-54px", marginRight: "0px" }}
                  />
                  <span
                    className="section-number"
                    style={{ color: "#fca502", marginLeft: "69px" }}
                  >
                    12
                  </span>
                </div>

                <div
                  className="separator"
                  style={{ marginRight: "176px", marginLeft: "-58px" }}
                ></div>

                <div className="section">
                  <span
                    className="section-title"
                    style={{ marginRight: "0px", marginLeft: "-604px" }}
                  >
                    TECHNICAL
                  </span>
                  <img
                    src="images/dashboard/Group 1687.png"
                    alt="Technical Icon"
                    className="section-icon"
                    style={{ marginLeft: "-366px", marginRight: "274px" }}
                  />
                  <span
                    className="section-number"
                    style={{ color: "#df2330", marginRight: "643px" }}
                  >
                    01
                  </span>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="content" style={{ marginTop: "0px" }}>
                <div className="field-container">
                  <span className="field-name" style={{ marginLeft: "-139px" }}>
                    SERIES
                  </span>
                  <div
                    className="search-bar series-search"
                    style={{ bottom: "-11px", position: "relative" }}
                  >
                    <input type="text" />
                    <img
                      style={{
                        width: "55px",
                        right: "1px",
                        position: "relative",
                      }}
                      src="images/dashboard/Group 2555.png"
                      alt="Down Arrow"
                    />
                  </div>
                </div>

                <div className="field-container" style={{ width: "20%" }}>
                  <span className="field-name" style={{ marginLeft: "-88px" }}>
                    MATCH FORMAT
                  </span>
                  <div
                    className="search-bar match-search"
                    style={{ bottom: "-11px", position: "relative" }}
                  >
                    <input type="text" />
                    <img
                      style={{
                        width: "55px",
                        right: "1px",
                        position: "absolute",
                      }}
                      src="images/dashboard/Group 2555.png"
                      alt="Down Arrow"
                    />
                  </div>
                </div>

                <div className="field-container" style={{ width: "10%" }}>
                  <span className="field-name" style={{ marginLeft: "-66px" }}>
                    DATE
                  </span>
                  <div
                    className="date-picker"
                    style={{ bottom: "-11px", position: "relative" }}
                  >
                    <DatePicker
                      ref={datePickerRef} 
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd" // Customize date format as needed
                      className="date-picker-input" // Add a class for styling
                      placeholderText="Select a date"
                    />
                    <img
                      style={{
                        width: "55px",
                        right: "-12px",
                        position: "absolute",
                      }}
                      src="images/dashboard/Frame 1966.png"
                      alt="Calendar Icon"
                      onClick={handledatepickerClick}
                    />
                  </div>
                </div>

                <div className="field-container">
                  <span className="field-name">
                    LIST
                    <br />
                    (50)
                  </span>
                  <img src="images/dashboard/Group 1830.png" alt="List Icon" />
                </div>

                <div className="field-container">
                  <span className="field-name">
                    CARD
                    <br />
                    (50)
                  </span>
                  <img src="images/dashboard/Group 1821.png" alt="Card Icon" />
                </div>
                <div className="field-container" onClick={handleRaiseTicket} style={{ cursor: 'pointer' }}>
                  <span className="field-name">
                    RAISE
                    <br />
                    TICKET
                  </span>
                  <img src="images/dashboard/Group 1829.png" alt="List Icon" />
                </div>
              </div>
            </div>

            <div className="list-view-section">
              <span className="list-view-text">LIST VIEW (42)</span>
            </div>

            <div className="admin-section" style={{ backgroundColor: "#9f41a4" }}>
              <span style={{ color: "white" }}>ADMIN 50</span>
              <img src="images/dashboard/arrow_down.png" alt="Down Arrow" />
            </div>

            <div className="box" style={{ marginTop: "0px" }}>
              <div className="first-row">
                <div className="small-box">
                  <div className="top-part">
                    <span>ADMIN</span>
                  </div>
                  <div className="bottom-part">
                    <span>AMAN CHOUHAN</span>
                  </div>
                </div>

                <div className="small-box">
                  <span>Jan 26, Tue</span>
                  <span>2025</span>
                </div>

                <div className="league-section">
                  <h2 style={{ color: "#00ac4f" }}>
                    BANGLADESH PREMIER LEAGUE
                  </h2>
                </div>
                <div className="league-section">
                  <p style={{ color: "#00546c" }}>
                    Match: 53, Mon, 720, Domestic
                  </p>
                  <p style={{ color: "#00546c" }}>
                    Share Bangla National Stadium
                  </p>
                </div>

                <div className="team-section">
                  <img src="images/dashboard/B (1).png" alt="Team 1 Logo" />
                  <span>NB w</span>
                  <span>vs</span>
                  <span>CH W</span>
                  <img src="images/dashboard/H (1).png" alt="Team 2 Logo" />
                </div>

                <div className="end-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#017781" }}
                  >
                    <span style={{ color: "white" }}>13:30 AM (L)</span>
                  </div>
                  <div
                    className="bottom-part"
                    style={{ backgroundColor: "#ffff98" }}
                  >
                    <span style={{ color: "#00546c" }}>
                      Starting in 18th-15th-49s
                    </span>
                  </div>
                </div>
              </div>

              <div className="second-row">
                <div className="small-boxes">
                  <div className="small-box">
                    <span>BATSMAN</span>
                  </div>
                  <div className="small-box">
                    <span>BOWLER</span>
                  </div>
                  <div className="small-box">
                    <span>OVER</span>
                  </div>
                  <div className="small-box">
                    <span>EXTRA</span>
                  </div>
                  <div className="small-box">
                    <span>OVER</span>
                  </div>
                  <div className="small-box">
                    <span>EXTRA</span>
                  </div>
                  <div className="small-box">
                    <span>WICKETS</span>
                  </div>
                  <div className="small-box">
                    <span>MATCH</span>
                  </div>
                  <div className="small-box">
                    <span>SERIES</span>
                  </div>
                  <div className="small-box">
                    <span>CLIP</span>
                  </div>
                  <div className="small-box">
                    <span>SERIES</span>
                  </div>
                  <div className="small-box">
                    <span>CLIP</span>
                  </div>
                </div>

                <div className="small-boxes">
                  {[30, 30, 20, 10, 20, 10, 10, 10, 3, 2, 3, 2].map(
                    (number, index) => (
                      <div
                        key={index}
                        className="small-box"
                        style={{ backgroundColor: "#adcab3" }}
                      >
                        <span style={{ color: "#043e54" }}>{number}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className="admin-section"
              style={{ backgroundColor: "#00ac4f" }}
            >
              <span style={{ color: "white" }}>ADMIN 50</span>
              <img src="images/dashboard/arrow_down.png" alt="Down Arrow" />
            </div>

            <div className="box" style={{ marginTop: "0px" }}>
              <div className="first-row">
                <div className="small-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#00ac4f" }}
                  >
                    <span>ADMIN</span>
                  </div>
                  <div className="bottom-part">
                    <span>AMAN CHOUHAN</span>
                  </div>
                </div>

                <div className="small-box">
                  <span>Jan 26, Tue</span>
                  <span>2025</span>
                </div>

                <div className="league-section">
                  <h2 style={{ color: "#00ac4f" }}>
                    BANGLADESH PREMIER LEAGUE
                  </h2>
                </div>
                <div className="league-section">
                  <p style={{ color: "#00546c" }}>
                    Match: 53, Mon, 720, Domestic
                  </p>
                  <p style={{ color: "#00546c" }}>
                    Share Bangla National Stadium
                  </p>
                </div>

                <div className="team-section">
                  <img src="images/dashboard/B (1).png" alt="Team 1 Logo" />
                  <span>NB w</span>
                  <span>vs</span>
                  <span>CH W</span>
                  <img src="images/dashboard/H (1).png" alt="Team 2 Logo" />
                </div>

                <div className="end-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#017781" }}
                  >
                    <span style={{ color: "white" }}>13:30 AM (L)</span>
                  </div>
                  <div
                    className="bottom-part"
                    style={{ backgroundColor: "#ffff98" }}
                  >
                    <span style={{ color: "#00546c" }}>
                      Starting in 18th-15th-49s
                    </span>
                  </div>
                </div>
              </div>

              <div className="second-row">
                <div className="small-boxes">
                  {[
                    "BATSMAN",
                    "BOWLER",
                    "OVER",
                    "EXTRA",
                    "OVER",
                    "EXTRA",
                    "WICKETS",
                    "MATCH",
                    "SERIES",
                    "CLIP",
                    "SERIES",
                    "CLIP",
                  ].map((item, index) => (
                    <div key={index} className="small-box">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="small-boxes">
                  {[30, 30, 20, 10, 20, 10, 10, 10, 3, 2, 3, 2].map(
                    (num, index) => (
                      <div
                        key={index}
                        className="small-box"
                        style={{ backgroundColor: "#adcab3" }}
                      >
                        <span style={{ color: "#043e54" }}>{num}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className="admin-section"
              style={{ backgroundColor: "#fca502" }}
            >
              <span style={{ color: "white" }}>ADMIN 50</span>
              <img src="images/dashboard/arrow_down.png" alt="Down Arrow" />
            </div>

            <div className="box" style={{ marginTop: 0 }}>
              <div className="first-row">
                <div className="small-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#fca502" }}
                  >
                    <span>ADMIN</span>
                  </div>
                  <div className="bottom-part">
                    <span>AMAN CHOUHAN</span>
                  </div>
                </div>

                <div className="small-box">
                  <span>Jan 26, Tue</span>
                  <span>2025</span>
                </div>

                <div className="league-section">
                  <h2 style={{ color: "#00ac4f" }}>
                    BANGLADESH PREMIER LEAGUE
                  </h2>
                </div>
                <div className="league-section">
                  <p style={{ color: "#00546c" }}>
                    Match: 53, Mon, 720, Domestic
                  </p>
                  <p style={{ color: "#00546c" }}>
                    Share Bangla National Stadium
                  </p>
                </div>

                <div className="team-section">
                  <img src="images/dashboard/B (1).png" alt="Team 1 Logo" />
                  <span>NB w</span>
                  <span>vs</span>
                  <span>CH W</span>
                  <img src="images/dashboard/H (1).png" alt="Team 2 Logo" />
                </div>

                <div className="end-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#017781" }}
                  >
                    <span style={{ color: "white" }}>13:30 AM (L)</span>
                  </div>
                  <div
                    className="bottom-part"
                    style={{ backgroundColor: "#ffff98" }}
                  >
                    <span style={{ color: "#00546c" }}>
                      Starting in 18th-15th-49s
                    </span>
                  </div>
                </div>
              </div>

              <div className="second-row">
                <div className="small-boxes">
                  {[
                    "BATSMAN",
                    "BOWLER",
                    "OVER",
                    "EXTRA",
                    "OVER",
                    "EXTRA",
                    "WICKETS",
                    "MATCH",
                    "SERIES",
                    "CLIP",
                    "SERIES",
                    "CLIP",
                  ].map((text, index) => (
                    <div key={index} className="small-box">
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="small-boxes">
                  {[30, 30, 20, 10, 20, 10, 10, 10, 3, 2, 3, 2].map(
                    (num, index) => (
                      <div
                        key={index}
                        className="small-box"
                        style={{ backgroundColor: "#adcab3" }}
                      >
                        <span style={{ color: "#043e54" }}>{num}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className="admin-section"
              style={{ backgroundColor: "#df2330" }}
            >
              <span style={{ color: "white" }}>ADMIN 50</span>
              <img src="images/dashboard/arrow_down.png" alt="Down Arrow" />
            </div>

            <div className="box" style={{ marginTop: "0px" }}>
              <div className="first-row">
                <div className="small-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#df2330" }}
                  >
                    <span>ADMIN</span>
                  </div>
                  <div className="bottom-part">
                    <span>AMAN CHOUHAN</span>
                  </div>
                </div>

                <div className="small-box">
                  <span>Jan 26, Tue</span>
                  <span>2025</span>
                </div>

                <div className="league-section">
                  <h2 style={{ color: "#00ac4f" }}>
                    BANGLADESH PREMIER LEAGUE
                  </h2>
                </div>
                <div className="league-section">
                  <p style={{ color: "#00546c" }}>
                    Match: 53, Mon, 720, Domestic
                  </p>
                  <p style={{ color: "#00546c" }}>
                    Share Bangla National Stadium
                  </p>
                </div>

                <div className="team-section">
                  <img src="images/dashboard/B (1).png" alt="Team 1 Logo" />
                  <span>NB w</span>
                  <span>vs</span>
                  <span>CH W</span>
                  <img src="images/dashboard/H (1).png" alt="Team 2 Logo" />
                </div>

                <div className="end-box">
                  <div
                    className="top-part"
                    style={{ backgroundColor: "#017781" }}
                  >
                    <span style={{ color: "white" }}>13:30 AM (L)</span>
                  </div>
                  <div
                    className="bottom-part"
                    style={{ backgroundColor: "#ffff98" }}
                  >
                    <span style={{ color: "#00546c" }}>
                      Starting in 18th-15th-49s
                    </span>
                  </div>
                </div>
              </div>

              <div className="second-row">
                <div className="small-boxes">
                  <div className="small-box">
                    <span>BATSMAN</span>
                  </div>
                  <div className="small-box">
                    <span>BOWLER</span>
                  </div>
                  <div className="small-box">
                    <span>OVER</span>
                  </div>
                  <div className="small-box">
                    <span>EXTRA</span>
                  </div>
                  <div className="small-box">
                    <span>OVER</span>
                  </div>
                  <div className="small-box">
                    <span>EXTRA</span>
                  </div>
                  <div className="small-box">
                    <span>WICKETS</span>
                  </div>
                  <div className="small-box">
                    <span>MATCH</span>
                  </div>
                  <div className="small-box">
                    <span>SERIES</span>
                  </div>
                  <div className="small-box">
                    <span>CLIP</span>
                  </div>
                  <div className="small-box">
                    <span>SERIES</span>
                  </div>
                  <div className="small-box">
                    <span>CLIP</span>
                  </div>
                </div>

                <div className="small-boxes">
                  {[30, 30, 20, 10, 20, 10, 10, 10, 3, 2, 3, 2].map(
                    (num, index) => (
                      <div
                        key={index}
                        className="small-box"
                        style={{ backgroundColor: "#adcab3" }}
                      >
                        <span style={{ color: "#043e54" }}>{num}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crm;
