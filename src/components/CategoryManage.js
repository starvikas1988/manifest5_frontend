import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/CategoryManage.css";

const CategoryManage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState(""); // New state for message
    const [messageType, setMessageType] = useState(""); // New state for message type (success or error)
   
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get("/category", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            console.log("Categories:", response.data.data);
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
        fetchCategories();
    }, [authToken]);

    // Handle new category name input
    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    // Submit new category
    const handleCategorySubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosInstance.post(
                "/category",
                { name: categoryName },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            fetchCategories(); // Refresh category list
            setCategoryName(""); // Clear input field
            setMessage("Category added successfully!"); // Success message
            setMessageType("success");
            setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error("Error creating category:", error);
            setMessage("Error adding category.");
            setMessageType("error");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    // Delete category
    const handleDeleteCategory = async (categoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            fetchCategories(); // Refresh category list
            setMessage("Category deleted successfully!"); // Success message
            setMessageType("delete");
            setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error("Error deleting category:", error);
            setMessage("Error deleting category.");
            setMessageType("error");
            setTimeout(() => setMessage(""), 3000);
        }
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
                                    <button className="save-btn" onClick={handleCategorySubmit}>
                                        💾 Save
                                    </button>
                                </div>
                            </div>

                            {/* Message Display */}
                            {message && (
                                <div className={`message ${messageType}`}>
                                    {message}
                                </div>
                            )}

                            <div className="action-buttons">
                                <button className="refresh-btn" onClick={fetchCategories}>
                                    🔄 Refresh
                                </button>
                                <button className="cancel-btn" onClick={() => setCategoryName("")}>
                                    ❌ Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryManage;
