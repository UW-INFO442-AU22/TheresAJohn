import React from "react";
import logo from './logo.svg';
import './../stylesheets/App.css';
import {Footer} from '../widgets/Footer'
import {Home, Spec} from '../homePage'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Home />
      <Footer />
    </div>
  );
}

export default App;
