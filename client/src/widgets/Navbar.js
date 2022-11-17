import React from "react"; 
import Button from "@mui/material/Button";
import "./../stylesheets/Navbar.css";

function Navbar() { 
  return (
    <div className="navbar">
      <img className="logo" src="img/pencil-with-wings.jpg" alt="logo" />
      <ul>
        <li>
          <Button variant="text" style={{color: "white"}}>Find A Tutor</Button>
        </li>
        <li>
          <Button className="Button" variant="text" style={{color: "white"}}>Find A School</Button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar; 