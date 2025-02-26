import React from 'react'
import { Link } from "react-router-dom";
import "./css/Home.css"

const Home = () => {
  return (
    <div className="container">
      <img
        src="/icons/main.png"
        alt="icon"
      />
        <h1>Welcome to MemeMaster</h1>
        <p>Create, Customize & Share Memes in Seconds!</p>
        <Link to="/Create" className="btn">Start Creating</Link>
        <div className="features">
            <ul>
                <li>📸 Upload your images, Add text, stickers</li>
                <li>🎭 Browse trending meme templates</li>
                <li>🚀 Share instantly on social media</li>
                <li>💾 Download high-quality memes</li>
            </ul>
        </div>
    </div>
  )
}

export default Home

