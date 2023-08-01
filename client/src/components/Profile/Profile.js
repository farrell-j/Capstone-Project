import React , { useState } from 'react';
import monkey_no_background_img from '../../images/Space_Monkey_No_Background.svg';
import Navbar from './navbar';


export const Profile = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    return (
        <>
        <div className='profile'>
        <Navbar />
            <header img src= { monkey_no_background_img }></header>
            <div className='expertise'> </div>
                <h2> Hi I'm John Wick and i have worked space for 1000 years with the Klingons </h2>
                <div className="prompt"> 
                    <p> 
                    Ive built spacecraft for my entire career and have intimate knowledge of all things Van Allen Radiation Belt
                    </p>
                </div>
                <div className='contact info'>
                    <h1> here is my contact info</h1>
                    <label htmlFor="Name">Name</label>
                    <input type='text' value={ name } onChange={(e) => setName(e.target.value)} id="Name" placeholder="Name" />
                    <label htmlFor="Phone Number"> Phone Number</label>
                    <input type='text' value={ phoneNumber } onChange={(e) => setPhoneNumber(e.target.value)} id='Phone Number' placeholder='Phone Nuber' />
                    <label htmlFor='Email'>Email</label>
                    <input type='text' value={ email } onChange={(e) => setEmail(e.target.value)} id='Email' placeholder='"Email' />
                </div>
        </div>
        </>
)}
// idk what is happening here, havent looked at it yet on the localhost3000

export default Profile