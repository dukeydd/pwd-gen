import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

var cardStyle = {
  display: 'block',
  width: 100,
  height: 100
}

function RandomNumberTile(props) {
  const {number} = props
  return (
    <Card style={cardStyle} >
      <CardContent>
        <h2>{number}</h2>
      </CardContent>
    </Card>
  );
}

export default RandomNumberTile;