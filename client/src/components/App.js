import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { Home } from './homePage'
import FindSchool from "./FindSchool";
import Navbar from "./../widgets/Navbar";
import {UserAuthSignIn, UserAuthRegister} from "./UserAuth.js"
import { Footer } from "./../widgets/Footer";

import './../stylesheets/App.css'

function App() {
  const [loginStatus, setLoginStatus] = useState(false); 

  useEffect(() => {
    let status = (sessionStorage.getItem("email")) ? true : false; 
    setLoginStatus(status); 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      </header>
      <Routes>
        <Route path="/" element={<Home loginStatus={loginStatus} />} />
        <Route path="school" exact={true} element={<FindSchool />} />
        <Route path="donor" exact={true} element={<FindSchool />} />
        <Route path="signin" element={<UserAuthSignIn />} />
        <Route path="register" element={<UserAuthRegister />} />
        <Route path="*" element={<Home loginStatus={loginStatus} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
