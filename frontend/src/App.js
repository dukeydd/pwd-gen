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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//end

const useStyles = makeStyles({
  wordItem: {
    height: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  centreStuff: {
    justifyContent: 'center',
    alignItems: 'center',
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
  const [delim, setDelim]     = useState('');
  const [suffix, setSuffix]   = useState('');
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
      setPasswd(words.one + delim + words.two + delim + words.three + suffix);
    }
  }, [words, delim, suffix]);

  
  const handleCase = (event) => {

    let wordone = words.one
    let wordtwo = words.two
    let wordthree = words.three

    switch(event.target.value) {
      case "snake":
        wordone = words.one.charAt(0).toLowerCase() + words.one.slice(1);
        wordtwo = words.two.charAt(0).toLowerCase() + words.two.slice(1);
        wordthree = words.three.charAt(0).toLowerCase() + words.three.slice(1);
        break;
      case "pascal":
        wordone = words.one.charAt(0).toUpperCase() + words.one.slice(1);
        wordtwo = words.two.charAt(0).toUpperCase() + words.two.slice(1);
        wordthree = words.three.charAt(0).toUpperCase() + words.three.slice(1);
        break;
      case "camel":
        wordone = words.one.charAt(0).toLowerCase() + words.one.slice(1);
        wordtwo = words.two.charAt(0).toUpperCase() + words.two.slice(1);
        wordthree = words.three.charAt(0).toUpperCase() + words.three.slice(1);
        break;
    }
    setWords({one: wordone, two: wordtwo, three: wordthree})
  };

  const handleQuickSuffix = (event) => {
    setSuffix(event.target.value)
  }
  
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
        
        <Grid 
          container spacing={2}
          // alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={4}>
              <FormControl>
                <FormLabel id="case-options-label">Case Options</FormLabel>
                <RadioGroup
                  aria-labelledby="case-options-label"
                  defaultValue="snake"
                  name="case-options-group"
                  onChange={handleCase}
                >
                  <FormControlLabel value="snake" control={<Radio />} label="Snake" />
                  <FormControlLabel value="pascal" control={<Radio />} label="Pascal" />
                  <FormControlLabel value="camel" control={<Radio />} label="Camel" />
                  
                </RadioGroup>
              </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="column">
            <FormLabel id="custom-options-label">Custom Options</FormLabel>
              <TextField 
                id="word-delimiter-input" 
                label="Word Delimiter" 
                variant="outlined" 
                onChange={(event) => {
                  setDelim(event.target.value)
                }}/>
              <TextField 
                id="password-suffix-input" 
                label="Password Suffix" 
                variant="outlined"
                onChange={(event) => {
                  setSuffix(event.target.value)
                }}/>
            </Stack>
          </Grid>

          <Grid item xs={4} >
            <Stack spacing={2} direction="column" className={classes.centreStuff}>
            <FormLabel id="suffix-options-label">Quick Suffix Options</FormLabel>
              <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value= "?">?</Button>
              <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value="$">$</Button>
              <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value=".">.</Button>
              <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value="$%./">$%./</Button>
            </Stack>
          </Grid>
        </Grid>
        
      </div>


    </div>
  );
}

export default App;
