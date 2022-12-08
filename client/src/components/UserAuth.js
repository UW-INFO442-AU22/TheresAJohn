import React, { useState } from "react";
import { Link } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/registration.css';

export function UserAuthSignIn() {
  const [errorMsg, setErrorMsg] = useState("");
  const handleSignIn = (event) => {
    event.preventDefault();
    fetch("/signin", {
      method: "POST",
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.status === "success") {
          setErrorMsg("")
          let userInfo = jsonData.userInfo
          sessionStorage.setItem("fullName", userInfo.fullName)
          sessionStorage.setItem("email", userInfo.email)
          sessionStorage.setItem("schoolName", userInfo.schoolName)
          window.location.href = "/school"
        }
      })
      .catch(error => {
        setErrorMsg("Something went wrong. Try Again")
      });
  }

  return (
    <div className="main-block-auth">
      <div className="left-part">
        <i aria-label="Graduation Cap Icon" className="fas fa-graduation-cap" alt="Graduation Cap Icon"></i>
        <h1>Log into your account</h1>
        <p>Log into your account to make a request and get help from donors</p>
        <br></br>
        <Link className="mainButton-auth" to={"/register"}>Don't have an account? Register</Link>
      </div>
      <div className="right-part">
        <form action="/">
          <div className="title">
            <i aria-label="Pencil Icon" className="fas fa-pencil-alt" alt="Pencil Icon"></i>
            <h2>Log in here</h2>
          </div>
          <div className="info">
            <input required aria-required="true" type="text" id="email" placeholder="Email" />
            <input required aria-required="true" type="password" id="password" placeholder="Password" />
          </div>
          <div id="error">{errorMsg}</div>
          <button type="submit" onClick={handleSignIn}>Log in</button>
        </form>
      </div>
    </div>
  )
}

export function UserAuthRegister() {
  const [errorMsg, setErrorMsg] = useState("");
  const handleRegister = (event) => {
    event.preventDefault();
    fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        fullName: document.getElementById("fullName").value,
        schoolName: document.getElementById("schoolName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.status === "success") {
          setErrorMsg("")
          window.location.href = "/signin"
        }
      })
      .catch(error => {
        setErrorMsg("Something went wrong. Try Again")
      });
  }

  return (
    <div className="main-block-auth">
      <div className="left-part">
        <i aria-label="Graduation Cap Icon" className="fas fa-graduation-cap" alt="Graduation Cap Icon"></i>
        <h1>Register your account</h1>
        <p>register your account to start browse available resources and post your request!</p>
        <br></br>
        <Link className="mainButton-auth" to={"/signin"}>Already have an account? Sign in</Link>
      </div>
      <div className="right-part">
        <form action="/">
          <div className="title">
            <i aria-label="Pencil Icon" className="fas fa-pencil-alt" alt="Pencil Icon"></i>
            <h2>Register here</h2>
          </div>
          <div className="info">
            <input required aria-required="true" type="text" id="fullName" placeholder="Full Name" />
            <input required aria-required="true" type="text" id="schoolName" placeholder="School Name" />
            <input required aria-required="true" type="text" id="email" placeholder="Email" />
            <input required aria-required="true" type="password" id="password" placeholder="Password" />
          </div>
          <div id="error">{errorMsg}</div>
          <button type="submit" onClick={handleRegister}>Submit</button>
        </form>
      </div>
    </div>
  )
}