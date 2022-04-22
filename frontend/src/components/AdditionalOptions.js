import React from 'react';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import QuickSuffix from './QuickSuffix';


function AdditionalOptions(props) {
  const [delim, setDelim]     = useState('');
  const [suffix, setSuffix]   = useState('');
  const [passwd, setPasswd]   = useState('');

  const words = props.words;
  const setWords = props.setWords;

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
  
  return (
    <div>
      <h2>Additional Options </h2>
      <Grid 
        container spacing={2}
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
          <QuickSuffix setSuffix={setSuffix}/>
        </Grid>
      </Grid>
      <h2>{passwd}</h2>
    </div>
  );
}


export default AdditionalOptions;