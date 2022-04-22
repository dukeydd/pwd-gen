import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  centreStuff: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function QuickSuffix(props) {

  const setSuffix = props.setSuffix;
  const classes = useStyles();

  const handleQuickSuffix = (event) => {
    setSuffix(event.target.value)
  }

  return(
  <Stack spacing={2} direction="column" className={classes.centreStuff}>
    <FormLabel id="suffix-options-label">Quick Suffix Options</FormLabel>
    <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value= "?">?</Button>
    <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value="$">$</Button>
    <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value=".">.</Button>
    <Button variant="outlined" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'}} onClick={handleQuickSuffix} value="$%./">$%./</Button>
  </Stack>
)};

export default QuickSuffix;