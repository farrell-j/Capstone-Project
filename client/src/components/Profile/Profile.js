import React , { useState, useContext, useEffect } from 'react';
import monkey_no_background_img from '../../images/Space_Monkey_No_Background.svg';
import Navbar from './navbar';
import './profile.css'
import { TokenContext } from "../../App"
import { useNavigate, useParams } from 'react-router-dom';

export const Profile = () => {
    const [editmode, setEditmode] = useState(false)
    const { token, setToken, userLoggedIn } = useContext(TokenContext);
    const [userposts, setUserposts] = useState([])
    const navigate = useNavigate()
    const {userid} = useParams()
    const [displayUser, setDisplayUser] = useState({})

    useEffect(() => {
        if (userLoggedIn) {
            fetch(`http://localhost:8080/user/${userid}`, {
                headers: {
                    'Authorization': `bearer ${token.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setDisplayUser(data[0])
                })
                .then(data => {
                    fetch(`http://localhost:8080/posts`)
                        .then(res => res.json())
                        .then(data => {
                            setUserposts(data.filter(post => post.post_author === userid))
                        })
                })
        } else {
            navigate('/login')
        }
    }, [userid])

    function truncate(str){
        return (str.length > 100) ? str.slice(0, 100-1) + `...` : str;
    };

    if (displayUser.DoD_id === userid) {
        if(editmode) {
            return (
                <>
                    <div className='profile'>
                        <header img src= { monkey_no_background_img }></header>
                        <div className='contactinfo'>
                            <h1>Contact Info:</h1>
                            <p>First Name: <input id="fname" type="text" defaultValue={`${displayUser.firstname}`}/></p>
                            <p>Last Name: <input id="lname" type="text" defaultValue={`${displayUser.lastname}`}/></p>
                            <p>Email: <input id="email" type="email" defaultValue={`${displayUser.email}`}/></p>
                            <p>Organization: <input id="oname" type="text" defaultValue={`${displayUser.organization}`}/></p>
                            {token.moderator ? <span>MODERATOR!</span> : null}
                            <button id='button31' onClick={()=>{
                                const init = {
                                    method: 'PATCH',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                    "firstname": document.getElementById('fname').value,
                                    "lastname": document.getElementById('lname').value,
                                    "email": document.getElementById('email').value,
                                    "organization": document.getElementById('oname').value,
                                })
                                };
                                fetch(`http://localhost:8080/user/${token.DoD_id}`, init)
                                    .then(res => {
                                        if(res.status === 200) {
                                            displayUser.firstname = document.getElementById('fname').value;
                                            displayUser.lastname = document.getElementById('lname').value;
                                            displayUser.email = document.getElementById('email').value;
                                            displayUser.organization = document.getElementById('oname').value;
                                            setToken(displayUser);
                                            setEditmode(false);
                                        }
                                    })
                            }}><strong>Save Contact Information</strong></button>
                        </div>
                        <div id='userPosts'>
                            <h1>User Posts:</h1>
                                {userposts.map((post, index) => {
                                    return (
                                        <div key={index} className='userPost' onClick={() => {
                                            navigate(`/satellite/${post.SATCAT_id}`)
                                        }}>
                                            <p>SATCAT: {post.SATCAT_id}</p>
                                            <p>Post: {post.post_text.length > 100 ? truncate(post.post_text) : post.post_text}</p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='profile'>
                        <header img src= { monkey_no_background_img }></header>
                        <div className='contactinfo'>
                            <h1>Contact Info: <i onClick={()=>{navigate(`/homepage/${displayUser.DoD_id}`)}} style={{ marginLeft: '50rem' }} className="fa fa-home" class="fa fa-home"></i></h1>
                            <p>First Name: {displayUser.firstname}</p>
                            <p>Last Name: {displayUser.lastname}</p>
                            <p>Email: {displayUser.email}</p>
                            <p>Organization: {displayUser.organization}</p>
                            {displayUser.moderator ? <span>MODERATOR!</span> : null}
                            {displayUser.DoD_id === userid ? <button id='button31' onClick={()=>{
                                setEditmode(true)
                            }}><strong>Edit Contact Information</strong></button> : null}
                        </div>
                        <div id='userPosts'>
                            <h1>User Posts:</h1>
                                {userposts.map((post, index) => {
                                    return (
                                        <div key={index} className='userPost' onClick={() => {
                                            navigate(`/satellite/${post.SATCAT_id}`)
                                        }}>
                                            <p>SATCAT: {post.SATCAT_id}</p>
                                            <p>Post: {post.post_text.length > 100 ? truncate(post.post_text) : post.post_text}</p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </>
            )
        }
    } 
}

export default Profile
{/* <label htmlFor="Phone Number"> Phone Number</label>
<input type='text' value={ phoneNumber } onChange={(e) => setPhoneNumber(e.target.value)} id='Phone Number' placeholder='Phone Nuber' /> */}
{/* <h2> Hi I'm John Wick and i have worked space for 1000 years with the Klingons </h2>
<div className="prompt"> 
    <p> 
    Ive built spacecraft for my entire career and have intimate knowledge of all things Van Allen Radiation Belt
    </p>
</div> */}