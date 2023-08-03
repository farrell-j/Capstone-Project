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

    useEffect(() => {
        if (userLoggedIn) {
            fetch(`http://localhost:8080/posts`)
                .then(res => res.json())
                .then(data => {
                    setUserposts(data.filter(post => post.post_author === userid))
                })
        } else {
            navigate('/login')
        }
    }, [])

    function truncate(str){
        return (str.length > 100) ? str.slice(0, 100-1) + `...` : str;
    };

    if(editmode) {
        return (
            <>
                <div className='profile'>
                    <header img src= { monkey_no_background_img }></header>
                    <div className='contactinfo'>
                        <h1> Contact Info:</h1>
                        <p>First Name: <input id="fname" type="text" defaultValue={`${token.firstname}`}/></p>
                        <p>Last Name: <input id="lname" type="text" defaultValue={`${token.lastname}`}/></p>
                        <p>Email: <input id="email" type="email" defaultValue={`${token.email}`}/></p>
                        <p>Organization: <input id="oname" type="text" defaultValue={`${token.organization}`}/></p>
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
                                        token.firstname = document.getElementById('fname').value;
                                        token.lastname = document.getElementById('lname').value;
                                        token.email = document.getElementById('email').value;
                                        token.organization = document.getElementById('oname').value;
                                        setToken(token);
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
                        <h1> Contact Info:</h1>
                        <p>First Name: {token.firstname}</p>
                        <p>Last Name: {token.lastname}</p>
                        <p>Email: {token.email}</p>
                        <p>Organization: {token.organization}</p>
                        {token.moderator ? <span>MODERATOR!</span> : null}
                        {token.DoD_id === userid ? <button id='button31' onClick={()=>{
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

export default Profile
{/* <label htmlFor="Phone Number"> Phone Number</label>
<input type='text' value={ phoneNumber } onChange={(e) => setPhoneNumber(e.target.value)} id='Phone Number' placeholder='Phone Nuber' /> */}
{/* <h2> Hi I'm John Wick and i have worked space for 1000 years with the Klingons </h2>
<div className="prompt"> 
    <p> 
    Ive built spacecraft for my entire career and have intimate knowledge of all things Van Allen Radiation Belt
    </p>
</div> */}