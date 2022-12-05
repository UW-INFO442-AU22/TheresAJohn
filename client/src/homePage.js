import React from "react"
import './stylesheets/App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom"
import { Footer } from './widgets/Footer'
// import Navbar from './widgets/Navbar'
import FindSchool from "./components/FindSchool.js"
import {UserAuthSignIn, UserAuthRegister} from "./components/UserAuth.js"

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
                    <h1>Welcome to Rural school connect</h1>
                    <p>Help make education more accessible</p>
                </div>
            </div>
            <div className="float-container">
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a donor/tutor looking to help a school in need?</p>
                        <Link className="mainButton" to={"/tutor"}>Find a School to Help</Link>
                    </div>
                </div>
                <div className="float-child">
                    <div className="mainDiv">
                        <p>Are you a school teacher/representative in need of teaching resources?</p>
                        <Link className="mainButton" to={"/signin"}>Sign in to post</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

// export function Spec() {
//     return (
//         <main className="index-main">
//             <div className="flexbox-single-anime">
//                 <div className="discription-container">
//                     <img className="poster" src={require('./stylesheets/education.jpeg')} alt="children learning in school"/>
//                     <h2>School Name</h2>
//                 </div>

//                 <div className="discription-container-title">
//                     <h2 className="anime-title">After school math tutor for 7th grade students</h2>
//                     <p className="discription-text">Here is XXX Middle School and we are looking for after school math tutors. We are looking for about 10 tutors to help 40 students with their courseworks and helping them to prepare for final coming up.</p >

//                     <button> School Link </button>
//                 </div>
//             </div>
//         </main>
//     )
// }