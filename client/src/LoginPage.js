import { Register } from "./Register";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const LoginPage =  (props) => {
    const [username, setUsername] = useState ('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        

        console.log('Submitting login form');
        try {
            const response = await fetch('http:localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({ username, pass }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                navigate('/resources');
                console.log(data)
                sessionStorage.setItem('userI', JSON.stringify(data.user_id)); 
                sessionStorage.setItem('username', JSON.stringify(data.username));
            } else {
                alertFunction('Sign in failed, wrong Login information input')
                console.log('FAILED!!');
            }
        } else { 
          alertFunction('Sign in error! you stink at typing')
          console.log('catastrophic failue')
        }  
    } catch (error) {
      console.log('error occured during login, obviously:', error);
    }
   };

   return (
    <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="auth-form-continer">
            <Link to="/new">CLICK HERE TO GO HOME</Link>
            <h1> Who wants some inventory?!</h1>
            <h2>Inventory Managers Login Here!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="Username"
                    id="username"
                    name="username"
                    />
                    <label htmlFor="password">Password, or whatever</label>
                    <input 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="*******"
                        id="password"
                        name="password"
                    />
                    <button type="Submit">Login</button>
                    </form>
                    <button className="Link-btn" onClick={() => props.onFormSwitch('register')}>
                        Need an account? Click here!
                    </button>
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



export function LoginForm() {
    const [currentForm, setCurrentForm] = useState('Login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "Login" ? <LoginPage onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> 
            }
        </div>
    )
}