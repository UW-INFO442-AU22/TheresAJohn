import React from "react";
import './stylesheets/App.css'

export function Home() {
    return (
        
        <main class="landing-page">
            <div class="hero-image">
      <div class="hero-text">
        <h1>Welcome to Rural school connect</h1>
        <p>Help make education more accessible</p>
      </div>
    </div>
      <div class="float-container">

<div class="float-child">
<div class="mainDiv">
    <p>Are you a donor/tutor looking to help a school in need?</p >
    <a href="FindSchool.js">
        <button class="mainButton">Find a School to Help</button>
    </a>
    
</div>
</div>
<div class="float-child">
<div class="mainDiv">
<p>Are you a school teacher/representative in need of teaching resources?</p >
<a href="registration.html">
        <button class="mainButton">Find resources</button>
</a>
</div>
</div>
</div>
      </main>
    )
}

export function Spec() {
    return (
        <main className="index-main">
            <div className="flexbox-single-anime">
                <div className="discription-container">
                    < img className="poster" src={require('./stylesheets/education.jpeg')} />
                    <h2>School Name</h2>
                </div>

                <div className="discription-container-title">
                    <h2 className="anime-title">After school math tutor for 7th grade students</h2>
                    <p className="discription-text">Here is XXX Middle School and we are looking for after school math tutors. We are looking for about 10 tutors to help 40 students with their courseworks and helping them to prepare for final coming up.</p >
                    
                    <button> School Link </button>
                </div>
            </div>
        </main>
    )
}