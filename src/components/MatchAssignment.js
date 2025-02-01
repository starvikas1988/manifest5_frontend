import React, { useState, useEffect } from "react";
import Select from "react-select";
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
        setCategories(
          Array.isArray(response.data.data)
            ? response.data.data.map(cat => ({ value: cat.id, label: cat.name }))
            : []
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchAssignments = async () => {
      try {
        const response = await axiosInstance.get("/assignments", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const formattedAssignments = response.data.map(operator => ({
          operator: operator.name,
          categories: operator.categories.map(cat => cat.name),
        }));
        setAssignedReviews(formattedAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchOperators();
    fetchCategories();
    fetchAssignments(); // Fetch previous assignments on load
  }, [authToken]);

  // Assign match API call
  const handleAssignMatch = async () => {
    if (!selectedOperator || selectedCategories.length === 0) return;

    const assignments = selectedCategories.map(category => ({
      operator_id: selectedOperator.value,
      category_id: category.value,
    }));

    try {
      await axiosInstance.post("/assignments", { assignments }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const newAssignedReviews = assignments.map(a => ({
        operator: selectedOperator.label,
        category: categories.find(cat => cat.value === a.category_id)?.label || "Unknown",
      }));

      // Update assigned reviews state
      const updatedAssignedReviews = [...assignedReviews, ...newAssignedReviews];
      setAssignedReviews(updatedAssignedReviews);

      // Reset selected operator and categories
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
        <div className="main-content">
          <div className="container">
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
                      {review.categories.map((category, idx) => (
                        <li key={idx}>{category}</li>
                      ))}
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
