import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Fab,
} from '@material-ui/core';

import FileBase from 'react-file-base64';
import SendIcon from '@mui/icons-material/Send';

import useStyles from './styles';

import { useDispatch } from 'react-redux';
// * import middlrware to dispatch from action not from apis
import { createPost } from '../../actions/posts';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';

import './Editor.css';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  //user stored in local
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
    // console.log(postData);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [post]);
  const getFileBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  const uploadFile = async (file) => {
    return new Promise((resolve, reject) =>
      getFileBase64(file, (data) => resolve({ data: { link: data } }))
    );
  };

  const handleSubmit = async (e) => {
    //this prevent default err need to be fixe
    e.preventDefault();
    postData.message = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    console.log(postData);
    //!commented for test purpose
    dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
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
          {/* <TextField
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
          /> */}
          {/* //editor adding */}
          <Editor
            editorState={editorState}
            wrapperClassName='editor-wrapper'
            editorClassName='editor'
            toolbarClassName='editor-toolbar'
            toolbar={{
              fontFamily: {
                options: [
                  'Poppins',
                  'Nunito',
                  'Georgia',
                  'Times New Roman',
                  'Verdana',
                ],
              },
              image: {
                uploadEnabled: true,
                uploadCallback: uploadFile,
                previewImage: true,
                defaultSize: {
                  height: '100%',
                  width: '100%',
                },
              },
            }}
            onEditorStateChange={(editorState) => setEditorState(editorState)}
          ></Editor>
          <div
            className={classes.fileInput}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Fab
              color='secondary'
              size='small'
              component='span'
              aria-label='add'
              variant='extended'
            >
              <FileBase
                type='file'
                mutiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </Fab>
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
