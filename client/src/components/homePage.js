import React from "react"
import '../stylesheets/App.css'
import { Link } from "react-router-dom"

export function Home(props) {
    return (
        <div className="landing-page"> 
            <div className="hero-image">
                <div className="hero-text">
                    <h1>Welcome to EduStation</h1>
                    <p>Help make education more accessible</p>
                </div>
            </div>
            <div className="float-container">
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a donor or tutor looking to help a school in need?</p>
                        <br></br>
                        <Link className="mainButton-home" to={"/donor"}>Find a School to Help</Link>
                    </div>
                </div>
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a school teacher or representative in need of teaching resources?</p>
                        <br></br>
                        <Link className="mainButton-home" to={"/signin"}>Sign in to post</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
