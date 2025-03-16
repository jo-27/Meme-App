
import React, { useState } from "react";
import usericon from "/login/user-icon.png";
import passwordicon from "/login/password-icon.png";
import emailicon from "/login/email-icon.webp";
import "./css/LoginSignup.css"
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
const LoginSignUp = () => {
  const API_BASE_URL ="https://meme-app-1-kj6m.onrender.com";
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleSignup = async(event) => {
    event.preventDefault()
    const req =await axios.post(`${API_BASE_URL}/signup`, {
      name: name,
      email: email,
      password: password,
    });
    const message=req.data.message
    const isSignup=req.data.isSignup
    if(isSignup){
      alert(message)
      navigate("/Login")
    }
    else{
      alert(message)
    }
  };
  return (
    <div className="l">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSignup} className="inputs">
      <div className="input">
            <img style={{width:"20px",height:"20px"}} src={usericon} alt="" />
            <input id="firstName"
                value={name}
                onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Name"/>
        </div>
        
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
      <button type="submit" className="submit">Sign In</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
      </form>
    </div>
  );
};

export default LoginSignUp;