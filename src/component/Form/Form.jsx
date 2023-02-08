import {
  Button, Container, Paper, TextField, Typography
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';

import useStyles from './styles';

import { useDispatch } from 'react-redux';
// * import middlrware to dispatch from action not from apis
import { createPost } from '../../actions/posts';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const { isLoading } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const [file, setFile] = useState(undefined);
  const uploadRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const uploadFile = (e) => {
    let files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    //if use prevent default "react-error-overlay": "6.0.9", this is rquired

    //this prevent default err need to be fixe
    e.preventDefault();
    // dispatch(uploadFileToCloudinary(file));

    dispatch(
      createPost({ ...postData, name: user?.result?.name }, navigate, file)
    );
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please <Link to='/auth'>signin</Link> in to create post and like
          others post
        </Typography>
      </Paper>
    );
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <Container className={classes.paper} elevation={6}>
        <Typography
          variant='h5'
          style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          width='100%'
        >
          {currentId ? 'Editing' : 'Creating'} a Post
        </Typography>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <TextField
              name='title'
              variant='outlined'
              label='Title'
              maxRows={4}
              style={{ color: 'black !important' }}
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <TextField
              name='tags'
              variant='outlined'
              label='tags'
              placeholder='enter comment seprated by comma'
              value={postData?.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(',') })
              }
            />
          </div>
          <TextField
            name='message'
            variant='outlined'
            label='Message'
            fullWidth
            multiline
            rows={12}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <div
            className={classes.fileInput}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <input
              ref={uploadRef}
              accept='image/*'
              type='file'
              name='file'
              onChange={uploadFile}
              multiple={false}
            />
            <Button
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
              style={{ width: '20%' }}
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Form;
