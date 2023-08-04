import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import './FAQ_Full.css'


const FAQ_Full  = () => {

        const Resources = () => {
            return (

                <div className='resources_banner_container'>
                        <div id= "resources">
                            <h1 id='faq_h1'>
                                <Link to='/resources_link'>Resources</Link>
                            </h1>
                            <div>
                                <h2>Where can I aquire tools... </h2>
                                    <div id='resource_links'>
                                        <p id='p_title'>Open Source Sat Tracking Tools:</p>
                                        {/* <p>Links - </p> */}
                                        <p><a href='https://home.hiwaay.net/~wintrak/' target='_blank' rel='noopener noreferrer'>WinTrak</a></p>
                                        <p><a href='https://celestrak.org/software/tskelso-sw.php' target='_blank' rel='noopener noreferrer'>T.S. Kelso Suite</a></p>
                                        <p><a href='https://home.hiwaay.net/~wintrak/' target='_blank' rel='noopener noreferrer'>TrakSat</a></p>
                                        <p><a href='https://tracker.sumusltd.com/' target='_blank' rel='noopener noreferrer'>STL Tracker</a></p>
                                        <p><a href='https://www.ansys.com/products/missions/ansys-stk' target='_blank' rel='noopener noreferrer'>STK</a></p>
                                        <p id='p_title'>Open Source Sat Data Websites:</p>
                                        {/* <p>Links - </p> */}
                                        <p><a href='https://www.space-track.org/' target='_blank' rel='noopener noreferrer'>Space-Track</a></p>
                                        <p><a href='https://celestrak.org/' target='_blank' rel='noopener noreferrer'>Celestrak</a></p>
                                        <p><a href='https://www.nasa.gov/' target='_blank' rel='noopener noreferrer'>NASA</a></p>
                                        <p><a href='https://www.amsat.org/' target='_blank' rel='noopener noreferrer'>AMSat</a></p>
                                        <p id='p_title'>Open Source Astronomy Sites:</p>
                                        {/* <p>Links - </p> */}
                                        <p><a href='https://astronomy.starrynight.com/' target='_blank' rel='noopener noreferrer'>Starry Night</a></p>
                                        <p><a href='http://f6dqm.free.fr/soft/satex/en/satexplorer.htm' target='_blank' rel='noopener noreferrer'>SAT Explorer</a></p>
                                    </div>
                            </div>
                        </div>
                </div>

            )
        }
        const Learn = () => {
            return (
                <div className='learn_banner_container'>
                    <div id= "learn"> 
                        <h1 id='faq_h1'>
                            <Link to='/learn_link'>Learn</Link>
                        </h1>
                        <div>
                            <h2>How can I learn more... </h2>
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
                                
                        </div>
                    </div>
                </div>
            )
        }

    return (
        <div className='FAQ_Full_body_container'>
            <Resources />
            <Learn />
        </div>
    )
}


export default FAQ_Full;

//Old Data
// const FAQ = () => {
//     return (
//         <div className='faq_banner_container'>
//             <div id= "faq"> 
//                 <h1>
//                     <Link to='/faq_link'>FAQ</Link>
//                 </h1>
//                 <div>
//                     <h2>How do I... </h2>
//                         <div id='faq_links'>
//                                 <p>1. How do you read a two-line elset? </p>
//                                 <p>1. How does one convert two-line elements to some other format? </p>
//                                 <p>2. What is the accuracy of predictions using the two-line element sets?</p>
//                                 <p>3. How often are element sets generated?</p>
//                                 <p>4. What is the reference frame of the resulting coordinates?</p>
//                                 <p>5. Are there two-line element sets for the moon and/or sun?</p>
//                                 <p>6. How do new satellite elements get added to the CelesTrak WWW?</p>
//                                 <p>7. How does one find source code for the SGP4/SDP4 orbital models?</p>
//                                 <p>8. Where does one find a list of satellite frequencies?</p>
//                         </div>
//                 </div>
//             </div>
//         </div>
//     )
// }