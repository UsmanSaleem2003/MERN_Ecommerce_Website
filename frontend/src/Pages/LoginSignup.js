import React, { useState } from 'react';
import './css/LoginSignup.css';

export default function LoginSignup() {

    const [state, setState] = useState("Login");
    const [formData, setformData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const changeHandler = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log("Login Function Executed", formData);

        let responseData;

        await fetch('http://localhost:4000/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else {
            alert(responseData.errors);
        }
    }

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        let responseData;

        await fetch('http://localhost:4000/signup', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else {
            alert(responseData.errors);
        }
    }


    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    {/* <form action='' method='POST'></form> */}
                    {state === "Sign Up" ? <input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name' /> : <></>}
                    <input type='email' placeholder='Email Address' name='email' value={formData.email} onChange={changeHandler} />
                    <input type='password' placeholder='Password' name='password' value={formData.password} onChange={changeHandler} />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}> Continue </button>
                {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
                    <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
                <div className='loginsignup-agree'>
                    <input type='checkbox' name='' id='' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}
