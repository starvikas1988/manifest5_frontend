import React,{useState,useEffect} from 'react'
import "../styles/NamingHeader.css";
import female from '../images/female1.png'
import group2632 from '../images/Group 2632.png'
// import B from '../images/B.png'
// import h from '../images/H.png'

import ellips from '../images/Ellipse 458.png'
import vs from '../images/11111 2.png'
import { Button } from 'bootstrap'
function NamingHeader({ matchById,totalMarkets, selectedMarkets,isVerified, setIsVerified }) {
    const [timeString, setTimeString] = useState(null);
    const [hh, setHH] = useState(); // Initialize as an empty array
    const [mm, setMM] = useState();
    const [ss, setSS] = useState();
 

   
    useEffect(() => {
        if (matchById?.m5MatchStartTimeLocal) {
          const newTimeString = matchById.m5MatchStartTimeLocal.replace(/"/g, '');
          setTimeString(newTimeString);
        }
      }, [matchById]);
      
  
    useEffect(() => {
      if (timeString) {
        const [newHH, newMM, newSS] = timeString.split(":");
        setHH(newHH);
        setMM(newMM);
        setSS(newSS);
      }
    }, [timeString]); // Re-run effect when timeString changes

    const handleVerifySubmit = () => {
        if (selectedMarkets > 0) {
          setIsVerified(true); // ✅ Set verification to true if markets are selected
        } else {
          alert("Select at least one market before verifying!"); // Show alert if nothing is selected
        }
      };

  
      
    return (
        <div className='namingHeader'>
            <div className='domesticWomenName'>
                <div>{matchById?.m5SeriesType} {matchById.m5GenderName.replace(/"/g, '')}</div>
                <div><img src={female} /></div>
                <div>Match {matchById.m5MatchNo.replace(/"/g, '')}</div>
                <div>Group A</div>
            </div>
            <div className='LeaugeName-container'>
                <div className='leaugeName'>
                    <div className='leaugeName-header'>
                        <div><p className='bpl'>{matchById.m5SeriesName.replace(/"/g, '')}</p></div>
                        <div className='stadium'><div className='stadium-name'>{matchById.m5GroundName.replace(/"/g, '')} </div><div className='playing-date'> 26-JAN-2025</div></div>
                    </div>
                    <div className='leaugeTime'>
                        <div><img src={group2632} alt='group' /></div>
                        <div className='time1'>
                            <div>{matchById.m5MatchStartTimeGMT}(GMT)</div>
                            <div>{matchById.m5MatchStartTimeLocal}(GROUND)</div>
                            <div>{matchById.m5MatchStartTimeLocal}(LOCAL)</div>
                        </div>
                    </div>
                </div>
                <div className='team-Name'>
                    <div className='team' style={{flexDirection:"row",gap: "63px",marginLeft: "21px"}}>
                        <div className='team1'>

                            <div className='b'><img src={matchById.m5TeamALogo.replace(/"/g, '')} alt='b'/></div>
                            <div className='NB-w'>{matchById.m5TeamAShortName.replace(/"/g, '')}</div>
                        </div>
                        <div className='vs'><img src={vs}/></div>
                        <div className='team2'>
                            <div className='CH-w'>{matchById.m5TeamBShortName.replace(/"/g, '')}</div>
                            <div className='h'><img src={matchById.m5TeamBLogo.replace(/"/g, '')} alt='h'/></div>
                        </div>
                    </div>
                    <div className='time'>
                        <div className='hour'>
                            <div className='TIME-NAME'>HH</div>
                            <div className='TIME-NUMBER'>{hh}</div>
                        </div>
                        : 
                        <div className='minute'>
                            <div className='TIME-NAME'>MM</div>
                            <div className='TIME-NUMBER'>{mm}</div>
                        </div>
                        :
                         <div className='second'>
                            <div className='TIME-NAME'>SS</div>
                            <div className='TIME-NUMBER'>{ss}</div>
                         </div>
                    </div>
                </div>
            </div>
            <div className="flag-container">
                <div className='flagimg'><img src={ellips} alt='ellips' /></div>
                <div className='t20'>{matchById.m5MatchFormat}</div>
            </div>
            <div className='market'>
                <div className='market-name'>MARKET</div>
                <div className='total'>
                    <div className='total-name'>TOTAL</div>
                    <div className='total-number'>{totalMarkets}</div>
                </div>
                <div className='selected'>
                <div className='selected-name'>SELECTED</div>
                <div className='selected-number'>{selectedMarkets}</div>
                </div>
                <button className='submit-verify' onClick={handleVerifySubmit}>VERIFY & SUBMIT</button>
            </div>
        </div>
    )
}

export default NamingHeader