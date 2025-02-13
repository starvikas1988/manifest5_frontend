import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/CategoryManage.css";

const CategoryManage = () => {
    const [categories, setCategories] = useState([]); // Existing categories
    const [categoryName, setCategoryName] = useState("");
    const [tempCategories, setTempCategories] = useState([]); // Temporary categories before submitting
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get("/category", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setCategories(response.data.data);
        } catch (error) {
            showMessage("Failed to load categories.", "error");
        }
    };

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
        fetchCategories();
    }, [authToken]);

    // Show message with auto-hide after 5 seconds
    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage("");
        }, 5000); // Message disappears after 5 seconds
    };

    // Handle input change
    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    // Save category to temporary list (not directly to API)
    const handleCategorySave = () => {
        if (!categoryName.trim()) {
            showMessage("Category name cannot be empty.", "error");
            return;
        }

        if (
            categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase()) ||
            tempCategories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())
        ) {
            showMessage("Category already exists.", "error");
            return;
        }

        setTempCategories([...tempCategories, categoryName]); // Add to temporary list
        setCategoryName(""); // Clear input
        showMessage("Category saved temporarily!", "success");
    };

     // Delete category
     const handleDeleteCategory = async (categoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            fetchCategories();
            showMessage("Category deleted successfully!", "error");
            
        } catch (error) {
            setMessage("Error deleting category.");
            setMessageType("error");
        }
    };

    // Submit all temporary categories to API
    const handleCategorySubmit = async () => {
        if (tempCategories.length === 0) {
            showMessage("No categories to submit.", "error");
            return;
        }

        try {
            await Promise.all(
                tempCategories.map(async (category) => {
                    await axiosInstance.post(
                        "/category",
                        { name: category },
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    );
                })
            );

            fetchCategories(); // Refresh category list
            setTempCategories([]); // Clear temporary list
            showMessage("Categories added successfully!", "success");
        } catch (error) {
            showMessage("Error adding categories.", "error");
        }
    };

    // Remove category from the temporary list
    const handleTempCategoryDelete = (categoryToRemove) => {
        setTempCategories(tempCategories.filter(cat => cat !== categoryToRemove));
        showMessage("Category removed from temporary list.", "error");
    };

    return (
        <>
            <Header />
            <div className="category-management">
                <div className="category-management-container">
                    <Sidebar />
                    <div className="main-content">
                        <div className="category-container">
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

                            <h3 className="category-name">Add New Category</h3>
                            <div className="background-wrapper">
                                <div className="add-category">
                                    <input
                                        type="text"
                                        placeholder="Enter category..."
                                        value={categoryName}
                                        onChange={handleCategoryNameChange}
                                    />
                                    <img src="../images/save_btn.png" onClick={handleCategorySave} alt="Save"/>
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
                                                onClick={() => handleTempCategoryDelete(tempCategory)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="action-buttons">
                                    <img src="../images/submit_btn.png" alt="Submit" onClick={handleCategorySubmit} />
                                    <img src="../images/refresh_btn.png" alt="Refresh" onClick={fetchCategories} />
                                    <img src="../images/cancel_btn.png" alt="Cancel" onClick={() => setTempCategories([])} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryManage;
