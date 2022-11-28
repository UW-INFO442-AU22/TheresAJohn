import React, { useState, useEffect } from "react"; 

// Component imports
import Button from "@mui/material/Button";
import { SchoolPost } from "./../widgets/Post.js"; 
import Popup from "./../widgets/Popup.js"; 

// Stylesheet imports
import "./../stylesheets/FindSchool.css";

function FindSchool() {
  const [togglePopup, setTogglePopup] = useState(false); 
  const [schoolPosts, setSchoolPosts] = useState([]); 

  const handlePostClick = (event) => { 
    console.log(event); 
    console.log(event.target); 
    setTogglePopup(!togglePopup); 
  }

  useEffect(() => {
    // Fetching posts data
    fetch("/api/posts")
    .then(response => response.json())
    .then(jsonData => {
      // Mapping data into Post components
      let posts = jsonData.map(postObject => { 
        return <SchoolPost key={postObject._id} postData={postObject} handlePostClick={handlePostClick} />
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

      {togglePopup && <Popup content={
        <>
          <b>Design your Popup</b>
        </>
      }
      handleClose={handlePostClick} />}
    </>
  ); 
}

export default FindSchool; 