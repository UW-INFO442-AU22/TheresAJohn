import React, { useState, useEffect } from "react"; 
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { SchoolPost } from "./../widgets/Post.js"; 
import Popup from "./../widgets/Popup.js"; 
import "../stylesheets/FindSchool.css"; 
import "../stylesheets/Popup.css"; 

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

  // Button style
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

      {/* Toggle popup for the post that was clicked on */}
      {togglePopup && 
      <Popup content={
        <div className="content">
          <div className="post-info">
            <img className="info-item post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" /> 
            <p className="info-item"><strong>Renton Park Elementary</strong></p>
            <p className="info-item"><strong>https://rentonpark.rentonschools.us/</strong></p>
            <p className="info-item"><strong>Contact: </strong>{selectedPostData.personOfContact}</p>
            <p className="info-item"><strong>Resource: </strong>{selectedPostData.resource}</p>
            <p className="info-item"><strong>Description: </strong>{selectedPostData.description}</p>
            <p className="info-item"><strong>Posted: </strong>{selectedPostData.datePosted}</p>
            <p className="info-item"><strong>Status: </strong>{selectedPostData.completed ? "Completed" : "In-Progress"}</p>
            <LinearProgress style={{marginTop: "0.5rem", width: "90%"}} variant="determinate" value={90} />
            <br />
          </div> 
          <div className="description">
            <p><strong>Description: </strong></p> 
            {selectedPostData.description} la;ksjd fa
            sdfjlak;sjd f;alksdjfal;ks jd;lfksdjla;kjdfs;kl asjakl;sjdflkajsd jkdsjlfkj fjkdlsjfiowme fjdiosjfw;me 
          </div> 
        </div> 
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