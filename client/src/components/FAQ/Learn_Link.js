import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import './Learn_Link.css'
import rocket_ship_log_out_img from '../../images/rocket_ship.svg';
import { Tooltip } from 'react-tooltip';

const Learn_Link = () => {
    return (
        <div className='learn_banner_container'>
            <div id= "learn">
                <Link to="/faq" className='navButton hover-effect'>
                    <img
                        data-tooltip-id="tletip"
                        data-tooltip-content="Return" 
                        id='rocket_return' 
                        src={rocket_ship_log_out_img} 
                        alt="Return to Resources" 
                    />
                </Link>  
                <h1>
                    <Link to='/learn_link'>Learn: Home</Link>
                </h1>
                <div>
                    {/* <h2>How can I learn more... </h2> */}
                        <div id='learn_links'>
                        <p id='p_title'>Open Source Education Tools:</p>
                                {/* <p>Links - </p> */}
                                <p><a href='https://www.projectpluto.com/tle_info.htm' target='_blank' rel='noopener noreferrer'>How to read a Two-line Elset</a></p>
                                <p><a href='https://celestrak.org/columns/' target='_blank' rel='noopener noreferrer'>History: Satellite Times</a></p>
                                <p><a href='https://www.amsat.org/wordpress/wp-content/uploads/2023/06/For_Beginners_Compilation.pdf' target='_blank' rel='noopener noreferrer'>For Beginners: An Amateur Radio Satellite Primer</a></p>
                                <p><a href='https://www.nasa.gov/nasa-at-home-e-books' target='_blank' rel='noopener noreferrer'>NASA at Home: E-Books</a></p>
                                <p><a href='https://www.nasa.gov/nasa-at-home-for-kids-and-families' target='_blank' rel='noopener noreferrer'>NASA at Home: Kids and Families Education</a></p>
                                <p><a href='https://www.amsat.org/tools-for-calculating-spacecraft-communications-link-budgets-and-other-design-issues/' target='_blank' rel='noopener noreferrer'>Education: Tools for Spacecraft and Communication Design</a></p>
                        </div>
                        <Tooltip id="tletip" place="bottom" content="TLE Data Tool" />
                        
                </div>
            </div>
        </div>
    )
}

export default Learn_Link;