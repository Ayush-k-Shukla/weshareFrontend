import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts.js';

import useStyles from './styles.js';

const CommentSection = (post) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.post.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(post);
  const handleSubmit = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    dispatch(commentPost(finalComment, post.post._id));
  };

  return (
    <div style={{ backgroundColor: '#314054', padding: '10px' }}>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography style={{ color: '#e9f1f8' }} gutterBottom>
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography
              style={{ color: '#e9f1f8' }}
              key={i}
              gutterBottom
              vriant='subtitle1'
            >
              {c}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              varianr='contained'
              onClick={handleSubmit}
            >
              Post Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
