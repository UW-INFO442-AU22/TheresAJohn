import React from "react"

import './../stylesheets/App.css'
import {CreateHomePage} from '../homePage'

function App() {
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <CreateHomePage />
    </div>
  );
}

export default App;
