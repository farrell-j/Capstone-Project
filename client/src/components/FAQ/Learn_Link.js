import React from "react";
import {Routes, Route} from 'react-router-dom';
import './Learn_Link.css'

const Learn_Link = () => {
    return (
        <div className='learn_banner_container'>
            <div id= "learn"> 
                <h1>Learn</h1>
                <div>
                    <h2>How can I learn more... </h2>
                        <div id='learn_links'>
                                <p>How does one convert two-line elements to some other format?: </p>
                                <p>What is the accuracy of predictions using the two-line element sets?</p>
                                <p>How often are element sets generated?</p>
                                <p>What is the reference frame of the resulting coordinates?</p>
                                <p>Are there two-line element sets for the moon and/or sun?</p>
                                <p>How do new satellite elements get added to the CelesTrak WWW?</p>
                                <p>How does one find source code for the SGP4/SDP4 orbital models?</p>
                                <p>Where does one find a list of satellite frequencies?</p>
                                <p>Sources: 'https://celestrak.org/columns/v04n05/#FAQ06' </p>
                        </div>
                        
                </div>
            </div>
        </div>
    )
}

export default Learn_Link;