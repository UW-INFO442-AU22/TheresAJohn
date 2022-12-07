import React from "react";
import { Link, useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import "../stylesheets/Navbar.css";

function Navbar(props) {
  const navigate = useNavigate(); 

  
  const handleStatusClick = () => { 
    if (!props.loginStatus) {
      navigate("/signin");
    } else {
      props.setLoginStatus(false); 
      fetch("/signout"); 
      navigate("/");
    }
  }

  return (
    <nav className="navbar">
      <Link to="/"> 
        <img className="logo" src="/img/pencil-with-wings.jpg" alt="logo" />
      </Link>
      <ul>
        <li>
          <Button onClick={handleStatusClick} variant="text" size="large" sx={{color: "white"}}>{props.loginStatus ? "Logout" : "Login"}</Button>
        </li>
        {/* <li>
          <Button variant="text" size="large" style={{color: "white"}}>Find A Tutor</Button>
        </li>
        <li>
          <Button variant="text" size="large" style={{ color: "white" }}>Find A School</Button>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar; 