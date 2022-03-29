import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button, IconButton } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import InputIcon from '@mui/icons-material/Input';
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
  const handleSubmit = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(
      commentPost(finalComment, post.post._id)
    );
    setComment('');
    setComments(newComments);
  };

  const handleCommentPrint = (c) => {
    const id = c.indexOf(':');
    const username = c.substring(0, id);
    const comment = c.substring(id + 1);
    return (
      <Typography style={{ color: '#e9f1f8' }} gutterBottom vriant='subtitle1'>
        <span style={{ color: 'yellowgreen' }}>{username}</span>
        <span style={{ color: 'yellowgreen' }}>{` : `}</span>
        <span style={{ color: '', marginLeft: '10px' }}>{comment}</span>
      </Typography>
    );
  };

  return (
    <div
      style={{
        // backgroundColor: '#314054',
        padding: '10px',
        width: '100%',
        // background: 'rgba( 255, 255, 255, 0.2 )',
        backgroundColor: ' rgba(17, 25, 40, 0.5)',
        backdropFilter: 'blur(16px) saturate(180%)',
        boxShadow: '0 8px 32px 0 rgb(31 38 135 / 37%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ color: '#e9f1f8' }}>Comments goes here</h2>
      </div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments.length > 0 ? (
            comments?.map((c) => handleCommentPrint(c))
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2
                style={{
                  color: '#e9f1f8',
                  fontWeight: 'bold',
                  fontSize: '2em',
                  color: 'yellowgreen',
                }}
              >
                No Comments
              </h2>
            </div>
          )}
        </div>
        {user?.result?.name ? (
          <div
            style={{
              display: 'flex',
              alignContent: 'flex-start',
              marginBottom: '10px',
            }}
          >
            {' '}
            <TextField
              fullWidth
              label='comment'
              variant='outlined'
              multiline
              width='70%'
              placeholder='Type somthing to comment'
              value={comment}
              style={{
                border: '2px solid rgb(109, 99, 254)',
                borderRadius: '5px',
              }}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{
                margin: '5px 5px 5px 5px',
                width: '20%',
                backgroundColor: 'rgb(109, 99, 254)',
              }}
              fullWidth
              disabled={!comment}
              varianr='contained'
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Post Comment
            </Button>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 style={{ color: '#e9f1f8', fontSize: '1.2em' }}>
                Login to Comment{' '}
                <a href='/auth'>
                  <IconButton aria-label='delete'>
                    <InputIcon color='success' />
                  </IconButton>
                </a>
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
