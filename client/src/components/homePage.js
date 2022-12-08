import React from "react"
import '../stylesheets/App.css'
import { Link } from "react-router-dom"

export function Home(props) {
    return (
        <div className="landing-page">
            <div aria-label="home-page image" className="hero-image">
                <div className="hero-text">
                    <h1>Welcome to EduStation</h1>
                    <p>Help make education more accessible</p>
                </div>
            </div>
            <div className="float-container">
                <div className="float-child">
                    <div className="mainDiv">
                        <h2>Are you a donor/tutor looking to help a school in need?</h2>
                        <Link className="mainButton" to={"/donor"}>Find a School to Help</Link>
                    </div>
                </div>
                <div className="float-child">
                    <div className="mainDiv">
                        <h2>Are you a school teacher/representative in need of teaching resources?</h2>
                        <Link className="mainButton" to={ !props.loginStatus ? "/signin" : "/school"}>Request Resources</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
