import React from 'react'
import '../styles/ReviewPageCard.css'
import img1 from '../images/imgReview/arrow_down.png'
import img2 from '../images/imgReview/B (1).png'
import img3 from '../images/imgReview/H (1).png'
function ReviewPageCard({color}) {
  return (
    // but Touch<!-- Admin  Section (Now Outside the Box ing the Top Line)"#9F41A4" -->
    <div className='match-card'>
        <div className='first_part'>
    <div class="admin-review-section" style={{backgroundColor: color}}>
      <span style={{color: "white"}}>ADMIN (50)</span>
      <img src={img1} alt="Down Arrow"/>
    </div>
    
    <div className="box-review" style={{marginTop: "0px"}}>
    {/* <!-- First Row --> */}
    <div className="first-row-review">
      {/* <!-- First Box (Divided into 2 parts) --> */}
      <div className="small-box-review">
        <div className="top-part" style={{backgroundColor: color}}>
          <span>ADMIN</span>
        </div>
        <div className="bottom-part">
          <span>AMAN CHOUHAN</span>
        </div>
      </div>
  
      {/* <!-- Second Box --> */}
      <div className="small-box-review">
        <span>Jan 26, Tue</span>
        <span>2025</span>
      </div>
  
      {/* <!-- Bangladesh Premier League Section --> */}
      <div className="league-section-review">
        <h2 style={{color: "#00AC4F"}}>BANGLADESH PREMIER LEAGUE</h2>
  
      </div>
      <div className="league-section-review time-place">
  
        <p style={{color: "#00546C"}}>Match: 33, Men, T20, Domestic</p>
        <p style={{color: "#00546C"}}>Share Bangla National Stadium</p>
      </div>
  
      {/* <!-- Team Logos and Names --> */}
      <div className="team-section">
        <img src={img2} alt="Team 1 Logo"/>
        <span className='nbw'>NB W</span>
        <span>CH W</span>
        <img src={img3} alt="Team 2 Logo"/>
      </div>
  
      {/* <!-- End Box (Divided into 2 parts) --> */}
      <div className="end-box-review">
        <div className="top-part" style={{background: "#017781"}}>
          <span style={{color: "white"}}>13:30 AM (L)/11:30 PM (D)</span>
        </div>
        <div className="bottom-part" style={{background: "#FFFF98"}}>
          <span style={{color: "#00546C"}}>Starting in 18th-15th-49s</span>
        </div>
      </div>
    </div>
  </div>
  </div>


  {/* downPart */}


  <div className='secondPart'>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
    <div className='subdiv'>
        <div className='subdiv1'><div className='subdiv1_text'>BATSMAN</div></div>
        <div className='subdiv2'> <div className='subdiv2_num'>20</div></div>
    </div>
  </div>
  </div>
  
  )
}

export default ReviewPageCard
