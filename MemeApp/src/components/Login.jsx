import React, { useState } from "react";
import usericon from "/login/user-icon.png";
import passwordicon from "/login/password-icon.png";
import emailicon from "/login/email-icon.webp";
import "./css/Login.css"
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleSignup = async(event) => {
    event.preventDefault()
    const req =await axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    });
    const message=req.data.message
    const isLogin=req.data.isLoggedin
    if(isLogin){
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
      <button type="submit" className="submit">login</button>
      </div>
      </form>
    </div>
  )
}

export default Login
