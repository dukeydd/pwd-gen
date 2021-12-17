import './App.css';
import GridTiles from './components/GridTiles'
import { useState, useEffect } from 'react';
import axios from "axios"


function getSevenRandomInt(max=4) {
  const ints = [];
  for (let i = 0; i < 7; i++) {
    ints.push(Math.floor(Math.random() * max)+1);
  }
  
  return ints;
}

function App() {
  const [numbers, setNumbers] = useState({});
  const [words, setWords] = useState({});
  
  useEffect(() => {
    setNumbers({one: getSevenRandomInt(), two: getSevenRandomInt(), three: getSevenRandomInt()})
  }, [])

  useEffect(() => {
    axios.get("http://0.0.0.0:8000/")
        .then((response) => console.log(response.data))
        .catch(function (error) {
          console.log(error.toJSON());
  });
  }, []);
  
  return (
    <div className="App">
      <h1> Password Generator </h1>
      <GridTiles numbers={numbers.one}/>
      <p />
      Random Word One
      <p />
      <GridTiles numbers={numbers.two}/>
      <p />
      Random Word Two
      <p />
      <GridTiles numbers={numbers.three}/>
      <p />
      Random Word Three
    </div>
  );
}

export default App;
