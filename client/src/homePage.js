import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom"
import { Footer } from './widgets/Footer'
import FindSchool from "./components/FindSchool.js"
import {UserAuthSignIn, UserAuthRegister} from "./components/UserAuth.js"
import './stylesheets/App.css'

export function CreateHomePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateHome />} />
                <Route path="tutor" exact={true} element={<FindSchool />} />
                <Route path="signin" element={<UserAuthSignIn />} />
                <Route path="register" element={<UserAuthRegister />} />
            </Routes>
        </BrowserRouter>
    )

}

function CreateHome() {
    return (
        <div className="landing-page">
            <Home />
            <Footer />
        </div>
    )
}

export function Home() {
    return (
        <main>
            <div className="hero-image">
                <div className="hero-text">
                    <h1>Welcome to EduStation</h1>
                    <p>Help make education more accessible</p>
                </div>
            </div>
            <div className="float-container">
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a donor/tutor looking to help a school in need?</p>
                        <br></br>
                        <Link className="mainButton-home" to={"/tutor"}>Find a School to Help</Link>
                    </div>
                </div>
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a school teacher/representative in need of teaching resources?</p>
                        <br></br>
                        <Link className="mainButton-home" to={"/signin"}>Sign in to post</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}