import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import './Register.css'
// import {alertWarning, alertSuccess} from "./Homepage";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [username, setUsername] = useState('');
    const [organization, setOrganization] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login form');
        if (pass !== confirmPass) {
            setPasswordMatchError(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "firstname": firstName, 
                    "lastname": lastName, 
                    "DoD_id": username, 
                    "email": email,
                    "organization": organization,
                    "password": pass,
                     }),
            });
                
            if (response.ok) {
                const data = await response.json();
                if (data.DoD_id) {
                    navigate('/login')
                } else {
                    console.log(data.message)
                }
            } else {
                console.log('Login Failed!');
            }
        } catch (error) {
            console.log('Error occured during login:', error);
        }
    };

    return (
        <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert"></div>
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
                <label htmlFor="lastName">Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="DoD ID" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" />
                <label htmlFor="affil">Organization</label>
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} id="organization" placeholder="Organization" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
                <label htmlFor="confirmPass">Confirm Password</label>
                {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match.</p>}
                <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="*******" id="confirmPassword"  name="confirmPassword" />
                <button type="Submit">Register Now!</button>
            </form>
            <Link to="/"className="Link-2">Don't need this form? Click here!</Link>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch.toggleForm('Login')}>
                Don't need this form? Click here
            </button> */}
        </div>
        </>
    );
}
export default Register;