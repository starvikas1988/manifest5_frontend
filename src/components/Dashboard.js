import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import ApiAuthProvider from "../utils/AuthProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  //const [authApiToken, setApiAuthToken] = useState(null);
  const authApiToken = localStorage.getItem("authToken");

  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const perPage = 12; // Number of matches per page

  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const options = ["T20", "ODI", "T10","T100","TEST","First Class(3-Days)","First Class(4-Days)"];

  const [startDate, setStartDate] = useState(new Date());
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token"); // Check if logged in
  //console.log(authApiToken);

  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect if not logged in
    }
    fetchUsers();
    fetchMatches(currentPage);
  }, [authToken, navigate, currentPage, authApiToken]);

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

  const fetchMatches = async (page) => {
    try {
      const queryParams = new URLSearchParams({
        SeriesId: 0,
        StartDate: null,
        SeriesName: null,
        Tab: "Live",
        Page: page,
        PerPage: perPage,
      }).toString();

      const response = await fetch(
        `https://api.maniifest5.com/api/Dashboard?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authApiToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch dashboard data");

      const data = await response.json();
      console.log(data);
      setMatches(data.response.items);
      setTotalPages(data.response.totalPages); // Adjust this based on API response
      setTotalItems(data.response.totalItems);
    } catch (error) {
      console.error("Error fetching matches:", error);
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
  const filteredMatches = matches.filter((match) => {
    const matchDate = match.date ? new Date(match.date).toISOString().split("T")[0] : null;
    const selectedDate = selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : null;

    return (
      (!selectedMatch || match.m5MatchFormat === selectedMatch) &&
      (!selectedDate || matchDate === selectedDate)
    );
  });

  return (
    <>
      <ApiAuthProvider />
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
                    { (
                      <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} className="dropdown-select">
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    <img
                      style={{ width: "55px", right: "1px",cursor: "pointer" }}
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
                    <DatePicker
                      ref={datePickerRef}
                      selected={selectedStartDate}
                      onChange={(date) => setSelectedStartDate(date)}
                      dateFormat="yyyy-MM-dd" // Customize date format as needed
                      className="date-picker-input" // Add a class for styling
                      placeholderText="Select a date"
                    />
                    <img
                      style={{ width: "55px", right: "-12px" }}
                      src="../images/dashboard_main/Frame 1966.png"
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
                <div
                  className="field-container"
                  onClick={handleRaiseTicket}
                  style={{ cursor: "pointer" }}
                >
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
              <span className="list-view-textD">CARD VIEW ({filteredMatches.length})</span>
            </div>
            <div class="card-container">
              {filteredMatches.map((match, index) => (
                <div
                  key={index}
                  className="card"
                  style={{ height: "346px", width: "350px" }}
                >
                  <div className="left-section">
                  MATCH {match.m5MatchNo}, {match.m5GenderName?.toUpperCase()}, {match.m5CompetitionName ? match.m5CompetitionName.substring(0, 21).trim() : ""}
                  </div>
                  <div className="main-content-card" style={{ height: "100%" }}>
                    <div
                      className="header-card content"
                      style={{
                        marginBottom: "0px",
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        height: "35%",
                        marginTop: "0px",
                      }}
                    >
                      <div className="row">
                        <h5>{match.m5SeriesName}</h5>
                        <br />
                        <p className="sub-text">
                          {match.m5StartDate?.split("T")[0]},{" "}
                          {match.m5MatchStartTimeLocal} (Local)
                          <br />
                          {match.m5GroundName}
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
                        }}
                      >
                        {match.m5MatchFormat}
                      </div>
                    </div>

                    <div
                      className="content"
                      style={{ marginTop: "0px", height: "35%" }}
                    >
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
                          <img src={match.m5TeamALogo} alt={match.m5TeamA} />
                          <p>{match.m5TeamAShortName}</p>
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
                          {/* {match.m5MatchStatus === "Live" ? "Live Now" : `Starting at ${match.m5MatchStartTimeLocal}`} */}
                          Starting in {match.m5MatchStartTimeLocal}
                        </div>
                        <div className="team">
                          <img src={match.m5TeamBLogo} alt={match.m5TeamB} />
                          <p>{match.m5TeamBShortName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="footer">
                      <div className="footer-top" style={{ height: "50%" }}>
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
                        <div
                          style={{ paddingLeft: "0px", paddingRight: "0px" }}
                        >
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
                          height: "50%",
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
                            top: "-52px",
                            marginBottom: "-10px",
                          }}
                        >
                          <img
                            src="../images/dashboard_main/Group 1829.png"
                            alt="Group 1829"
                            style={{
                              marginTop: "10px", // Adjust value as needed to move the image down
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

           
            </div>
               {/* Pagination Controls */}
                { filteredMatches.length > 0 &&(
                  <div className="pagination d-flex justify-content-center align-items-center mt-3">
                  <button
                    className="btn btn-primary mx-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span className="fw-bold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-primary mx-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
