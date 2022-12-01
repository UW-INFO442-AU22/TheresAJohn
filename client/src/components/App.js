import React, { useState, useEffect } from "react";
import logo from './logo.svg';

import Navbar from './../widgets/Navbar'
import FindSchool from "./../components/FindSchool.js";

import './../stylesheets/App.css';
import {Footer} from '../widgets/Footer'
import {CreateHomePage} from '../homePage'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <CreateHomePage />
    </div>
  );
}

export default App;
