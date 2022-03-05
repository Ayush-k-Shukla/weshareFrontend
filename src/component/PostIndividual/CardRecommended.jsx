import React from 'react';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';

const CardRecommended = ({ post }) => {
  return (
    <Card
      style={{
        margin: '20px 2px 2px 2px',
        padding: '2px 2px 2px 2px',
        backgroundColor: '#111229',
        color: '#f9f8f8',
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          src='https://mui.com/static/images/cards/paella.jpg'
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {post.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardRecommended;
