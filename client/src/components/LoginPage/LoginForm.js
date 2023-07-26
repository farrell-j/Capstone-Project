import { LoginPage } from "./LoginPage"
import { useState } from "react";
import Register from '../Register/Register.js';

export function LoginForm() {
    const [currentForm, setCurrentForm] = useState('Login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "LoginForm" ? <LoginPage onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> 
            }
        </div>
    )
}

export default LoginForm;