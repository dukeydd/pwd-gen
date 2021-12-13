import './App.css';
import GridTiles from './components/GridTiles'
import { useState, useEffect } from 'react';


function getSevenRandomInt(max) {
  const ints = [];
  for (let i = 0; i < 7; i++) {
    ints.push(Math.floor(Math.random() * max)+1);
  }
  
  return ints;
}

function App() {
  const [numbers, setNumbers] = useState({});
  useEffect(() => {
    setNumbers({one: getSevenRandomInt(4), two: getSevenRandomInt(4), three: getSevenRandomInt(4)})
  }, [])
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
