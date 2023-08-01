import React from "react";
import {Routes, Route} from 'react-router-dom';
import './Resources_Link.css'

const Resources_Link = () => {
    return (

        <div className='resources_banner_container'>
                <div id= "resources"> 
                    <h1>Resources</h1>
                    <div>
                        <h2>Where can I aquire tools... </h2>
                            <div id='resource_links'>
                                <p>Open Source Sat Tracking Tools:</p>
                                {/* <p>Links - </p> */}
                                <p><a href='https://home.hiwaay.net/~wintrak/' target='_blank' rel='noopener noreferrer'>WinTrak</a></p>
                                <p><a href='https://celestrak.org/software/tskelso-sw.php' target='_blank' rel='noopener noreferrer'>T.S. Kelso Suite</a></p>
                                <p><a href='https://home.hiwaay.net/~wintrak/' target='_blank' rel='noopener noreferrer'>TrakSat</a></p>
                                <p><a href='https://tracker.sumusltd.com/' target='_blank' rel='noopener noreferrer'>STL Tracker</a></p>
                                <p><a href='https://www.ansys.com/products/missions/ansys-stk' target='_blank' rel='noopener noreferrer'>STK</a></p>
                                <p>Open Source Sat Data Websites:</p>
                                {/* <p>Links - </p> */}
                                <p><a href='https://www.space-track.org/' target='_blank' rel='noopener noreferrer'>Space-Track</a></p>
                                <p><a href='https://celestrak.org/' target='_blank' rel='noopener noreferrer'>Celestrak</a></p>
                                <p><a href='https://www.nasa.gov/' target='_blank' rel='noopener noreferrer'>NASA</a></p>
                                <p><a href='https://www.amsat.org/' target='_blank' rel='noopener noreferrer'>AMSat</a></p>
                                <p>Open Source Astronomy Sites:</p>
                                {/* <p>Links - </p> */}
                                <p><a href='https://astronomy.starrynight.com/' target='_blank' rel='noopener noreferrer'>Starry Night</a></p>
                                <p><a href='http://f6dqm.free.fr/soft/satex/en/satexplorer.htm' target='_blank' rel='noopener noreferrer'>SAT Explorer</a></p>
                            </div>
                    </div>
                </div>
        </div>

    )
}

export default Resources_Link; 