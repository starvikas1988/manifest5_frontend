import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/MarketManage.css"; // Importing styles

const MarketManage = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    const [categories, setCategories] = useState([]); // List of categories
    const [marketList, setMarketList] = useState([]); // List of markets
    const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for filtering
    const [searchTerm, setSearchTerm] = useState(""); // Search term for markets
    const [newMarket, setNewMarket] = useState(""); // Input for new market
    const [tempMarkets, setTempMarkets] = useState([]); // Temporary markets before submission
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
        fetchData();
    }, [authToken]);

    // Fetch categories & markets
    const fetchData = async () => {
        setLoading(true);
        try {
            const [categoriesRes, marketRes] = await Promise.all([
                axiosInstance.get(`/category`, { headers: { Authorization: `Bearer ${authToken}` } }),
                axiosInstance.get(`/markets`, { headers: { Authorization: `Bearer ${authToken}` } })
            ]);
            
            setCategories(categoriesRes.data.data);
            setMarketList(
                marketRes.data.map(market => ({
                    id: market.id,
                    name: market.name,
                    category_id: market.category_id,
                    category_name: market.category?.name || "Unknown"
                }))
            );

        } catch (err) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // Show messages with auto-hide
    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage("");
        }, 5000);
    };

    // Handle category selection
    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Handle market search & filtering
    const filteredMarkets = marketList.filter(market => 
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || market.category_id === parseInt(selectedCategory))
    );

    // Handle market input change
    const handleMarketInputChange = (event) => {
        setNewMarket(event.target.value);
    };

    // Add market temporarily
    const handleMarketSave = () => {
        if (!newMarket.trim()) {
            showMessage("Market name cannot be empty.", "error");
            return;
        }

        if (
            marketList.some(m => m.name.toLowerCase() === newMarket.toLowerCase()) ||
            tempMarkets.some(m => m.toLowerCase() === newMarket.toLowerCase())
        ) {
            showMessage("Market already exists.", "error");
            return;
        }

        setTempMarkets([...tempMarkets, newMarket]);
        setNewMarket("");
        showMessage("Market saved temporarily!", "success");
    };

    // Submit all temporary markets to API
    const handleMarketSubmit = async () => {
        if (tempMarkets.length === 0) {
            showMessage("No markets to submit.", "error");
            return;
        }

        try {
            await Promise.all(
                tempMarkets.map(async (market) => {
                    await axiosInstance.post(
                        "/markets",
                        { name: market, category_id: selectedCategory || categories[0]?.id }, // Default category if none selected
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    );
                })
            );

            fetchData();
            setTempMarkets([]);
            showMessage("Markets added successfully!", "success");
        } catch (error) {
            showMessage("Error adding markets.", "error");
        }
    };

    // Remove market from temporary list
    const handleTempMarketDelete = (marketToRemove) => {
        setTempMarkets(tempMarkets.filter(m => m !== marketToRemove));
        showMessage("Market removed from temporary list.", "error");
    };

    // Delete market from API
    const handleDeleteMarket = async (marketId) => {
        try {
            await axiosInstance.delete(`/markets/${marketId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            fetchData();
            showMessage("Market deleted successfully!", "error");
        } catch (error) {
            showMessage("Error deleting market.", "error");
        }
    };

    return (
        <>
            <Header />
            <div className="market-manage-container">
                <div className="market-management-container">
                    <Sidebar />
                    <div className="main-content">
                        <div className="category-container">
                            <div className="category-container_search">
                                {/* Left Side - Category Title */}
                                <div className="category-title">
                                    <div className="category-left">
                                        CATEGORY <span>({categories.length})</span>
                                    </div>
                                    <div className="market-text">MARKET</div>
                                </div>

                                {/* Search Section */}
                                <div className="search-wrapper">
                                    <div className="search-container">
                                        <select value={selectedCategory} onChange={handleCategorySelect} className="category-dropdown">
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Search Market..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="search-dropdown">
                                            <img src="../images/arrow_right.png" alt="Dropdown" className="search-dropdown-icon" />
                                            <img src="../images/search.png" alt="Search" className="search-icon" />
                                        </div>
                                    </div>

                                    {/* Number with Image */}
                                    <div className="market-section">
                                        <div className="number-box">
                                            {filteredMarkets.length}
                                            <img src="../images/visibility_icon.png" alt="View" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Market List */}
                            <div className="market-container">
    <div className="market-list">
        {filteredMarkets.map((market) => (
            <div key={market.id} className="market-item">
                {market.name} ({market.category_name})
                <button className="delete-btn" onClick={() => handleDeleteMarket(market.id)}>
                    🗑️
                </button>
            </div>
        ))}
    </div>

    <h3 className="category-name">Add New Market</h3>
    <div className="background-wrapper">
        <div className="add-category">
            <input
                type="text"
                placeholder="Enter market name..."
                value={newMarket}
                onChange={handleMarketInputChange}
            />
            <img src="../images/save_btn.png" onClick={handleMarketSave} alt="Save" />
        </div>
    </div>

    {message && <div className={`message ${messageType}`}>{message}</div>}

    <div className="category-action-container">
        <div className="added-category-container">
            {tempMarkets.map((tempMarket, index) => (
                <div key={index} className="added-market">
                    <span>{tempMarket}</span>
                    <button className="delete-btn" onClick={() => handleTempMarketDelete(tempMarket)}>
                        🗑️
                    </button>
                </div>
            ))}
        </div>

        <div className="action-buttons">
            <img src="../images/submit_btn.png" alt="Submit" onClick={handleMarketSubmit} />
            <img src="../images/refresh_btn.png" alt="Refresh" onClick={fetchData} />
            <img src="../images/cancel_btn.png" alt="Cancel" onClick={() => setTempMarkets([])} />
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

export default MarketManage;
