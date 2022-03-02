import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Image,
  CardMedia,
  CircularProgress,
  Typography,
  Divider,
} from '@material-ui/core';
import Tag from './Tag';
import second from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import useStyles from './styles.js';
import moment from 'moment';

const PostIndividual = () => {
  const { post, isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(`indi: ${JSON.stringify(post)}`);
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
    }
  }, [post]);
  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  return (
    <div>
      <div>
        <Typography variant='h3' component='h2' style={{ color: '#91b2e0' }}>
          {post.data.title}
        </Typography>
      </div>
      <div className={classes.imageSection}>
        <img
          className={classes.media}
          src={
            post.data.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          alt={post.title}
        />
      </div>
      <div
        style={{
          color: '#91b2e0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {' '}
        <Typography variant='h6'>Created by: {post.data.name}</Typography>
        <Typography variant='body1'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
            style={{ display: 'flex', justifyContent: 'start' }}
          >
            {post?.data?.tags?.map((tag) => (
              <Tag value={tag} />
            ))}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography
            gutterBottom
            variant='body1'
            component='p'
            style={{
              fontWeight: 'font-weight: 600',
              color: '#ffffff',
            }}
          >
            {post.data.message}
          </Typography>

          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
    </div>
  );
};

export default PostIndividual;
