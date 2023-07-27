// import Register  from "../Register/Register.js";
import React, { useState, useContext } from "react";
import {useNavigate, Link } from "react-router-dom";
import './Login.css';
import LoginForm from './LoginForm';
import Register from '../Register/Register.js';
import { TokenContext } from "../../App";
// import login_background from '../images/STARS_background_for_homepage.svg';


export const LoginPage =  (props) => {
    const [username, setUsername] = useState ('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const {setToken, setUserLoggedIn} = React.useContext(TokenContext)

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        console.log('Submitting login form');
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                "DoD_id": username,
                "password": pass
            }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.accessToken) {
                // navigate('/');
                setToken(data);
                setUserLoggedIn(true);
                navigate('/homepage')
            } else {
                alertFunction('Sign in failed, wrong Login information input')
                console.log('FAILED!!');
            }
        } else { 
          alertFunction('Sign in error!')
          console.log('catastrophic failue')
        }  
    } catch (error) {
      console.log('error occured during login:', error);
    }
    };

   return (
    <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="auth-form-continer">
            
            <h1> One Track Satellite</h1>
            <h2>Space Monkeys Login Here!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="DoD_id">DoD ID</label>
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="DoD ID"
                    placeholder="DoD ID"
                    id="DoD ID"
                    name="DoD ID"
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="*******"
                        id="password"
                        name="password"
                    />
                    <button type="submit">Login</button>
                    </form>
                    <Link to="/Register" className="Link-1">Need to register an account? Click here!</Link>
                    {/* <button className="Link-btn" onClick={() => props.onFormSwitch.toggleForm('Register')}>
                        Need an account? Click here!
                    </button> */}
        </div>
    </>

    );
};


export const alertFunction = (message) => {
    document.querySelector('.fade.show').style.opacity = 1;
    document.querySelector('.alert-danger').style.display = 'block';
    document.querySelector('.alert-danger').innerHTML = message;
    setTimeout(() => {
      document.querySelector('.fade.show').style.opacity = 0;
      setTimeout(() => {
        document.querySelector('.alert-danger').style.display = 'none';
      }, 500)
    }, 1300)
  }

  export default LoginPage;