import React from "react";
import "../styles/ReviewMainPage.css";
import img1 from "../images/imgReview/Frame 1431.png";
import img2 from "../images/imgReview/Frame 1706.png";
function ReviewMainPage() {
  return (
    <div class="row2">
      <div class="info-container">
        {/* <!-- First Column --> */}
        <div class="country-container">
          <div class="grid-row">
            <div class="category-box">CAT NAME</div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>

                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>

                <span class="amount">100</span>
              </div>
            </div>

            {/* <!-- Repeat for 6 more boxes --> */}
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <div class="cup">CUP</div>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Second Column --> */}
        <div class="country-container">
          <div class="grid-row">
            <div class="category-box">ADD NAME</div>

            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
            <div class="selection-box">
              <div class="left">
                <button class="checkmark">✔</button>
                <span class="amount">100</span>
              </div>
              <span class="cup">CUP</span>
              <div class="right">
                <button class="plus">+</button>
                <span class="amount">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="select-all">
        <div>Select All (12)</div>
        <div class="checkbox">
          <img src={img1} alt="checkbox" />
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
  );
}

export default ReviewMainPage;
