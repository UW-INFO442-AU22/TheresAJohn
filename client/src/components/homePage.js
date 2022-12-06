import React from "react"
import '../stylesheets/App.css'
import { Link } from "react-router-dom"

// export function CreateHomePage() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<CreateHome />} />
//                 <Route path="tutor" exact={true} element={<FindSchool />} />
//                 <Route path="signin" element={<UserAuthSignIn />} />
//                 <Route path="register" element={<UserAuthRegister />} />
//             </Routes>
//         </BrowserRouter>
//     )

// }

export function CreateHome() {
    return (
        <div className="landing-page">
            <Home />
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
                        <Link className="mainButton" to={"/resource"}>Find a School to Help</Link>
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
