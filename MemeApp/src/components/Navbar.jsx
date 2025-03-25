import React from 'react'
import { Link } from "react-router-dom";
import "./css/Navbar.css"
const Navbar=()=> {
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("You have been logged out.");
    navigate("/login"); 
  };
  return (
    <div className="navbar">
      <img
        src="/icons/main.png"
        style={{ marginTop: "10px", width: "70px", heigth: "60px" }}
        alt="icon"
      />
      <ul className="nav-menu">
        <li>
          <Link to="/home" className="link">Home</Link>
        </li>
        <li>
          <Link to="/create" className="link">Create Meme</Link>
        </li>
        <li>
          <Link to="/templates" className="link">Templates</Link>
        </li>
        <li >
          <Link to="/saved" className="link">My Memes</Link>
        </li>
        
      </ul>
      <div ><Link to="/"><button className="nav-login">Login</button></Link><button className="nav-login" onClick={handleLogout}>LogOut</button></div>
    </div>
  )
}

export default Navbar