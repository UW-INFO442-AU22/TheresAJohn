import React, { useState, useEffect } from "react"; 
import Button from "@mui/material/Button";
import { SchoolPost } from "./../widgets/Post.js"; 
import "./../stylesheets/FindSchool.css";

function FindSchool() {
  const [popupStatus, setPopupStatus] = useState(false); 
  const [schoolPosts, setSchoolPosts] = useState([]); 

  useEffect(() => {
    // Fetching posts data
    fetch("/api/posts")
    .then(response => response.json())
    .then(jsonData => {
      // Mapping data into Post components
      let posts = jsonData.map(postObject => { 
        return <SchoolPost key={postObject._id} postData={postObject} popupStatus={popupStatus} setPopupStatus={setPopupStatus} />
      });
      setSchoolPosts(posts);
    }); 
  }, [])

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
      <section className="school-posts" aria-labelledby="school posts">
        {schoolPosts}
      </section> 

      <h1 style={popupStatus ? {display: "block"} : {display: "none"}}>Display Popup</h1>
    </>
  ); 
}

export default FindSchool; 