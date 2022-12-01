import React from "react";
import './stylesheets/App.css'

export function Home() {
    return (
    <div class="main-block">
      <div class="left-part">
        <i class="fas fa-graduation-cap"></i>
        <h1>Register your account</h1>
        <p>register your account to start browse available resources and post your request!</p>
        <div class="btn-group">
          <a class="btn-item" href="login.html">Sign in</a>
        </div>
      </div>
      <form action="/">
        <div class="title">
          <i class="fas fa-pencil-alt"></i> 
          <h2>Register here</h2>
        </div>
        <div class="info">
          <input class="fname" type="text" name="name" placeholder="Full Name">
          <input type="text" name="sname" placeholder="School name">
          <input type="text" name="name" placeholder="Email">
          <input type="password" name="name" placeholder="Password">
        </div>
        <button type="submit" href="/">Submit</button>
      </form>
    </div>
    )
  }