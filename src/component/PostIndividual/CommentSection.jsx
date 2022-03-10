import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles.js';

const CommentSection = (post) => {
  const classes = useStyles();
  const [comments, setComments] = useState([1, 2, 3, 4]);
  return (
    <div style={{ backgroundColor: '#314054', padding: '10px' }}>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography style={{ color: '#e9f1f8' }} gutterBottom>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography
              style={{ color: '#e9f1f8' }}
              key={i}
              gutterBottom
              vriant='subtitle1'
            >
              comment : {i}
            </Typography>
          ))}
        </div>
        <div style={{ width: '70%' }}>
          {' '}
          <Typography style={{ color: '#e9f1f8' }} gutterBottom>
            write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            label='comment'
            variant='outlined'
            multiline
          ></TextField>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
