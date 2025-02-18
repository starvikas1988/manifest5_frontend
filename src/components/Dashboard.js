import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
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
  return (
    <>
      <div className="dashboard">
        <Header />
        <div className="all-container">
          <Sidebar />
          <div className="body-container">
            <div className="box">
              <div className="heading-box">
                <span className="heading-text">Dashboard</span>
                <div className="toggle-container">
                <div className="toggle" style={{ left: "150px" }}></div>
                <span className="all-reports">ALL REPORTS</span>
                </div>
              </div>

              <div className="content">
                <div className="section">
                  <span className="section-title">ADMIN</span>
                  <img
                    src="../images/dashboard_main/Group 1581.png"
                    alt="Admin Icon"
                    className="section-icon"
                  />
                  <span className="section-number" style={{ color: "#9F41A4" }}>
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
                    src="../images/dashboard_main/Group 1582.png"
                    alt="Operator Icon"
                    className="section-icon"
                    style={{ marginLeft: "-205px" }}
                  />

                  <span
                    className="section-number"
                    style={{ color: "#00AC4F", marginLeft: "-73px" }}
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
                    src="../images/dashboard_main/Group1555.png"
                    alt="User Icon"
                    className="section-icon"
                    style={{ marginLeft: "-54px", marginRight: "0px" }}
                  />

                  <span
                    className="section-number"
                    style={{ color: "#FCA502", marginLeft: "69px" }}
                  >
                    12
                  </span>
                </div>

                <div
                  className="separator"
                  style={{ marginRight: "176px", marginLeft: "-58px" }}
                />

                <div className="section">
                  <span
                    className="section-title"
                    style={{ marginRight: 0, marginLeft: "-604px" }}
                  >
                    TECHNICAL
                  </span>
                  <img
                    src="../images/dashboard_main/Group 1687.png"
                    alt="Technical Icon"
                    className="section-icon"
                    style={{ marginLeft: "-366px", marginRight: "274px" }}
                  />
                  <span
                    className="section-number"
                    style={{ color: "#DF2330", marginRight: "643px" }}
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
                    style={{ bottom: "-11px" }}
                  >
                    <input type="text" />
                    <img
                      style={{ width: "55px", right: "1px" }}
                      src="../images/dashboard_main/Group 2555.png"
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
                    style={{ bottom: "-11px" }}
                  >
                    <input type="text" />
                    <img
                      style={{ width: "55px", right: "1px" }}
                      src="../images/dashboard_main/Group 2555.png"
                      alt="Down Arrow"
                    />
                  </div>
                </div>

                <div className="field-container" style={{ width: "10%" }}>
                  <span className="field-name" style={{ marginLeft: "-66px" }}>
                    DATE
                  </span>
                  <div className="date-picker" style={{ bottom: "-11px" }}>
                    <input type="text" />
                    <img
                      style={{ width: "55px", right: "-12px" }}
                      src="../images/dashboard_main/Frame 1966.png"
                      alt="Calendar Icon"
                    />
                  </div>
                </div>

                <div className="field-container">
                  <span className="field-name">
                    LIST
                    <br />
                    (50)
                  </span>
                  <img
                    src="../images/dashboard_main/Group 1830.png"
                    alt="List Icon"
                  />
                </div>

                <div className="field-container">
                  <span className="field-name">
                    CARD
                    <br />
                    (50)
                  </span>
                  <img
                    src="../images/dashboard_main/Group 1821.png"
                    alt="Card Icon"
                  />
                </div>
                <div className="field-container">
                  <span className="field-name">
                    RAISE
                    <br /> TICKET
                  </span>
                  <img
                    src="../images/dashboard_main/Group 1829.png"
                    alt="List Icon"
                  />
                </div>
              </div>
            </div>

            <div className="list-view-section">
              <span className="list-view-text">LIST VIEW (42)</span>
            </div>
            <div class="card-container">
              <div className="card">
                <div className="left-section">MATCH 33, MEN, DOMESTIC</div>
                <div className="main-content-card">
                  <div
                    className="header-card content"
                    style={{
                      marginBottom: "0px",
                      borderBottomWidth: "0px",
                      borderBottomStyle: "solid",
                      bottom: "20px",
                    }}
                  >
                    <div className="row">
                      <h5>BANGLADESH PREMIER LEAGUE</h5>
                      <br />
                      <p className="sub-text">
                        26-Jan-2025, 13:30 (L) 11:30 (D)
                        <br />
                        Shere Bangla National Stadium
                      </p>
                    </div>

                    <p className="sub-text"></p>
                    <div
                      className="first-class"
                      style={{
                        marginLeft: "0px",
                        left: "227.467px",
                        right: "0px",
                        borderLeftWidth: "0px",
                        borderLeftStyle: "solid",
                        paddingLeft: "5px",
                        bottom: "0px",
                        top: "0px",
                        marginTop: "0px",
                        borderTopWidth: "0px",
                        borderTopStyle: "solid",
                        paddingTop: "25px",
                      }}
                    >
                      FIRST CLASS
                    </div>
                  </div>

                  <div className="content" style={{ marginTop: "0px" }}>
                    <div
                      className="team-section"
                      style={{
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        paddingBottom: "0px",
                        paddingTop: "0px",
                      }}
                    >
                      <div className="team">
                        <img
                          src="../images/dashboard_main/B (1).png"
                          alt="Team 1"
                        />
                        <p>NB W</p>
                      </div>
                      <div
                        className="timer"
                        style={{
                          paddingLeft: "5px",
                          borderLeftWidth: "0px",
                          borderLeftStyle: "solid",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        Starting in 18h:15m:49s
                      </div>
                      <div className="team">
                        <img
                          src="../images/dashboard_main/H (1).png"
                          alt="Team 2"
                        />
                        <p>CH W</p>
                      </div>
                    </div>
                  </div>

                  <div className="footer">
                    <div className="footer-top">
                      <div
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "0px",
                          marginRight: "-97px",
                          marginLeft: "-40px",
                        }}
                      >
                        ODDS
                      </div>
                      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        REVIEW
                      </div>
                    </div>
                    <div
                      className="footer-bottom"
                      style={{
                        paddingLeft: "0px",
                        paddingRight: "75px",
                        marginLeft: "0px",
                        left: "0px",
                      }}
                    >
                      OPERATOR NAME{" "}
                      <img
                        src="../images/dashboard_main/arrow_down.png"
                        alt="Arrow Down"
                      />
                      <div
                        className="ticket"
                        style={{
                          left: "226.983px",
                          right: "0px",
                          borderTopWidth: "0px",
                          borderTopStyle: "solid",
                          paddingTop: "23px",
                          paddingBottom: "0px",
                          borderBottomWidth: "0px",
                          borderBottomStyle: "solid",
                          marginTop: "0px",
                          top: "-42px",
                          marginBottom: "-10px",
                        }}
                      >
                        <img
                          src="../images/dashboard_main/Group 1829.png"
                          alt="Group 1829"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
              <div className="left-section">MATCH 33, MEN, DOMESTIC</div>
              <div className="main-content-card">
                <div
                  className="header-card content"
                  style={{
                    marginBottom: "0px",
                    borderBottomWidth: "0px",
                    borderBottomStyle: "solid",
                    bottom: "20px",
                  }}
                >
                  <div className="row">
                    <h5>BANGLADESH PREMIER LEAGUE</h5>
                    <br />
                    <p className="sub-text">
                      26-Jan-2025, 13:30 (L) 11:30 (D)
                      <br />
                      Shere Bangla National Stadium
                    </p>
                  </div>

                  <p className="sub-text"></p>
                  <div
                    className="first-class"
                    style={{
                      marginLeft: "0px",
                      left: "227.467px",
                      right: "0px",
                      borderLeftWidth: "0px",
                      borderLeftStyle: "solid",
                      paddingLeft: "5px",
                      bottom: "0px",
                      top: "0px",
                      marginTop: "0px",
                      borderTopWidth: "0px",
                      borderTopStyle: "solid",
                      paddingTop: "25px",
                    }}
                  >
                    FIRST CLASS
                  </div>
                </div>

                <div className="content" style={{ marginTop: "0px" }}>
                  <div
                    className="team-section"
                    style={{
                      borderBottomWidth: "0px",
                      borderBottomStyle: "solid",
                      paddingBottom: "0px",
                      paddingTop: "0px",
                    }}
                  >
                    <div className="team">
                      <img
                        src="../images/dashboard_main/B (1).png"
                        alt="Team 1"
                      />
                      <p>NB W</p>
                    </div>
                    <div
                      className="timer"
                      style={{
                        paddingLeft: "5px",
                        borderLeftWidth: "0px",
                        borderLeftStyle: "solid",
                        marginLeft: "30px",
                        marginRight: "30px",
                      }}
                    >
                      Starting in 18h:15m:49s
                    </div>
                    <div className="team">
                      <img
                        src="../images/dashboard_main/H (1).png"
                        alt="Team 2"
                      />
                      <p>CH W</p>
                    </div>
                  </div>
                </div>

                <div className="footer">
                  <div className="footer-top">
                    <div
                      style={{
                        paddingRight: "0px",
                        paddingLeft: "0px",
                        marginRight: "-97px",
                        marginLeft: "-40px",
                      }}
                    >
                      ODDS
                    </div>
                    <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                      REVIEW
                    </div>
                  </div>
                  <div
                    className="footer-bottom"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "75px",
                      marginLeft: "0px",
                      left: "0px",
                    }}
                  >
                    OPERATOR NAME{" "}
                    <img
                      src="../images/dashboard_main/arrow_down.png"
                      alt="Arrow Down"
                    />
                    <div
                      className="ticket"
                      style={{
                        left: "226.983px",
                        right: "0px",
                        borderTopWidth: "0px",
                        borderTopStyle: "solid",
                        paddingTop: "23px",
                        paddingBottom: "0px",
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        marginTop: "0px",
                        top: "-42px",
                        marginBottom: "-10px",
                      }}
                    >
                      <img
                        src="../images/dashboard_main/Group 1829.png"
                        alt="Group 1829"
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div className="card">
                <div className="left-section">MATCH 33, MEN, DOMESTIC</div>
                <div className="main-content-card">
                  <div
                    className="header-card content"
                    style={{
                      marginBottom: "0px",
                      borderBottomWidth: "0px",
                      borderBottomStyle: "solid",
                      bottom: "20px",
                    }}
                  >
                    <div className="row">
                      <h5>BANGLADESH PREMIER LEAGUE</h5>
                      <br />
                      <p className="sub-text">
                        26-Jan-2025, 13:30 (L) 11:30 (D)
                        <br />
                        Shere Bangla National Stadium
                      </p>
                    </div>

                    <p className="sub-text"></p>
                    <div
                      className="first-class"
                      style={{
                        marginLeft: "0px",
                        left: "227.467px",
                        right: "0px",
                        borderLeftWidth: "0px",
                        borderLeftStyle: "solid",
                        paddingLeft: "5px",
                        bottom: "0px",
                        top: "0px",
                        marginTop: "0px",
                        borderTopWidth: "0px",
                        borderTopStyle: "solid",
                        paddingTop: "25px",
                      }}
                    >
                      FIRST CLASS
                    </div>
                  </div>

                  <div className="content" style={{ marginTop: "0px" }}>
                    <div
                      className="team-section"
                      style={{
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        paddingBottom: "0px",
                        paddingTop: "0px",
                      }}
                    >
                      <div className="team">
                        <img
                          src="../images/dashboard_main/B (1).png"
                          alt="Team 1"
                        />
                        <p>NB W</p>
                      </div>
                      <div
                        className="timer"
                        style={{
                          paddingLeft: "5px",
                          borderLeftWidth: "0px",
                          borderLeftStyle: "solid",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        Starting in 18h:15m:49s
                      </div>
                      <div className="team">
                        <img
                          src="../images/dashboard_main/H (1).png"
                          alt="Team 2"
                        />
                        <p>CH W</p>
                      </div>
                    </div>
                  </div>

                  <div className="footer">
                    <div className="footer-top">
                      <div
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "0px",
                          marginRight: "-97px",
                          marginLeft: "-40px",
                        }}
                      >
                        ODDS
                      </div>
                      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        REVIEW
                      </div>
                    </div>
                    <div
                      className="footer-bottom"
                      style={{
                        paddingLeft: "0px",
                        paddingRight: "75px",
                        marginLeft: "0px",
                        left: "0px",
                      }}
                    >
                      OPERATOR NAME{" "}
                      <img
                        src="../images/dashboard_main/arrow_down.png"
                        alt="Arrow Down"
                      />
                      <div
                        className="ticket"
                        style={{
                          left: "226.983px",
                          right: "0px",
                          borderTopWidth: "0px",
                          borderTopStyle: "solid",
                          paddingTop: "23px",
                          paddingBottom: "0px",
                          borderBottomWidth: "0px",
                          borderBottomStyle: "solid",
                          marginTop: "0px",
                          top: "-42px",
                          marginBottom: "-10px",
                        }}
                      >
                        <img
                          src="../images/dashboard_main/Group 1829.png"
                          alt="Group 1829"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                <div className="card">
                <div className="left-section">MATCH 33, MEN, DOMESTIC</div>
                <div className="main-content-card">
                  <div
                    className="header-card content"
                    style={{
                      marginBottom: "0px",
                      borderBottomWidth: "0px",
                      borderBottomStyle: "solid",
                      bottom: "20px",
                    }}
                  >
                    <div className="row">
                      <h5>BANGLADESH PREMIER LEAGUE</h5>
                      <br />
                      <p className="sub-text">
                        26-Jan-2025, 13:30 (L) 11:30 (D)
                        <br />
                        Shere Bangla National Stadium
                      </p>
                    </div>

                    <p className="sub-text"></p>
                    <div
                      className="first-class"
                      style={{
                        marginLeft: "0px",
                        left: "227.467px",
                        right: "0px",
                        borderLeftWidth: "0px",
                        borderLeftStyle: "solid",
                        paddingLeft: "5px",
                        bottom: "0px",
                        top: "0px",
                        marginTop: "0px",
                        borderTopWidth: "0px",
                        borderTopStyle: "solid",
                        paddingTop: "25px",
                      }}
                    >
                      FIRST CLASS
                    </div>
                  </div>

                  <div className="content" style={{ marginTop: "0px" }}>
                    <div
                      className="team-section"
                      style={{
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        paddingBottom: "0px",
                        paddingTop: "0px",
                      }}
                    >
                      <div className="team">
                        <img
                          src="../images/dashboard_main/B (1).png"
                          alt="Team 1"
                        />
                        <p>NB W</p>
                      </div>
                      <div
                        className="timer"
                        style={{
                          paddingLeft: "5px",
                          borderLeftWidth: "0px",
                          borderLeftStyle: "solid",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      >
                        Starting in 18h:15m:49s
                      </div>
                      <div className="team">
                        <img
                          src="../images/dashboard_main/H (1).png"
                          alt="Team 2"
                        />
                        <p>CH W</p>
                      </div>
                    </div>
                  </div>

                  <div className="footer">
                    <div className="footer-top">
                      <div
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "0px",
                          marginRight: "-97px",
                          marginLeft: "-40px",
                        }}
                      >
                        ODDS
                      </div>
                      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        REVIEW
                      </div>
                    </div>
                    <div
                      className="footer-bottom"
                      style={{
                        paddingLeft: "0px",
                        paddingRight: "75px",
                        marginLeft: "0px",
                        left: "0px",
                      }}
                    >
                      OPERATOR NAME{" "}
                      <img
                        src="../images/dashboard_main/arrow_down.png"
                        alt="Arrow Down"
                      />
                      <div
                        className="ticket"
                        style={{
                          left: "226.983px",
                          right: "0px",
                          borderTopWidth: "0px",
                          borderTopStyle: "solid",
                          paddingTop: "23px",
                          paddingBottom: "0px",
                          borderBottomWidth: "0px",
                          borderBottomStyle: "solid",
                          marginTop: "0px",
                          top: "-42px",
                          marginBottom: "-10px",
                        }}
                      >
                        <img
                          src="../images/dashboard_main/Group 1829.png"
                          alt="Group 1829"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>         
            </div>

            

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
