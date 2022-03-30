import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import FileBase from 'react-file-base64';

import useStyles from './styles';

import { useDispatch } from 'react-redux';
// * import middlrware to dispatch from action not from apis
import { updatePost } from '../../actions/posts.js';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const currentId = id;
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  //user stored in local
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    // console.log(`cid : ${currentId}`);

    if (post) setPostData(post);
    // console.log(postData);
  }, [post]);

  const handleSubmit = async (e) => {
    //if use prevent default "react-error-overlay": "6.0.9", this is rquired

    //this prevent default err need to be fixe
    e.preventDefault();
    console.log(postData);
    console.log(currentId);
    dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));

    navigate('/');
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
    <div style={{ marginTop: '40px', backgroundColor: 'none !important' }}>
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
          {currentId ? 'editing' : 'creating'} a blog
        </Typography>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
              name='title'
              variant='outlined'
              label='Title'
              maxRows={6}
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

          <div className={classes.fileInput}>
            <FileBase
              type='file'
              mutiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditForm;
