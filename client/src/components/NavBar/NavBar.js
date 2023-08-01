import React, { useContext, useEffect } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App.js';
import Space_Monkey from '../../images/Space_Monkey_No_Background.svg';
import rocket_ship_log_out_img from '../../images/rocket_ship.svg';
import home_page_img from '../../images/home_page_img.svg';
import add_sat_img from '../../images/add_sat_img.svg';
import mod_img from '../../images/mod_img.svg';
import faq_img from '../../images/faq_img.svg';
import one_track_sat_img from '../../images/one_track_sat_img.svg';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  const { token, setToken, userLoggedIn, setUserLoggedIn } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
  }, [token, setUserLoggedIn]);

  //logout/handle tokens
  const handleLogout = async () => {
    await setToken([]);
    await setUserLoggedIn(false);
    navigate('/login'); 
    // Redirect login after logout
  };

  return (
    <div id='navbarContainer'>
      <div>
        {userLoggedIn ? (
          <>
            <img
            data-tooltip-id="tletip"
            data-tooltip-content="Logout"
              id='rocket'
              src={rocket_ship_log_out_img}
              alt="Logout"
              className='navButton hover-effect'
              onClick={handleLogout}
            />
              <Link to={`/homepage/${token.DoD_id}`} className='navButton hover-effect'>
                <img id='home' src={home_page_img} alt="Homepage" />
              </Link>
            
              <Link to="/addsat" className='navButton hover-effect'>
                <img id='add' src={add_sat_img} alt="Add Satellite" />
              </Link>
            {token.moderator ? (
            <>
                
              <Link to={`/moderator/${token.DoD_id}`} className='navButton hover-effect'>
                <img id='mod' src={mod_img} alt="Moderator" />
              </Link>

            </>

            ) : null}
            
              <Link to="/faq" className='navButton hover-effect'>
                <img id='faq_nav' src={faq_img} alt="FAQ" />
              </Link>
            
              <Link to="/TLE" className='navButton'>
                <img
                  data-tooltip-id="tletip"
                  data-tooltip-content="TLE Data Tool"
                  className='monkey hover-effect'
                  id='monkey'
                  src={Space_Monkey}
                  alt="TLE Data Tool"
                  height={60}
                />
              </Link>
          </>
        ) : (
          <>
            <button className='navButton hover-effect' onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
      </div>

      {userLoggedIn && token.length > 0 ? (
        <span id='username'>Welcome, {token.username.toUpperCase()}!</span>
      ) : null}

      <Link to={`/homepage/${token.DoD_id}`} style={{ textDecoration: 'none' }}>
        <img className='navButton hover-effect' id='one_track' src={one_track_sat_img} alt="one_track_sat_img" />
      </Link>

      <Tooltip id="tletip" place="bottom" content="TLE Data Tool" />
    </div>
  );
};

export default Navbar;







//OLD LOGIC FOR NAV BAR
// import React, {useContext, useEffect} from 'react'
// import './NavBar.css'
// import {Link, useNavigate} from 'react-router-dom'
// import { TokenContext } from '../../App.js'
// import Space_Monkey from '../../images/Space_Monkey_No_Background.svg';
// import { Tooltip } from 'react-tooltip'

// const Navbar = () => {
//     const {token, setToken, userLoggedIn, setUserLoggedIn} = useContext(TokenContext);
//     const navigate = useNavigate()
//     useEffect(()=>{
        
//     }, [token, setUserLoggedIn])

//     return (
//         <div id='navbarContainer'>
//             <div>
//                 {userLoggedIn ? <button className='navButton' onClick={async ()=>{
//                     await setToken([])
//                     await setUserLoggedIn(false)
//                     navigate('/login')
//                 }}>Logout</button> : <button className='navButton' onClick={()=>{
//                     navigate('/login')
//                 }}>Login</button>}
//                 {userLoggedIn ? <>|<button className='navButton' onClick={()=>{
//                     navigate(`/homepage/${token.DoD_id}`)
//                 }}>Homepage</button>|<button className='navButton' onClick={()=>{
//                     navigate('/addsat')
//                 }}>Add Satellite</button>{token.moderator ? <>|<button className='navButton' onClick={()=>{
//                     navigate(`/moderator/${token.DoD_id}`)
//                 }}>Moderator</button></> : <></>}|<button className='navButton' onClick={()=>{
//                     navigate('/faq')
//                 }}>FAQ</button>|<img data-tooltip-id="tletip" data-tooltip-content="TLE Data Tool" className='monkey hover-effect' src={ Space_Monkey } alt="monkey" height={60} onClick={()=>{
//                     navigate('/TLE')
//                 }}/></> : <></>}
//             </div>
//             {/* <div className='monkey_container'>
//                 <Link to="/TLE">
//                     <img data-tooltip-id="tletip" data-tooltip-content="TLE Data Tool" className='monkey hover-effect' src={ Space_Monkey } alt="monkey" height={60}/>
//                 </Link>
//             </div> */}

//             {userLoggedIn && token.length > 0 ? <span id='username'>Welcome, {token.username.toUpperCase()}!</span> : <></>}
//             <Link id="appTitle" to= {`/homepage/${token.DoD_id}`} style={{ textDecoration: 'none' }}>One Track Satellite</Link>
//             <Tooltip
//                 id="tletip"
//                 place="bottom"
//                 content="TLE Data Tool"
//             />
//         </div>
//     )
// }

// export default Navbar