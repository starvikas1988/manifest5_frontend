import React, { useState, useEffect } from "react";
import "../styles/Matchtable.css";
import axiosInstance from "../utils/axiosInstance";
import img1 from '../images/dashboard_main/24.png';
import img2 from '../images/dashboard_main/Group 1516.png';
import img3 from '../images/dashboard_main/confirmation_number.png';

function Matchtable({ category,matchId, updateMarketSelection, selectedMarkets,isVerifiedata  }) {
  const [localSelectedMarkets, setLocalSelectedMarkets] = useState(selectedMarkets || []);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const authToken = localStorage.getItem("token");

  console.log(category);

  // ✅ Sync with parent component when it updates selectedMarkets
  useEffect(() => {
    setLocalSelectedMarkets(selectedMarkets);
    setIsAllSelected(selectedMarkets.length === category.markets.length);
  }, [selectedMarkets, category.markets]);

  // ✅ Handle individual checkbox selection
  const handleMarketSelection = (marketId) => {
    setLocalSelectedMarkets((prevSelected) => {
      const updatedMarkets = prevSelected.includes(marketId)
        ? prevSelected.filter((id) => id !== marketId) // Remove if unchecked
        : [...prevSelected, marketId]; // Add if checked

      setIsAllSelected(updatedMarkets.length === category.markets.length);
      updateMarketSelection(category.id, updatedMarkets); // ✅ Update parent state
      return updatedMarkets;
    });
  };

  // ✅ Handle "Select All" checkbox
  const handleSelectAll = () => {
    const allMarketIds = category.markets.map((market) => market.id);
    const newSelectedMarkets = isAllSelected ? [] : allMarketIds;

    setLocalSelectedMarkets(newSelectedMarkets);
    setIsAllSelected(!isAllSelected);
    updateMarketSelection(category.id, newSelectedMarkets); // ✅ Update parent state
  };

  // ✅ API Call when clicking the Submit checkbox
  const handleSubmit = async () => {
    if (localSelectedMarkets.length === 0) {
      alert("Please select at least one market");
      return;
    }

    if (!isVerifiedata) {
      alert("You need to verify before submitting!"); // Prevent submission if not verified
      return;
    }

    // try {

    //   const response = await axiosInstance.post("/assignments", {
    //     categoryId: category.id,
    //     marketIds: localSelectedMarkets,
    //     operatorId: category.operator_id,
    //     matchId: matchId,
    //   }, {
    //     headers: { Authorization: `Bearer ${authToken}` }
    //   });
      

    //   if (response.status === 200) {
    //     alert("Markets added successfully!");
    //   }
    // } catch (error) {
    //   console.error("Error adding markets:", error);
    // }
  };

  return (
    <div className="matchtable">
      <div className="matchtable__header">
        {/* ✅ Select All Checkbox */}
        <div className="input_div">
          <input
            type="checkbox"
            className="input_check"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
        </div>
        <div className="img_batsman">
          <div><img src={img1} alt="icon" /></div>
          <div>{category.name}</div>
        </div>
        <div className="batsman_profile_menu">
          <div className="batsman_profile_div"><img src={img2} alt="batsman_profile" /></div>
          <div className="batsman_manu_div"><img src={img3} alt="batsman_manu" /></div>
        </div>
      </div>

      <div className="matchtable_body">
        {/* ✅ First Column - Market Selection */}
        <div className="first_column">
          <div className="first_column_contain">
            <div>SELECT</div>
            <div>({localSelectedMarkets.length})</div>
          </div>
          <div className="checkboxdiv">
            {category.markets?.map((market) => (
              <div key={market.id}>
                <input
                  type="checkbox"
                  value={market.id}
                  onChange={() => handleMarketSelection(market.id)}
                  checked={localSelectedMarkets.includes(market.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Second Column - Market Names */}
        <div className="second_column">
          <div className="second_column_contain">MARKET</div>
          {category.markets?.map((market) => (
            <div key={market.id} className="btn">{market.name}</div>
          ))}
        </div>

        {/* ✅ Third Column - Submit Checkbox */}
        <div className="third_column">
          <div className="third_column_contain">SUBMIT</div>
          <div className="align-contain">
            <input type="checkbox" onClick={handleSubmit} disabled={!isVerifiedata} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matchtable;
