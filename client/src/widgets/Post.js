import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "../stylesheets/Post.css";

export function SchoolPost(props) {

  const handlePostClick = (event) => {
    event.preventDefault();
    props.setSelectedPostData(props.postData);
    props.setTogglePopup(!props.togglePopup);
  }

  const openSchoolWebsite = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="post">
      <img className="post-image" src={props.postData.schoolImage.src} alt={props.postData.schoolImage.alt} />
      <div className="post-description">
        <Button type="button" size="large" variant="text" onClick={() => { openSchoolWebsite(props.postData.schoolLink) }}><strong>{props.postData.schoolName}</strong></Button>
        <p><strong>Resource: </strong>{props.postData.resource}</p>
        <p><strong>Posted: </strong>{props.postData.datePosted}</p>
        <Button type="button" size="small" style={{ float: "right" }} variant="text" onClick={handlePostClick}>Details</Button>
      </div>
    </div>
  );
}

export function MediaCard(props) {
  const handlePostClick = (event) => {
    event.preventDefault();
    props.setSelectedPostData(props.postData);
    props.setTogglePopup(!props.togglePopup);
  }

  const handleDonateClick = (event) => { 
    event.preventDefault(); 
    props.setSelectedPostData(props.postData); 
    props.setToggleDonationPopup(!props.toggleDonationPopup);
  }

  return (
    <Card sx={{ width: 275, marginTop: "0.5rem", marginBottom: "0.5rem", border: "black 3px solid"}}>
      <CardMedia
        component="img"
        height="200"
        image={props.postData.schoolImage.src}
        alt={props.postData.schoolImage.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.postData.resource}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.postData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDonateClick} sx={props.page==="donor"? {display: "block"} : {display: "none"}}>Donate</Button>
        <Button size="small" onClick={handlePostClick}>Learn More</Button>
      </CardActions>
    </Card>
  );
}