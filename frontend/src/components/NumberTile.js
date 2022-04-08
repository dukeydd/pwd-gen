import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const cardStyle = {
  display: 'block',
  maxWidth: 100
}

function RandomNumberTile(props) {
  const {number} = props;

  return (
    <Card style={cardStyle}>
      <CardContent>
        <h2>{number}</h2>
      </CardContent>
    </Card>
  );
}

export default RandomNumberTile;