import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// import {alertWarning, alertSuccess} from "./Homepage";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [affil, setAffiliation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login form');
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass, username, affil }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    sessionStorage.setItem('userID', data.user_id);
                    sessionStorage.setItem('username', username);
                    navigate('/resources');
                    // alertSuccess(data.message);
                } else {
                    console.log(data.message)
                    // alertWarning(data.message);
                }
            } else {
                console.log('Login Failed!');
            }
        } catch (error) {
            console.log('Error occured during login:', error);
        }
    };

    const handleAffiliationChange = (selectedAffiliation) => {
        setAffiliation(selectedAffiliation);
    };

    return (
        <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert"></div>
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
                <label htmlFor="affiliation">affiliation</label>
                <select id="affiliation" value={affil} onChange={(e) => handleAffiliationChange(e.target.value)}>
                    <option value ="">Select affiliation</option>
                    <option value = "Active Duty">Active Duty</option>
                    <option value = "Government Employee">Gov. Employee</option>
                </select>
                <button type="Submit">Register Now!</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('Login')}>
                Don't need this form? Click here
            </button>
        </div>
        </>
    );
}