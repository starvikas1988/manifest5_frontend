import React from 'react'
import '../styles/ReviewMainPageTable1.css'
import img1 from '../images/imgReview/preview.png'
function ReviewMainPageTable1() {
  return (
    <div class='table-1'>
  <div class="inside-table">
    <div class="table-contain">SELECT CAT</div>
    <div class="align-contain">
      <input type="checkbox"/>
    </div>
  </div>
  <div class="inside-table2">
    <div class="table-contain2">CAT</div>
    <div class="align-contain">BATSMAN</div>
  </div>
  <div class="inside-table3">
    <div class="table-contain3">SELECT</div>
    <div className='checkbox'>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    <div>
      <input type="checkbox"/>
    </div>
    </div>
  <div class="inside-table4">
    <div class="table-contain4">MARKET</div>
      <div class="bttn">1st OVER RUN</div>
      <div class="bttn">2nt OVER RUN</div>
      <div class="bttn">3rd OVER RUN</div>
      <div class="bttn">4th OVER RUN</div>
      <div class="bttn">5th OVER RUN</div>
      <div class="bttn">6th OVER RUN</div>
      <div class="bttn">7th OVER RUN</div>
      <div class="bttn">8th OVER RUN</div>
  </div>
  <div class="inside-table5">
    <div class="table-contain5">
      <div className='m5odds'>M5 ODDS</div>
      <div class="back-lay">      
        <div class="back">BACK</div>
        <div class="lay">LAY</div>
      </div>
    </div>
    <div class="values">
      <div class="value-box"></div>
      <div class="value-box1"></div>
  </div>
  </div>
  <div class="inside-table6">
    <div class="table-contain6">D ODDS AVG
      <div class="back-lay">      
        <div class="back">BACK</div>
        <div class="lay">LAY</div>
      </div>
    </div>
    <div class="values">
      <div class="value-box"></div>
      <div class="value-box1"></div>
    </div>
  </div>
  <div class="inside-table7">
    <div class="table-contain7">OPT ODDS
      <div class="back-lay">      
        <div class="back">BACK</div>
        <div class="lay">LAY</div>
      </div>
    </div>
    <div class="values">
      <div class="value-box">
        <div class="value-box2"><div class="value-5">8</div></div>
        <div class="value-box2"><div class="value-5">6</div></div>
        {/* <div class="value-box2"><div class="value-5">5</div></div>
        <div class="value-box2"><div class="value-5">6</div></div>
        <div class="value-box2"><div class="value-5">4</div></div>
        <div class="value-box2"><div class="value-5">5</div></div>
        <div class="value-box2"><div class="value-5">5</div></div>
        <div class="value-box2"><div class="value-5">5</div></div> */}
      </div>
      <div class="value-box1">
        {/* <div class="value-box2"><div class="value-6">9</div></div>
        <div class="value-box2"><div class="value-6">6</div></div>
        <div class="value-box2"><div class="value-6">5</div></div>
        <div class="value-box2"><div class="value-6">6</div></div>
        <div class="value-box2"><div class="value-6">4</div></div>
        <div class="value-box2"><div class="value-6">5</div></div>
        <div class="value-box2"><div class="value-6">5</div></div>
        <div class="value-box2"><div class="value-6">5</div></div> */}
      </div>
    </div>
  </div>
  <div class="inside-table8">
    <div class="table-contain8">
      <div class="rate">RATE</div>
      <div class="back-lay">      
        <div class="back">BACK</div>
        <div class="lay">LAY</div>
      </div>
    </div>
    <div class="values">
      <div class="value-box"></div>
      <div class="value-box1"></div>
    </div>
  </div>
  <div class="inside-table9">
    <div class="table9_containt">
    <div class="table-contain9">
      <div class="min">MIN</div>
      <div class="back">BACK</div>
    </div>
    <div class="table-contain9">
      <div class="max">MAX</div>
      <div class="lay">LAY</div>
    </div>
  </div>
    <div class="number-div">
      <div class="coloum1_number"></div>
      <div class="coloum2_number"></div>
    </div>
  
  </div>
  
  <div class="inside-table10">
    <div class="table-contain10">FINAL MARKET</div>
      <div class="bttn">1st OVER RUN</div>
      <div class="bttn">2nt OVER RUN</div>
      <div class="bttn">3rd OVER RUN</div>
      <div class="bttn">4th OVER RUN</div>
      <div class="bttn">5th OVER RUN</div>
      <div class="bttn">6th OVER RUN</div>
      <div class="bttn">7th OVER RUN</div>
      <div class="bttn">8th OVER RUN</div>
  </div>
  <div class="inside-table11">
    <div class="table-contain11">USER DISPLAY
        <div>
          <img src={img1} alt="preview"/>
        </div>
    </div>
    <div class="values3">
      <div class="value-box3">45<br/><small>100</small></div>
      <div class="value-box3">45<br/><small>100</small></div>
      <div class="value-box3 minmax3">Min: 100<br/>Max: 50K</div>
    </div>
  </div>
  <div class="inside-table12">
    <div class="table-contain12">SUBMIT</div>
    <div class="align-contain12">
      <input type="checkbox"/>
    </div>
  </div>
  
  
  
</div>

  )
}

export default ReviewMainPageTable1
