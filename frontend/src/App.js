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
    for (const key of Object.keys(numbers)) {
      console.log(key)
      if ( typeof numbers[key] !== 'undefined' && numbers[key] ) {
        axios.get("http://0.0.0.0:8000/get_word/" + numbers[key].join(''))
          .then((response) => {
            setWords(words => ({...words, [key]: response.data}));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [numbers]);
  
  return (
    <div className="App">
      <h1> Password Generator </h1>
      <GridTiles numbers={numbers.one}/>
      <p />
      {words.one}
      <p />
      <GridTiles numbers={numbers.two}/>
      <p />
      {words.two}
      <p />
      <GridTiles numbers={numbers.three}/>
      <p />
      {words.three}
    </div>
  );
}

export default App;
