import React from "react";
import { Link } from "react-router-dom"
import Button from "@mui/material/Button";
import "../stylesheets/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/"> 
        <img className="logo" src="img/pencil-with-wings.jpg" alt="logo" />
      </Link>
      <ul>
        {/* <li>
          <Button variant="text" size="large" style={{color: "white"}}>Find A Tutor</Button>
        </li> */}
        <li>
          <Button variant="text" size="large" style={{ color: "white" }}>Find A School</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 