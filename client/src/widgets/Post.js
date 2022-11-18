import React from "react"; 
import LinearProgress from "@mui/material/LinearProgress";
import "./../stylesheets/Post.css"; 

export function SchoolPost() { 
  return(
    <div className="post">
      <img className="post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" /> 
      <div className="post-description">
        <p><strong>Renton Park Elementary School</strong></p>
        <p><strong>Subject: </strong>Math</p>
        <p><strong>Grade Level: </strong>4th Grade</p>
        <br />
        <p><strong>Contact: </strong>123-456-7890</p>
        <p><strong>Contact Person: </strong>Dr.Smith</p>
        <p><a className="link" href="https://rentonpark.rentonschools.us/">Link to School Website</a></p>
        <br />
        <LinearProgress variant="determinate" value={90} />
        <p>5 more tutors needed</p>
      </div>
    </div>
  ); 
}