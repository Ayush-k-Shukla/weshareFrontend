import React from 'react';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

const CardRecommended = ({ post }) => {
  const navigate = useNavigate();

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Card
      style={{
        margin: '20px 2px 2px 2px',
        padding: '2px 2px 2px 2px',
        backgroundColor: '#111229',
        flex: '0 0 30.333333%',
        color: '#f9f8f8',
      }}
      onClick={() => openPost(post._id)}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          src={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {post.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardRecommended;
