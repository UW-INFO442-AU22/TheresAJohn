import React from 'react';
import "../stylesheets/Popup.css";

function Popup(props) { 
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <p>Popup information</p>
        {props.content}
      </div>
    </div>
  );
}

export default Popup; 