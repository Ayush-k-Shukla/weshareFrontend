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
      <div className={classes.overlay}>
        <Typography variant='h6'>{post?.name}</Typography>
        {/* here created at time relative to server fix rwmainint */}
        <Typography variant='body2'>
          {moment(post?.createdAt).fromNow()}
        </Typography>
      </div>
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
          >
            {/* <MoreHorizIcon fontSize='default' /> */}
          </Button>
        </div>
      )}
      <div onClick={openPost} style={{ cursor: 'pointer' }}>
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
        {/* <CardContent>
          <Typography
            className={classes.title}
            variant='body2'
            color='textSecondary'
            component='p'
            style={{ color: '#f9f8f8' }}
          >
            {post.message.length > 50
              ? `${post.message.substring(0, 70)}...`
              : post.message}
          </Typography>
        </CardContent> */}
      </div>

      {/* </ButtonBase> */}
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
