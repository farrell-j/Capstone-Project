import React, {useState, useContext} from "react";
import {useNavigate, Link} from "react-router-dom";
import './Register.css'
// import {alertWarning, alertSuccess} from "./Homepage";
import { useAlert } from 'react-alert'
import { TokenContext } from "../../App";

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
    const alert = useAlert()
    const {token, setToken, setUserLoggedIn} = useContext(TokenContext)

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
                
            const data = await response.json();
            if (response.ok) {
                if (data.DoD_id) {
                    alert.success('Thank you for registering!', {
                        timeout: 2000,
                        onClose: () => {
                            const init2 = {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({ 
                                    "firstname": firstName,
                                    "lastname": lastName,
                                    "DoD_id": username,
                                    "email": email,
                                    "organization": organization,
                                    "password": pass,
                                     })
                              };
                          fetch('http://localhost:8080/login', init2)
                              .then(async data => {
                                if (data.status === 200) {
                                    await setToken(await data.json())
                                    await setUserLoggedIn(true)
                                    navigate(`/homepage/${username}`)
                                } else if (data.status === 400) {
                                    alert.error('Oh no, something went wrong!', {timeout: 2000})
                                }
                              })
                        }
                      })
                } else {
                    alert.error(`${data.message}`, {timeout: 2000})
                }
            } else if (data === 'Username is taken!') {
                alert.error('Oh no, your DoD ID is already in use!', {timeout: 2000})
            }
            else {
                alert.error(`Login failed!`, {timeout: 2000})
            }
        } catch (error) {
            
            alert.error(`Error occured during login:', ${error}`, {timeout: 2000})
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