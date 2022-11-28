import React from "react"; 
import Button from "@mui/material/Button"; 
import LinearProgress from "@mui/material/LinearProgress";
import "./../stylesheets/Post.css"; 

export function SchoolPost(props) { 

  const handlePostClick = (event) => { 
    props.setSelectedPostData(props.postData); 
    props.setTogglePopup(!props.togglePopup); 
  }

  const openSchoolWebsite = (url) => { 
    window.open(url, "_blank", "noopener,noreferrer"); 
  }

  return(
    <div className="post" >
      <img className="post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" /> 
      <div className="post-description">
        <Button size="large" variant="text" onClick={() => {openSchoolWebsite(props.postData.schoolLink)}}><strong>Renton Park Elementary</strong></Button>
        <p><strong>Contact: </strong>{props.postData.personOfContact}</p>
        <p><strong>Resource: </strong>{props.postData.resource}</p>
        <p><strong>Description: </strong>{props.postData.description}</p>
        <p><strong>Posted: </strong>{props.postData.datePosted}</p>
        {/* <p><strong>Status: </strong>{props.postData.completed ? "Completed" : "In-Progress"}</p> */}

        <LinearProgress style={{margin: "2rem 1rem 0 1rem"}} variant="determinate" value={90} />
        <p>{props.postData.quantity} more {props.postData.resource} needed</p>
        <Button size="small" style={{float: "right"}}variant="text" onClick={handlePostClick}>Details</Button>
      </div>
    </div>
  ); 
}
