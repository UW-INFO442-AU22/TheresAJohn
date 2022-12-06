import React from "react";
import Button from "@mui/material/Button";
import "../stylesheets/Post.css";

export function SchoolPost(props) {

  const handlePostClick = (event) => {
    props.setSelectedPostData(props.postData);
    props.setTogglePopup(!props.togglePopup);
  }

  const openSchoolWebsite = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="post" >
      <img className="post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" />
      <div className="post-description">
        <Button size="large" variant="text" onClick={() => { openSchoolWebsite(props.postData.schoolLink) }}><strong>{props.postData.schoolName}</strong></Button>
        <p><strong>Resource: </strong>{props.postData.resource}</p>
        <p><strong>Posted: </strong>{props.postData.datePosted}</p>
        <Button size="small" style={{ float: "right" }} variant="text" onClick={handlePostClick}>Details</Button>
      </div>
    </div>
  );
}
