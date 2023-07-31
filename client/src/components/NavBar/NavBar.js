import React, {useContext, useEffect} from 'react'
import './NavBar.css'
import {Link, useNavigate} from 'react-router-dom'
import { TokenContext } from '../../App.js'
import Space_Monkey from '../../images/Space_Monkey_No_Background.svg';
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
    const {token, setToken, userLoggedIn, setUserLoggedIn} = useContext(TokenContext);
    const navigate = useNavigate()
    useEffect(()=>{
        
    }, [token, setUserLoggedIn])

    return (
        <div id='navbarContainer'>
            <div>
                {userLoggedIn ? <button className='navButton' onClick={async ()=>{
                    await setToken([])
                    await setUserLoggedIn(false)
                    navigate('/login')
                }}>Logout</button> : <button className='navButton' onClick={()=>{
                    navigate('/login')
                }}>Login</button>}
                {userLoggedIn ? <>|<button className='navButton' onClick={()=>{
                    navigate(`/homepage/${token.DoD_id}`)
                }}>Homepage</button>|<button className='navButton' onClick={()=>{
                    navigate('/addsat')
                }}>Add Satellite</button>{token.moderator ? <>|<button className='navButton' onClick={()=>{
                    navigate(`/moderator/${token.DoD_id}`)
                }}>Moderator</button></> : <></>}|<button className='navButton' onClick={()=>{
                    navigate('/faq')
                }}>FAQ</button>|<img data-tooltip-id="tletip" data-tooltip-content="TLE Data Tool" className='monkey hover-effect' src={ Space_Monkey } alt="monkey" height={60} onClick={()=>{
                    navigate('/TLE')
                }}/></> : <></>}
            </div>
            {/* <div className='monkey_container'>
                <Link to="/TLE">
                    <img data-tooltip-id="tletip" data-tooltip-content="TLE Data Tool" className='monkey hover-effect' src={ Space_Monkey } alt="monkey" height={60}/>
                </Link>
            </div> */}

            {userLoggedIn && token.length > 0 ? <span id='username'>Welcome, {token.username.toUpperCase()}!</span> : <></>}
            <Link id="appTitle" to= {`/homepage/${token.DoD_id}`} style={{ textDecoration: 'none' }}>One Track Satellite</Link>
            <Tooltip
                id="tletip"
                place="bottom"
                content="TLE Data Tool"
            />
        </div>
    )
}

export default Navbar