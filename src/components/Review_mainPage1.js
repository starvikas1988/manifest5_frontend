import React,{useState} from "react";
import "../styles/Review_mainPage.css";
import img1 from "../images/dashboard_main/Frame 1431.png";
import img2 from "../images/dashboard_main/Frame 1706.png";
import img3 from "../images/dashboard_main/Group 1515.png";
import Matchtable from "./Matchtable";
import { BsCursor } from "react-icons/bs";

function Review_mainPage({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [marketCounts, setMarketCounts] = useState({});

  const updateMarketCount = (categoryId, count) => {
    setMarketCounts((prevCounts) => ({
      ...prevCounts,
      [categoryId]: count,
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  console.log("Categories:", categories);
  return (
    <>
    <div class="row3">
      <div class="info-container1">
        {/* <!-- First Column --> */}
        <div
          class="country-container"
          style={{ display: "flex", gap: "10px", width: "65%" }}
        >
          <div class="grid-row1">
            <div class="category-box1">CAT NAME</div>
            <div class="category-box1">ADD NAME</div>
          </div>
          <div
            className="boxes"
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="selection-box1">
                  <div className="left">
                    <button className="checkmark">✔</button>
                    <span className="amount">{category.market_count}</span>
                  </div>
                  <span className="cup" style={{ cursor: 'pointer' }} onClick={() => handleCategoryClick(category)}>{category.name || "N/A"} </span> 
                  {/* If name is not available, show 'N/A' */}
                  <div className="right">
                    <button className="plus">+</button>
                    <span className="amount">{marketCounts[category.id] || 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}

          </div>
        </div>

        {/* <!-- Second Column --> */}

        <div class="select-all">
          <div style={{ textAlign: "center" }}>Select All ({categories.length})</div>
          <div class="checkbox">
            <input type="checkbox" style={{ width: "125%" }} />
          </div>
        </div>
        {/* <!-- Third Column - Controls --> */}
        <div class="controls-container">
          <div class="dropdown-input">
            <img src={img2} alt="arrow-down" />
            <input type="text" />
          </div>
          <div className="ticket-div">
            {" "}
            <button class="raise-ticket">Raise Ticket</button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="match-form"
      style={{ display: "flex", flexWrap: "wrap", width: "95%" }}
    >
      {/* {selectedCategory && <Matchtable category={selectedCategory} />} */}

      {categories.map((category) => (
        <Matchtable
          key={category.id}
          category={category}
          updateMarketCount={updateMarketCount} // ✅ Pass function to update count
        />
      ))}
     
    </div>
    <div className='reassign-div'><button>ASSIGN ALL</button><div className='img3'><img src={img3}/></div></div>
    
    </>
    
    
  );
}

export default Review_mainPage;
