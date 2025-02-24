import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import SearchIcon from '../images/dashboard_main/Group 2555.png'
import GroupIcon from '../images/dashboard_main/Group 1830.png'
import CardIcon from '../images/dashboard_main/Group 1821.png'
import Ticket from '../images/dashboard_main/Group 1829.png'
import DateIcon from '../images/dashboard_main/Frame 1966.png'

import img1 from '../images/dashboard_main/B (1).png'
import img2 from '../images/dashboard_main/H (1).png'
import img3 from '../images/dashboard_main/Group 1823.png'
import img4 from '../images/dashboard_main/arrow_down.png'

import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../utils/axiosInstance"; // Adjust path as needed
import ApiAuthProvider from "../utils/AuthProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import "../styles/SearchHeader.css";
import "../styles/Card.css";
import { px } from "framer-motion";

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

  const options = [
    "T20",
    "ODI",
    "T10",
    "T100",
    "TEST",
    "First Class(3-Days)",
    "First Class(4-Days)",
  ];

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
    const matchDate = match.date
      ? new Date(match.date).toISOString().split("T")[0]
      : null;
    const selectedDate = selectedStartDate
      ? selectedStartDate.toISOString().split("T")[0]
      : null;

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
                <span className="heading-text" style={{ marginLeft: "463px" }}>
                  Dashboard
                </span>
                <div className="toggle-container">
                  <div className="toggle" style={{ left: "150px" }}></div>
                  <span className="all-reports">ALL REPORTS</span>
                </div>
              </div>

              <div className="content">
                <div className="slider">
                  <div className="section">
                    <span className="section-title">TOTAL MATCH CARD</span>
                    <img
                      src="../images/dashboard_main/Group 1526.png"
                      alt="Admin Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#9F41A4" }}
                    >
                      50
                    </span>
                  </div>

                  <div className="separator"></div>

                  <div className="section">
                    <span className="section-title">ASSIGNED</span>
                    <img
                      src="../images/dashboard_main/Group 1527.png"
                      alt="Operator Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#00AC4F" }}
                    >
                      24
                    </span>
                  </div>

                  <div className="separator"></div>

                  <div className="section">
                    <span className="section-title">PENDING</span>
                    <img
                      src="../images/dashboard_main/Group 1536.png"
                      alt="Pending Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#FCA502" }}
                    >
                      12
                    </span>
                  </div>

                  <div className="separator"></div>

                  <div className="section">
                    <span className="section-title">ERROR</span>
                    <img
                      src="../images/dashboard_main/Group 1537.png"
                      alt="Error Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#DF2330" }}
                    >
                      01
                    </span>
                  </div>

                  <div className="separator"></div>

                  <div className="section">
                    <span className="section-title">REVIEW</span>
                    <img
                      src="../images/dashboard_main/Group 1681.png"
                      alt="Review Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#5D8BC7" }}
                    >
                      01
                    </span>
                  </div>

                  <div className="separator"></div>

                  <div className="section">
                    <span className="section-title">APPROVED</span>
                    <img
                      src="../images/dashboard_main/Group 1680.png"
                      alt="Approved Icon"
                      className="section-icon"
                    />
                    <span
                      className="section-number"
                      style={{ color: "#8BB32D" }}
                    >
                      01
                    </span>
                  </div>
                </div>
              </div>
            </div>

             <div className="box-search" >
                <div className="content" style={{marginTop:"0px"}}>
                    {/* <!-- Series Search Bar --> */}
                    <div className="field-container" style={{width: "30%", paddingLeft:"0px"}} >
                    <span className="field-name-input">SERIES</span>
                    <div className="search-bar series-search" style={{bottom : "-11px"}}>
                        <input type="text"/>
                        <img style={{width:"55px",right: "1px"}} src={SearchIcon} alt="Down Arrow"/>
                    </div>
                    </div>
                
                    {/* <!-- Match Format Search Bar --> */}
                    <div className="field-container" style={{width: "25%"}}>
                    <span className="field-name-input" >MATCH FORMAT</span>
                    <div className="search-bar match-search" style={{bottom : "-11px"}}>
                    {
                      <select
                        value={selectedMatch}
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        className="dropdown-select"
                      >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    }
                        <img style={{width:"55px",right: "1px"}} src={SearchIcon} alt="Down Arrow"/>
                    </div>
                    </div>
                
                    {/* <!-- Date Picker --> */}
                    <div className="field-container" style={{width: "16%"}}>
                    <span className="field-name-input" >DATE</span>
                    <div className="date-picker" style={{bottom : "-11px"}}>
                        <DatePicker
                            ref={datePickerRef}
                            selected={selectedStartDate}
                            onChange={(date) => setSelectedStartDate(date)}
                            dateFormat="yyyy-MM-dd" // Customize date format as needed
                            className="date-picker-input" // Add a class for styling
                            placeholderText="Select a date"
                        />
                        <img style={{width:"55px",right: "-12px"}} src={DateIcon} alt="Calendar Icon"/>
                    </div>
                    </div>
                
                    {/* <!-- List Section --> */}
                    <div className="field-container">
                        <span className="field-name-input">LIST<br/>(50)</span>
                        <img src={GroupIcon} alt="List Icon"/>
                    </div>

                    {/* <!-- Card Section --> */}
                    <div className="field-container">
                        <span className="field-name-input">CARD<br/>(50)</span>
                        <img src={CardIcon} alt="Card Icon"/>
                    </div>
                    <div className="field-container">
                        <span className="field-name-input">RAISE<br/> TICKET</span>
                        <img src={Ticket} alt="List Icon"/>
                    </div>
                </div>
            </div>    
            {/* <div className="box">
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
                    {
                      <select
                        value={selectedMatch}
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        className="dropdown-select"
                      >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    }
                    <img
                      style={{ width: "55px", right: "1px", cursor: "pointer" }}
                      src="../images/dashboard_main/Group 2555.png"
                      alt="Down Arrow"
                    />
                  </div>
                </div>

                <div className="field-container" style={{ width: "14%" }}>
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
            </div> */}

            <div className="list-view-section">
              <span className="list-view-textD">
                CARD VIEW ({filteredMatches.length})
              </span>
            </div>
            <div className="card-container-main">
            {filteredMatches.map((match, index) => (
                <div className='card-container'  key={index}>
                <div className='match-number'> MATCH {match.m5MatchNo}, {match.m5GenderName?.toUpperCase()}
                    ,{" "}
                    {match.m5CompetitionName
                      ? match.m5CompetitionName.substring(0, 21).trim()
                      : ""}</div>
                <div className='match-name'>
                    <div className='bpl-className'>
                        <div className='bpl-name-time'>
                            <div className='bpl-name'>{match.m5SeriesName}</div>
                            <div className='date-time'>{match.m5StartDate?.split("T")[0]},{" "}
                            {match.m5MatchStartTimeLocal} (Local)</div>
                            <div className='stadium-name'>{match.m5GroundName}</div>
                        </div>
                        <div className='firstClass'><div className='firstclass-name'>{match.m5MatchFormat}</div></div>
                    </div>
                    <div className='team-name-time'>
                        <div className='team1Name-img'>
                            <div><img style={{width:"41px"}} src={match.m5TeamALogo} alt={match.m5TeamA} /></div>
                            <div>{match.m5TeamAShortName}</div>
                        </div>
                        <div className='matchTime'>
                            <div>Starting in</div>
                            <div>{match.m5MatchStartTimeLocal}</div>
                        </div>
                        <div className='team2Name-img'>
                            <div><img style={{width:"41px"}} src={match.m5TeamBLogo} alt={match.m5TeamB} /></div>
                            <div>{match.m5TeamBShortName}</div>
                        </div>
                    </div>
                    <div className='odds-review-operator'>
                        <div className='odds-review-operator-name'>
                            <div className='odds-review'>
                                <div className='odds'>ODDS</div>
                                <div className='review-name'>REVIEW</div>
                            </div>
                            <div className='operator-name'><div>OPERATOR NAME</div><img src={img4}/></div>
                        </div>
                        <div className='menubar'><div className='menubar-img'><img src={img3}/></div></div>
                    </div>
                </div>
                </div>
            ))}
            </div>
           
            
            
            {/* Pagination Controls */}
            {filteredMatches.length > 0 && (
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
