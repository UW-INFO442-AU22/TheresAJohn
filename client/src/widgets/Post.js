import React from "react"; 
import Button from "@mui/material/Button"; 
import LinearProgress from "@mui/material/LinearProgress";
import "./../stylesheets/Post.css"; 

export function SchoolPost(props) { 

  const handlePostClick = (event) => { 
    props.setSelectedPostData(props.postData); 
    props.setTogglePopup(!props.togglePopup); 
  }

  return(
    <div className="post" >
      <img className="post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" /> 
      <div className="post-description">
        <p><strong>Renton Park Elementary School</strong></p>
        <p><strong>Resource: </strong>{props.postData.resource}</p>
        <p><strong>Description: </strong>{props.postData.description}</p>
        <p><strong>Date Posted: </strong>{props.postData.datePosted}</p>
        <p><strong>Deadline: </strong>{props.postData.deadline}</p>
        <br />
        <p><strong>Status: </strong>{props.postData.completed ? "Completed" : "In-Progress"}</p>
        <br />
        <Button variant="text" onClick={handlePostClick}>Details</Button>
        <LinearProgress variant="determinate" value={90} />
        <p>{props.postData.quantity} more {props.postData.resource} needed</p>
      </div>
    </div>
  ); 
}
