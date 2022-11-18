import React from "react"; 
import Button from "@mui/material/Button";
import "./../stylesheets/FindSchool.css";

function FindSchool() {

  const buttonStyle = {
    fontSize: "1.15rem",
  }

  return(
    <>
    {/* Page options */}
      <div className="options">
        <div>
          <Button variant="text" style={buttonStyle}>Sort</Button> 
          <Button variant="text" style={buttonStyle}>Filter</Button>
        </div>
        <Button variant="text" style={buttonStyle}>Post</Button>
      </div>

      {/* Page posts */}
      <section aria-labelledby="school posts">
         
      </section> 
    </>
  ); 
}

export default FindSchool; 