import React, { useState } from "react";
import user from "/login/user-icon.png";
import password from "/login/password-icon.png";
import email from "/login/email-icon.webp";
import "./css/LoginSignup.css"
const LoginSignUp = () => {
  const [button,setButton]=useState("Sign up");
  return (
    <div className="l">
      <div className="header">
        <div className="text">{button}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {button==="Login"?<div></div>:<div className="input">
            <img style={{width:"20px",height:"20px"}} src={user} alt="" />
            <input type="text" placeholder="Enter Your Name"/>
        </div>}
        
        <div className="input">
            <img style={{width:"20px",height:"30px"}} src={email} alt="" />
            <input type="email" placeholder="Enter your MailID"/>
        </div>
        <div className="input">
            <img style={{width:"20px",height:"20px"}} src={password} alt="" />
            <input type="password" placeholder="Enter the Password"/>
        </div>
      </div>
      <div className="submit-container">
        <div className={button==="Login"?"submit gray":"submit"} onClick={()=>setButton("Sign up")}>Sign up</div>
        <div className={button==="Sign up"?"submit gray":"submit"} onClick={()=>setButton("Login")}>Login</div>
      </div>
    </div>
  );
};

export default LoginSignUp;
