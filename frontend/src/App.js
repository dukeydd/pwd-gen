import './App.css';
import GridTiles from './components/GridTiles';
import { useState, useEffect } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

// for AdditionalOptions
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//end

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
    setPasswd(''); // stops page reading NaN when loading
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
    if ( typeof words.one !== 'undefined' && words.one !== '' &&
          typeof words.two !== 'undefined' && words.two !== '' &&
          typeof words.three !== 'undefined' && words.three !== '' ) {
      setPasswd(words.one + words.two + words.three);
    }
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
                        setPasswd('')
                        setWords({one: '', two: '', three: ''})
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
        <IconButton color="primary" aria-label="copy" component="span" 
                    onClick={() => {navigator.clipboard.writeText(passwd)}}>
          <ContentCopyIcon />
        </IconButton>
        </Grid>
      </Grid>
      
      
      <div>
        <h2>Additional Options </h2>
        
        <FormControl>
          <FormLabel id="case-options-label">Case Options</FormLabel>
          <RadioGroup
            aria-labelledby="case-options-label"
            defaultValue="Pascal"
            name="case-options-group"
          >
            <FormControlLabel value="pascal" control={<Radio />} label="Pascal" />
            <FormControlLabel value="camel" control={<Radio />} label="camel" />
            <FormControlLabel value="snake" control={<Radio />} label="snake" />
          </RadioGroup>
        </FormControl>
      </div>


    </div>
  );
}

export default App;
