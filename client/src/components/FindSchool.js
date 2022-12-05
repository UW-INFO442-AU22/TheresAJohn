import React, { useState, useEffect, useRef } from "react"; 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { SchoolPost } from "./../widgets/Post.js"; 
import { SchoolPopup, PostPopup } from "./../widgets/Popup.js"; 
import "../stylesheets/FindSchool.css"; 
import "../stylesheets/Popup.css"; 

function FindSchool() {
  const [toggleSchoolPopup, setToggleSchoolPopup] = useState(false);
  const [togglePostPopup, setTogglePostPopup] = useState(false);  
  const [selectedPostData, setSelectedPostData] = useState({});
  const [schoolPosts, setSchoolPosts] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  const website = useRef(""); 
  const resource = useRef(""); 
  const quantity = useRef(1); 
  const description = useRef(""); 

  // to get info about logged in user
  const email = sessionStorage.getItem("email");
  const contact = sessionStorage.getItem("fullName");
  const schoolName = sessionStorage.getItem("schoolName");

  console.log(sessionStorage);
  console.log(email); 

  // Button style
  const buttonStyle = {
    fontSize: "1.15rem"
  }
  
  // Text Field style
  const textFieldStyle = {
    width: "45%", 
    padding: "1rem"
  }

  useEffect(() => {
    // Fetching posts data
    fetch("/api/posts")
    .then(response => response.json())
    .then(jsonData => {
      // Mapping data into Post components
      let posts = jsonData.map(postObject => { 
        return <SchoolPost 
        key={postObject._id} 
        postData={postObject} 
        togglePopup={toggleSchoolPopup} 
        setTogglePopup={setToggleSchoolPopup} 
        setSelectedPostData={setSelectedPostData} />
      });
      setSchoolPosts(posts);
    }); 
  }, [])

  // Check if inputs from user are valid
  function validInputs() { 
    let validInput = true;
    if (website.current.value == "") { 
      invalidFields.push("School Website"); 
      validInput = false; 
    }
    if (resource.current.value == "") { 
      invalidFields.push("Resource"); 
      validInput = false; 
    }
    if (quantity.current.value <= 0) { 
      invalidFields.push("Quantity"); 
      validInput = false; 
      // to get info about logged in user
      const LoggedInUser = sessionStorage.getItem("email")
      console.log(LoggedInUser); 
    }
    if (description.current.value == "") { 
      invalidFields.push("Description"); 
      validInput = false; 
    }
    setInvalidFields([...invalidFields]);
    console.log(invalidFields);  
    return validInput; 
  }

  // Handle info submissions
  const handlePostSubmit = (event) => { 
    event.preventDefault(); 

    // Checking for any empty input fields
    if (!validInputs()) { 
      setErrorMessage("Please fill out all the following fields with the proper values before submitting: \n\n" + [...invalidFields].join(", "));
      return; 
    } else { 
      // Sending post endpoint all post input values
      fetch("/api/posts", 
      {
        method: "POST", 
        body: JSON.stringify({
          schoolName: schoolName, 
          contact: contact,
          email: email, 
          link: website.current.value, 
          resource: resource.current.value, 
          quantity: quantity.current.value,
          description: description.current.value
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      setTogglePostPopup(false); 
      
      // Refetching all posts after update
      fetch("/api/posts")
      .then(response => response.json())
      .then(jsonData => {
        // Mapping data into Post components
        let posts = jsonData.map(postObject => { 
          return <SchoolPost key={postObject._id} postData={postObject} togglePopup={toggleSchoolPopup} setTogglePopup={setToggleSchoolPopup} setSelectedPostData={setSelectedPostData} />
        });
        setSchoolPosts(posts);
      }); 
      
      // Resetting input field values
      contact.current.value = ""; 
      resource.current.value = ""; 
      website.current.value = ""; 
      description.current.value = "";
      quantity.current.value = 1; 
      setInvalidFields([]); 
      setErrorMessage("");
    }
  }
    
    // Handle clicks made on post button
    const handlePostButtonClick = (event) => { 
      event.preventDefault(); 
      setTogglePostPopup(!togglePostPopup); 
    }
    

  return(
    <>
    {/* Page options */}
      <div className="options">
        <div>
          <Button variant="text" style={buttonStyle}>Sort</Button> 
          <Button variant="text" style={buttonStyle}>Filter</Button>
        </div>
        <Button variant="text" onClick={handlePostButtonClick} style={buttonStyle}>Post</Button>
      </div>

      {/* Page posts */}
      <section className="school-posts" aria-labelledby="school posts">
        {/* Test div for logged in user info */}
        {/* <div>Name: {LoggedInUser}</div> */}
        {schoolPosts}
      </section> 

      {/* Toggle popup for the post that was clicked on */}
      {toggleSchoolPopup && 
      <SchoolPopup content={
        <div className="content">
          <div className="post-info">
            <img className="info-item post-image" src="img/renton-park-elementary.jpg" alt="renton park elementary" /> 
            <p className="info-item">
              <strong>
                Contact: 
              </strong>
              {selectedPostData.personOfContact}
            </p>
            <p className="info-item">
              <strong>
                Resource: 
              </strong>
              {selectedPostData.resource}
            </p>
            <p className="info-item">
              <strong>
                Description:
              </strong>
              {selectedPostData.description}
            </p>
            <p className="info-item">
              <strong>
                {selectedPostData.schoolLink}
              </strong>
            </p>
            <p className="info-item">
              <strong>
                Posted: 
              </strong>
              {selectedPostData.datePosted}
            </p>
            <p className="info-item">
              <strong>
                Status: 
              </strong>
              {selectedPostData.completed ? "Completed" : "In-Progress"}
            </p>
            <p className="info-item">
              <strong>
                Quantity Requested:  
              </strong>
              {selectedPostData.quantity}
            </p>
            <p className="info-item">
              <strong>
                Quantity Donated: 
              </strong>
              {selectedPostData.quantityDonated}
            </p>
            <LinearProgress style={{marginTop: "0.5rem", width: "90%"}} variant="determinate" value={selectedPostData.quantityDonated / selectedPostData.quantity * 100} />
            <br />
          </div> 
          <div className="description">
            <p>
              <strong>
                Description: 
              </strong>
            </p> 
            {selectedPostData.description}
          </div> 
        </div> 
      } 
      handleClose={
        () => {
          setToggleSchoolPopup(!toggleSchoolPopup);
        }
      } />}


      {togglePostPopup && 
      <PostPopup 
        content={
          <>
            <h3>Please fill out and submit this form</h3>
            <div className="input-info">
              <TextField style={textFieldStyle}
                required
                inputRef={website}
                id="outlined-required"
                label="School Website"
                type="text"
              />
              <TextField style={textFieldStyle}
                required
                inputRef={resource}
                id="outlined-required"
                label="Needed Resource"
                type="text"
              />
              <TextField style={textFieldStyle}
                required
                inputRef={quantity}
                id="outlined-required"
                label="Quantity Needed"
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField style={textFieldStyle}
                required
                inputRef={description}
                id="outlined-required"
                label="Description"
                type="text"
              />
            </div>
            <p style={{color: "red"}}>{errorMessage}</p>
            <Button variant="text" onClick={handlePostSubmit}>
              Submit
            </Button>
          </>
        } 
        handleClose={handlePostButtonClick}
      />
      }
    </>
  ); 
}

export default FindSchool; 