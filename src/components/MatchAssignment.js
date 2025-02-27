import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/MatchAssignment.css";

const MatchAssignment = () => {
  const [operators, setOperators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [assignedReviews, setAssignedReviews] = useState([]);
  const authToken = localStorage.getItem("token");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const matchId = searchParams.get("matchId");
  const matchId = 208; // make it dynamic

  // Fetch operators and categories from API
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axiosInstance("/users", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setOperators(response.data.map(op => ({ value: op.id, label: op.name })));
      } catch (error) {
        console.error("Error fetching operators:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
    
        //console.log("Category API Response:", response.data); // Debugging
    
        // Ensure response is an array before mapping
        const categoryList = Array.isArray(response.data.data)
          ? response.data.data.map(cat => ({ value: cat.id, label: cat.name }))
          : [];
    
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set empty array to prevent `map` error
      }
    };
    

    const fetchAssignments = async () => {
      try {
        const response = await axiosInstance.get("/assignments", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
    
        //console.log("Assignments API Response:", response.data); // Debugging
    
        const formattedAssignments = Array.isArray(response.data)
          ? response.data.map(operator => ({
              operator: operator.name,
              categories: Array.isArray(operator.categories)
                ? operator.categories.map(cat => cat.name)
                : [],
            }))
          : [];
    
        setAssignedReviews(formattedAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignedReviews([]); // Set empty array to prevent `map` error
      }
    };
    

    fetchOperators();
    fetchCategories();
    fetchAssignments(); // Fetch previous assignments on load
  }, [authToken]);

 
  const handleAssignMatch = async () => {
    if (!selectedOperator || selectedCategories.length === 0) return;
  
    const assignments = selectedCategories.map(category => ({
      operator_id: selectedOperator.value,
      category_id: category.value,
      match_id: matchId,
    }));
  
    try {
      await axiosInstance.post("/assignments", { assignments }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      setAssignedReviews(prevReviews => {
        // Find if operator already exists
        const operatorIndex = prevReviews.findIndex(review => review.operator === selectedOperator.label);
  
        if (operatorIndex !== -1) {
          // Operator exists: Merge new categories (avoid duplicates)
          const updatedReviews = [...prevReviews];
          updatedReviews[operatorIndex].categories = [
            ...new Set([...updatedReviews[operatorIndex].categories, ...selectedCategories.map(cat => cat.label)])
          ];
          return updatedReviews;
        } else {
          // Operator does not exist: Add as a new entry
          return [
            ...prevReviews,
            {
              operator: selectedOperator.label,
              categories: selectedCategories.map(cat => cat.label), // Always an array
            }
          ];
        }
      });
  
      // Reset selections
      setSelectedOperator(null);
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error assigning match:", error);
    }
  };
  

  return (
    <>
    <Header />
    <div className="matchAssignment">
      <div className="matchAssignment-container">
        <Sidebar />
        <div className="matchAssignment-main-content">
          <div className="match-container">
            <div className="dropdown-container">
              {/* Operator Selection */}
              <div className="dropdown">
                <label>Operator</label>
                <Select
                  options={operators}
                  value={selectedOperator}
                  onChange={setSelectedOperator}
                  placeholder="Select Operator"
                  isClearable
                />
              </div>

              {/* Multi-Select Category Selection */}
              <div className="dropdown">
                <label>Category</label>
                <Select
                  options={categories}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  isMulti
                  placeholder="Select Categories"
                  isClearable
                />
              </div>
            </div>

            {/* Assigned Review Display */}
            <div className="assigned-review">
              <h3>Assigned Reviews</h3>
             
              {assignedReviews.length > 0 ? (
                assignedReviews.map((review, index) => (
                  <div key={index}>
                    <strong>{review.operator}:</strong>
                    <ul>
                      {Array.isArray(review.categories) ? (
                        review.categories.map((category, idx) => (
                          <li key={idx}>{category}</li>
                        ))
                      ) : (
                        <li>No categories assigned</li> // Fallback if categories is undefined
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No previous assignments</p>
              )}
            </div>

            {/* Assign Match Button */}
            <button className="assign-btn" onClick={handleAssignMatch}>
              Assign Match <span className="lock-icon">🔓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default MatchAssignment;
