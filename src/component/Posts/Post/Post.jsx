import React from 'react';
import useStyles from './styles';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditRoadTwoToneIcon from '@mui/icons-material/EditRoadTwoTone';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts.js';
import { useDispatch } from 'react-redux';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useNavigate } from 'react-router-dom';

import Tag from '../../PostIndividual/Tag';

const Post = ({ post, setCurrentId }) => {
  // console.log(`id : ${post._id}`);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const editPost = () => {
    navigate(`/posts/edit/${post._id}`);
  };

  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
      style={{ backgroundColor: '#111229' }}
    >
      <CardMedia
        className={classes.media}
        image={post?.selectedFile}
        title={post?.title}
      />

      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white' }}
            size='small'
            onClick={() => {
              editPost();
            }}
            title='Edit Post'
            endIcon={<EditRoadTwoToneIcon sx={{ fontSize: 40 }} />}
          ></Button>
        </div>
      )}
      <div onClick={openPost} style={{ cursor: 'pointer', margin: '10px' }}>
        <div className={classes.overlay}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <PersonOutlineIcon color='secondary' cursor='default' />{' '}
            <Typography style={{ marginLeft: '5px', marginRight: '5px' }}>
              {post?.name}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <CalendarMonthIcon color='secondary' />{' '}
            <Typography style={{ marginLeft: '5px' }}>
              {moment(post?.createdAt).format('MMM Do YY')}
            </Typography>
          </div>
        </div>

        <div
          className={classes.details}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          {post?.tags?.map((tag) => (
            <Tag value={tag} />
          ))}
        </div>
        <Typography
          className={classes.title}
          variant='h5'
          gutterBottom
          style={{ color: '#f9f8f8' }}
        >
          {post && post.title}
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          style={{ color: '#044ac5' }}
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          title='Like Post'
        >
          <Likes />
        </Button>
        <Button
          size='small'
          style={{
            backgroundColor: 'rgb(229, 197, 88)',
            borderRadius: '10px',
            margin: '5px',
            padding: '5px 5px 5px 10px',
          }}
          onClick={() => {
            dispatch(openPost);
          }}
          title='Open Post'
        >
          Read more
          <KeyboardArrowRightIcon />
        </Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='primary'
            style={{ color: '#044ac5' }}
            onClick={() => dispatch(deletePost(post._id))}
            title='Delete Post'
          >
            <DeleteIcon fontSize='small' />
            &nbsp; DELETE &nbsp;
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
