// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignUp from "./components/LoginSignup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import Saved from "./components/Saved";
import Templates from "./components/Templates";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/saved" element={<Saved />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
