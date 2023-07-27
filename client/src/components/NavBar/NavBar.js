import React, {useContext, useEffect} from 'react'
import './NavBar.css'
import {Link, useNavigate} from 'react-router-dom'
import { TokenContext } from '../../App.js'

const Navbar = () => {
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);
    const navigate = useNavigate()
    useEffect(()=>{
        
    }, [token, setUserIn])

    return (
        <div id='navbarContainer'>
            <div>
                {userIn ? <button className='navButton' onClick={async ()=>{
                    await setToken([])
                    await setUserIn(false)
                    navigate('/login')
                }}>Logout</button> : <button className='navButton' onClick={()=>{
                    navigate('/login')
                }}>Login</button>}
                {userIn ? <>|<button className='navButton' onClick={()=>{
                    navigate(`/userinventory/${token.user_id}`)
                }}>My Inventory</button>|<button className='navButton' onClick={()=>{
                    navigate('/inventory')
                }}>View All Inventory</button>|<button className='navButton' onClick={()=>{
                    navigate('/newitem')
                }}>Add New Item</button></> : <></>}
            </div>
            {userIn && token.length > 0 ? <span id='username'>Welcome, {token.username.toUpperCase()}!</span> : <></>}
            <Link id="appTitle" to= {`/homepage/${token.DoD_id}`} style={{ textDecoration: 'none' }}>One Track Satellite</Link>
        </div>
    )
}

export default Navbar