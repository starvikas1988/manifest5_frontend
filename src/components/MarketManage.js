import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/MarketManage.css"; // Importing styles

const MarketManage = () => {
    const [newMarket, setNewMarket] = useState(""); 
    const [addedMarkets, setAddedMarkets] = useState([]);
    const [categories, setCategories] = useState([]); // Existing categories
    const [categoryName, setCategoryName] = useState("");
    const [tempCategories, setTempCategories] = useState([]); // Temporary categories before submitting
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    // Handles input change
    const handleInputChange = (event) => {
        setNewMarket(event.target.value);
    };

    // Handles market addition
    const handleAddMarket = () => {
        if (newMarket.trim() && !addedMarkets.includes(newMarket)) {
            setAddedMarkets([...addedMarkets, newMarket]);
            setNewMarket(""); // Clear input field
        }
    };

    // Handles market removal
    const handleRemoveMarket = (market) => {
        setAddedMarkets(addedMarkets.filter((m) => m !== market));
    };

    // Handles final submission
    const handleSubmitMarkets = () => {
        console.log("Submitted Markets:", addedMarkets);
    };
    const handleDeleteCategory = (id) => {
        console.log("Submitted Markets:", id);
    };

    return (
        <>
        <Header />
        <div className="market-manage-container">
        <div className="market-management-container"> 
        <Sidebar />
        <div className="main-content">
            <div className="category-container">
            <div className="category-market-section">
                <div className="category-dropdown">
                    <label> CATEGORY (16) </label>
                    <input type="text" placeholder="Select Category" />
                </div>
                <div className="market-dropdown">
                    <label> MARKET </label>
                    <div className="market-count">50
                        <img src="../images/visibility.png" alt="Arrow Down" />
                    </div>
                </div>
            </div>

                <h3 className="category-name">Existing Categories ({categories.length})</h3>
                <div className="category-scroller">
                    <ul className="category-list">
                        {categories.map((category) => (
                            <li key={category.id} className="category-item">
                                {category.name}
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    🗑
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <h3 className="category-name">Add New Market</h3>
                <div className="background-wrapper">
                    <div className="add-category">
                        <input
                            type="text"
                            placeholder="Enter category..."
                            value={categoryName}
                            
                        />
                        <img src="../images/save_btn.png"  alt="Save"/>
                    </div>
                </div>

                {message && <div className={`message ${messageType}`}>{message}</div>}

                <div className="category-action-container">
                    <div className="added-category-container">
                        {tempCategories.map((tempCategory, index) => (
                            <div key={index} className="added-category">
                                <span>{tempCategory}</span>
                                <button
                                    className="delete-btn"
                                    onClick={() => console.log("okk")}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <img src="../images/submit_btn.png" alt="Submit" onClick={console.log("submit")} />
                        <img src="../images/refresh_btn.png" alt="Refresh" onClick={console.log("Refresh")} />
                        <img src="../images/cancel_btn.png" alt="Cancel" onClick={() => console.log("Cancel")} />
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
        </>
       
    );
};

export default MarketManage;
