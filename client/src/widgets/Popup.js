import React from 'react';
import "../stylesheets/Popup.css";

export function SchoolPopup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span role="button" aria-label="Close" className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
}

export function PostPopup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span role="button" aria-label="Close" className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
}

