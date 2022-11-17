import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import Navbar from './../widgets/Navbar'
import './../stylesheets/App.css';

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
        <Navbar />
      </header>
    </div>
  );
}

export default App;
