import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NamingHeader from "./NamingHeader";
import "../styles/OddsDashboard.css";
import ReviewMainPage from "./Review_mainPage";


const OddsDashboard = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  

  const [matchById, setMatchById] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalMarkets, setTotalMarkets] = useState(0); // Total market count
  const [selectedMarketsTotal, setSelectedMarketsTotal] = useState(0);

  const [isVerified, setIsVerified] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories-with-markets", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchById = async () => {
    try {
      const response = await axiosInstance.get(`/fetchMatchesById/${matchId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
     // console.log("Match by ID API Response:", response.data);
      setMatchById(response.data.data); // Fix: response.data.data contains the actual match info
    } catch (error) {
      console.error("Error fetching match by ID:", error);
    }
  };

  useEffect(() => {
    if (authToken && matchId) {
      fetchMatchById();
      fetchCategories();
    } else {
      console.log("Auth token or matchId is missing.");
    }
  }, [authToken, matchId]); // ✅ useEffect is now always called in the same order

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  //console.log("Categories:", categories);
  return (
    <>
      <Header />
      <div className="category-management">
        <div className="category-management-container">
          <Sidebar />
          <div className="main-content">
            <NamingHeader matchById={matchById} 
             totalMarkets={totalMarkets}
             selectedMarkets={selectedMarketsTotal}
             isVerified={isVerified} setIsVerified={setIsVerified}
             />
            <ReviewMainPage categories = {categories} matchId={matchId}
            setTotalMarkets={setTotalMarkets} 
            setSelectedMarketsCount={setSelectedMarketsTotal} 
            isVerified={isVerified}
            />
           
          </div>
        </div>
      </div>
    </>
  );
};

export default OddsDashboard;
