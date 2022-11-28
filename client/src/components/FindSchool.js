import React, { useState, useEffect } from "react"; 

// Component imports
import Button from "@mui/material/Button";
import { SchoolPost } from "./../widgets/Post.js"; 
import Popup from "./../widgets/Popup.js"; 

// Stylesheet imports
import "./../stylesheets/FindSchool.css";

function FindSchool() {
  const [togglePopup, setTogglePopup] = useState(false); 
  const [selectedPostData, setSelectedPostData] = useState({});
  const [schoolPosts, setSchoolPosts] = useState([]); 

  useEffect(() => {
    // Fetching posts data
    fetch("/api/posts")
    .then(response => response.json())
    .then(jsonData => {
      // Mapping data into Post components
      let posts = jsonData.map(postObject => { 
        return <SchoolPost key={postObject._id} postData={postObject} togglePopup={togglePopup} setTogglePopup={setTogglePopup} setSelectedPostData={setSelectedPostData} />
      });
      setSchoolPosts(posts);
    }); 
  }, [])

  const buttonStyle = {
    fontSize: "1.15rem",
  }

  console.log(selectedPostData); 
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

      {/* <Button onClick={handlePostClick}>Click Me!</Button> */}

      {togglePopup && 
      <Popup content={
        <>
          <p><strong>Renton Park Elementary School</strong></p>
          <p><strong>Resource: </strong>{selectedPostData.resource}</p>
          <p><strong>Description: </strong>{selectedPostData.description}</p>
          <p><strong>Date Posted: </strong>{selectedPostData.datePosted}</p>
          <p><strong>Deadline: </strong>{selectedPostData.deadline}</p>
          <br />
          <p><strong>Status: </strong>{selectedPostData.completed ? "Completed" : "In-Progress"}</p>
        <br />
        </>
      } 
      handleClose={
        () => {
          setTogglePopup(!togglePopup);
        }
      } />}
    </>
  ); 
}

export default FindSchool; 