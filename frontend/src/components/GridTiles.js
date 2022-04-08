import React from 'react';
import Grid from '@mui/material/Grid';
import NumberTile from './NumberTile';

function GridTiles(props) {
  const {numbers} = props
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5}/>
      {numbers && numbers.map((number, index) => {
        return <Grid xs={1} item key={index}><NumberTile number={number}/></Grid>
      })}
      <Grid item xs={2.5}/>
    </Grid>
  );
}


export default GridTiles;