import React from 'react'
import "../styles/NamingHeader.css";
import female from '../images/female1.png'
import group2632 from '../images/Group 2632.png'
import B from '../images/B.png'
import h from '../images/H.png'
import ellips from '../images/Ellipse 458.png'
import vs from '../images/11111 2.png'
import { Button } from 'bootstrap'
function NamingHeader() {
    return (
        <div className='namingHeader'>
            <div className='domesticWomenName'>
                <div>Domestic Women</div>
                <div><img src={female} /></div>
                <div>Match 33</div>
                <div>Group A</div>
            </div>
            <div className='LeaugeName-container'>
                <div className='leaugeName'>
                    <div className='leaugeName-header'>
                        <div><p className='bpl'>BANGLADESH PREMIER LEAGUE</p></div>
                        <div className='stadium'><div className='stadium-name'>SHERE BANGLA NATIONAL STADIUM </div><div className='playing-date'> 26-JAN-2025</div></div>
                    </div>
                    <div className='leaugeTime'>
                        <div><img src={group2632} alt='group' /></div>
                        <div className='time1'>
                            <div>12:30(GMT)</div>
                            <div>13:30(GROUND)</div>
                            <div>12:30(LOCAL)</div>
                        </div>
                    </div>
                </div>
                <div className='team-Name'>
                    <div className='team' style={{flexDirection:"row",gap: "63px",marginLeft: "21px"}}>
                        <div className='team1'>

                            <div className='b'><img src={B} alt='b'/></div>
                            <div className='NB-w'>NB-W</div>
                        </div>
                        <div className='vs'><img src={vs}/></div>
                        <div className='team2'>
                            <div className='CH-w'>CH-W</div>
                            <div className='h'><img src={h} alt='h'/></div>
                        </div>
                    </div>
                    <div className='time'>
                        <div className='hour'>
                            <div className='TIME-NAME'>HH</div>
                            <div className='TIME-NUMBER'>18</div>
                        </div>
                        : 
                        <div className='minute'>
                            <div className='TIME-NAME'>MM</div>
                            <div className='TIME-NUMBER'>15</div>
                        </div>
                        :
                         <div className='second'>
                            <div className='TIME-NAME'>SS</div>
                            <div className='TIME-NUMBER'>49</div>
                         </div>
                    </div>
                </div>
            </div>
            <div className="flag-container">
                <div className='flagimg'><img src={ellips} alt='ellips' /></div>
                <div className='t20'>T20</div>
            </div>
            <div className='market'>
                <div className='market-name'>MARKET</div>
                <div className='total'>
                    <div className='total-name'>TOTAL</div>
                    <div className='total-number'>200</div>
                </div>
                <div className='selected'>
                <div className='selected-name'>SELECTED</div>
                <div className='selected-number'>100</div>
                </div>
                <button className='submit-verify'>VERIFY & SUBMIT</button>
            </div>
        </div>
    )
}

export default NamingHeader