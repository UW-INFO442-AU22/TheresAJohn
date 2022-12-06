import React from "react"
import { Routes, Route } from "react-router-dom"
import { CreateHome } from './homePage'
import FindSchool from "./FindSchool";
import Navbar from "./../widgets/Navbar";
import {UserAuthSignIn, UserAuthRegister} from "./UserAuth.js"
import { Footer } from "./../widgets/Footer";

import './../stylesheets/App.css'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<CreateHome />} />
        <Route path="resource" exact={true} element={<FindSchool />} />
        <Route path="signin" element={<UserAuthSignIn />} />
        <Route path="register" element={<UserAuthRegister />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
