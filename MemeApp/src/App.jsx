// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignUp from "./components/LoginSignup"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Create  from "./components/Create";
import Saved from "./components/Saved";
import Templates from "./components/Templates";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<LoginSignUp/>}
          />
          <Route
            path="/home"
            element={<Home/>}
          />
          <Route
            path="/create"
            element={<Create/>}
          />
          <Route
            path="/templates"
            element={<Templates/>}
          />
          <Route
            path="/saved"
            element={<Saved/>}
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
