import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NamingHeader from "./NamingHeader";
import ReviewMainPage from "./ReviewMainPage";
import ReviewMainPageTable1 from "./ReviewMainPageTable1";
import ReviewMainPageTable from "./ReviewMainPageTable";


const ReviewMatchCard = () => {
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
      categories.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      ) ||
      tempCategories.some(
        (cat) => cat.toLowerCase() === categoryName.toLowerCase()
      )
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
    setTempCategories(tempCategories.filter((cat) => cat !== categoryToRemove));
    showMessage("Category removed from temporary list.", "error");
  };

  return (
    <>
      <Header />
      <div className="category-management">
        <div className="category-management-container">
          <Sidebar />
          <div className="main-content">
             <NamingHeader />
            <ReviewMainPage />
            <ReviewMainPageTable1 />
            <ReviewMainPageTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewMatchCard;
