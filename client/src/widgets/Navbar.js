import React from "react";
import { Link, useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import "../stylesheets/Navbar.css";

function Navbar(props) {
  const navigate = useNavigate();


  const handleStatusClick = () => {
    if (!props.loginStatus) {
      console.log("This is navbar status", props.loginStatus);
      navigate("/signin");
    } else {
      props.setLoginStatus(false);
      fetch("/signout");
      navigate("/");
    }
  }

  console.log("This is navbar status on line 20", props.loginStatus);

  return (
    <nav className="navbar">
      <Link to="/">
        <img role="button" aria-label="Go to Home Page" className="logo" src="/img/pencil-with-wings.jpg" alt="App logo" />
      </Link>
      <ul>
        <li>
          <Button type="button" onClick={handleStatusClick} variant="text" size="large" sx={{color: "white"}}>{props.loginStatus ? "Logout" : "Login"}</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;