import React, { useState, useEffect } from "react";
import "../styles/Review_mainPage.css";
import img2 from "../images/dashboard_main/Frame 1706.png";
import img3 from "../images/dashboard_main/Group 1515.png";
import Matchtable from "./Matchtable";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function ReviewMainPage({ categories,matchId, setTotalMarkets, setSelectedMarketsCount,isVerified }) {
  const isVerifiedata = isVerified;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [marketCounts, setMarketCounts] = useState({});
  const [selectedMarkets, setSelectedMarkets] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // ✅ Update selected market count per category
  const updateMarketSelection = (categoryId, selectedMarketIds ) => {
    setSelectedMarkets((prev) => ({
      ...prev,
      [categoryId]: selectedMarketIds,
    }));

    setMarketCounts((prevCounts) => ({
      ...prevCounts,
      [categoryId]: selectedMarketIds.length,
    }));
  };

  // ✅ Calculate total market count & selected market count whenever state changes
  useEffect(() => {
    const totalMarkets = categories.reduce((acc, category) => acc + category.market_count, 0);
    const selectedMarketsTotal = Object.values(marketCounts).reduce((acc, count) => acc + count, 0);

    setTotalMarkets(totalMarkets); // 🔼 Pass total markets to OddsDashboard
    setSelectedMarketsCount(selectedMarketsTotal); // 🔼 Pass selected markets to OddsDashboard
  }, [categories, marketCounts, setTotalMarkets, setSelectedMarketsCount]);

  // ✅ Handle category click → Show only its markets
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectAll(false); // Disable "Select All" mode
  };

  // ✅ Handle "Select All" Click → Show all categories' markets
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    setSelectedCategoryId(isChecked ? null : selectedCategoryId);
  };

  const handleAssignAll = async () => {
    // Step 1: Collect all selected markets
    const selectedAssignments = Object.entries(selectedMarkets)
      .map(([categoryId, marketIds]) => {
        const category = categories.find((cat) => cat.id === parseInt(categoryId));
        if (!category || marketIds.length === 0) return null;
  
        return {
          categoryId: category.id,
          marketIds: marketIds,
          operatorId: category.operator_id,
          matchId: matchId,
        };
      })
      .filter(Boolean); // Remove empty entries
      console.log("selectedAssignments",selectedAssignments);
    // Step 2: Validation - Check if markets are selected
    if (selectedAssignments.length === 0) {
      alert("Please select at least one market before assigning!");
      return;
    }
  
    // Step 3: Ensure verification is completed
    if (!isVerified) {
      alert("You need to verify before assigning!");
      return;
    }
  
    // Step 4: Submit all assignments in one API call
    try {
      const authToken = localStorage.getItem("token");
      const response = await axiosInstance.post("/assignments/bulk", { assignments: selectedAssignments }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
  
      if (response.status === 201) {
        alert("All selected markets assigned successfully!");
      }
    } catch (error) {
      console.error("Error assigning markets:", error);
    }
  };
  
  const handleRaiseTicket = () => {
    if (!matchId) {
      alert("Match ID is missing!");
      return;
    }
  
    navigate(`/manage-ticket?matchId=${matchId}`);
  };

  const handleAddcategoryClick = () => {
    navigate("/category_manage");
  };

  const handleManageMarket = (categoryId) => {
    navigate(`/manage-market?categoryId=${categoryId}`);
  };
  
  return (
    <>
      <div className="row3">
        <div className="info-container1">
          {/* First Column */}
          <div className="country-container" style={{ display: "flex", gap: "10px", width: "65%" }}>
            <div className="grid-row1">
              <div className="category-box1">CAT NAME</div>
              <div className="category-box1" onClick={handleAddcategoryClick} style={{ cursor: "pointer" }}>ADD NAME</div>
            </div>
            <div className="boxes" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.id} className="selection-box1">
                    <div className="left">
                      <button className="checkmark">✔</button>
                      <span className="amount">{category.market_count}</span>
                    </div>
                    <span
                      className="cup"
                      style={{
                        cursor: "pointer",
                        fontWeight: selectedCategoryId === category.id ? "bold" : "normal",
                      }}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name || "N/A"}
                    </span>
                    <div className="right">
                      <button className="plus" onClick={() => handleManageMarket(category.id)}>+</button>
                      <span className="amount">{marketCounts[category.id] || 0}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          </div>

          {/* Select All Checkbox */}
          <div className="select-all">
            <div style={{ textAlign: "center" }}>Select All ({categories.length})</div>
            <div className="checkbox">
              <input
                type="checkbox"
                style={{ width: "125%" }}
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="controls-container">
            <div className="dropdown-input">
              <img src={img2} alt="arrow-down" />
              <input type="text" />
            </div>
            <div className="ticket-div">
              <button className="raise-ticket" onClick={handleRaiseTicket}>Raise Ticket</button>
            </div>
          </div>
        </div>
      </div>

      {/* Match Table Section */}
      <div className="match-form" style={{ display: "flex", flexWrap: "wrap", width: "95%" }}>
        {categories
          .filter((category) => selectAll || category.id === selectedCategoryId) // ✅ Show only selected or all
          .map((category) => (
            <Matchtable
              key={category.id}
              category={category}
              selectedMarkets={selectedMarkets[category.id] || []}
              updateMarketSelection={updateMarketSelection} // ✅ Pass function to update counts
              isVerifiedata={isVerifiedata}
              matchId={matchId}
            />
          ))}
      </div>

      {/* Reassign Button */}
      <div className="reassign-div">
        <button onClick={handleAssignAll}>ASSIGN ALL</button>
        <div className="img3">
          <img src={img3} />
        </div>
      </div>
    </>
  );
}

export default ReviewMainPage;
