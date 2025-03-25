import React, { useState } from "react";
import passwordicon from "/login/password-icon.png";
import emailicon from "/login/email-icon.webp";
import "./css/LoginSignup.css"
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const API_BASE_URL ="https://meme-app-1-kj6m.onrender.com";
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleSignup = async(event) => {
    event.preventDefault()
    const req =await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    const message=req.data.message
    const isLogin=req.data.isLoggedin
    if(isLogin){
      localStorage.setItem("token",req.data.token);
      localStorage.setItem("userEmail",req.data.email);
      alert(message)
      navigate("/home")
    }
    else{
      alert(message)
    }
  };
  return (
    <div className="l">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSignup} className="inputs">
        <div className="input">
            <img style={{width:"20px",height:"30px"}} src={emailicon} alt="" />
            <input id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your MailID"/>
        </div>
        <div className="input">
            <img style={{width:"20px",height:"20px"}} src={passwordicon} alt="" />
            <input id="Password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                type="password" placeholder="Enter the Password"/>
        </div>
      
      <div className="submit-container">
      <button type="submit" className="submit">Login</button>
      </div>
      </form>
    </div>
  )
}

export default Login
