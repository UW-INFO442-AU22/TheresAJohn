import React from "react"; 
import Button from "@mui/material/Button";
import "./../stylesheets/Navbar.css";

function Navbar() { 
  return (
    <nav className="navbar">
      <img className="logo" src="img/pencil-with-wings.jpg" alt="logo" />
      <ul>
        <li>
          <Button variant="text" size="large" style={{color: "white"}}>Find A Tutor</Button>
        </li>
        <li>
          <Button variant="text" size="large" style={{color: "white"}}>Find A School</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 