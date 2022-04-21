import './App.css';
import GridTiles from './components/GridTiles';
import { useState, useEffect } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import AdditionalOptions from './components/AdditionalOptions';


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
  const classes = useStyles();

  useEffect(() => {
    setNumbers({one: getSevenRandomInt(), two: getSevenRandomInt(), three: getSevenRandomInt()})
  }, []);

  useEffect(() => {
    // setPasswd(''); // stops page reading NaN when loading
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
  
  return (
    <div className="App">
      <h1> Password Generator </h1>
      <Grid container spacing={2} rowSpacing={3}>
        <Grid item xs={12}>
          <IconButton color="primary" 
                      aria-label="copy" 
                      component="span" 
                      onClick={() => {
                        // setPasswd('')
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
        {/* <Grid item xs={12}>
        { passwd }
        <IconButton color="primary" aria-label="copy" component="span" 
                    onClick={() => {navigator.clipboard.writeText(passwd)}}>
          <ContentCopyIcon />
        </IconButton>
        </Grid> */}
      </Grid>
      
      <AdditionalOptions 
      // wordOne={words.one} wordTwo={words.two} wordThree={words.three} 
                          words={words} setWords={setWords} />
      
      {/* <div> */}
        {/* <h2>Additional Options </h2>
        
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
        </Grid> */}
        
      {/* </div> */}


    </div>
  );
}

export default App;
