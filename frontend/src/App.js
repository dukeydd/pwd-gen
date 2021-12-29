import './App.css';
import GridTiles from './components/GridTiles'
import { useState, useEffect } from 'react';
import axios from "axios"
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

const useStyles = makeStyles({
  wordItem: {
    height: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

function getSevenRandomInt(max=4) {
  const ints = [];
  for (let i = 0; i < 7; i++) {
    ints.push(Math.floor(Math.random() * max)+1);
  }
  
  return ints;
}

function App() {
  const [numbers, setNumbers] = useState({});
  const [words, setWords]     = useState({});
  const [passwd, setPasswd]   = useState('');
  const classes = useStyles();

  useEffect(() => {
    setNumbers({one: getSevenRandomInt(), two: getSevenRandomInt(), three: getSevenRandomInt()})
  }, []);

  useEffect(() => {
    for (const key of Object.keys(numbers)) {

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

  useEffect(() => {
    setPasswd(words.one + words.two + words.three);
  }, [words]);
  
  return (
    <div className="App">
      <h1> Password Generator </h1>
      <Grid container spacing={2} rowSpacing={3}>
        <Grid item xs={12}>
          <IconButton color="primary" 
                      aria-label="copy" 
                      component="span" 
                      onClick={() => {
                        setWords({})
                        setNumbers({one: getSevenRandomInt(), two: getSevenRandomInt(), three: getSevenRandomInt()})}}>
            <RefreshIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <GridTiles numbers={numbers.one}/>
        </Grid>
        <Grid item xs={12} className={classes.wordItem} >
          { words.one }
        </Grid>
        <Grid item xs={12}>
          <GridTiles numbers={numbers.two}/>
        </Grid>
        <Grid item xs={12} className={classes.wordItem}>
          { words.two }
        </Grid>
        <Grid item xs={12}>
          <GridTiles numbers={numbers.three}/>
        </Grid>
        <Grid item xs={12} className={classes.wordItem}>
          { words.three }
        </Grid>
        <Grid item xs={12}>
        { passwd }
        <IconButton color="primary" aria-label="copy" component="span" onClick={() => {navigator.clipboard.writeText(passwd)}}>
          <ContentCopyIcon />
        </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
