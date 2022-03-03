import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Image,
  CardMedia,
  CircularProgress,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import Tag from './Tag';
import second from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js';
import moment from 'moment';
import CardRecommended from './CardRecommended';

const PostIndividual = () => {
  const { post, isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(`indi: ${JSON.stringify(post)}`);
  const classes = useStyles();
  const { id } = useParams();

  // var scrollLeft = element.scrollLeft;

  useEffect(() => {
    console.log(id);
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log(post);
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.data?.tags.join(',') })
      );
    }
  }, [post]);
  //use post.data

  if (!post) return null;

  if (isLoading) {
    return (
      // <Paper variant='' elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em' />
      // </Paper>
    );
  }

  const recommendedPosts = posts.filter((pos) => pos._id !== post?.data._id);

  const scroll = (scrollOffset) => {
    this.refs.current.scrollLeft += scrollOffset;
  };

  return (
    <div>
      <div>
        <div>
          <Typography
            variant='h3'
            component='h2'
            style={{ color: 'antiquewhite' }}
          >
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
                color: '#d5d5d5',
              }}
            >
              {post.data.message}
            </Typography>

            <Divider style={{ margin: '20px 0' }} />
          </div>
        </div>
      </div>
      {recommendedPosts.length && (
        <div
          style={{
            display: 'flex',

            justifyContent: 'space-between',
            alignSelf: 'flex-start',
          }}
        >
          {/* <Button onClick={() => scroll(-20)}>LEFT</Button> */}
          {recommendedPosts.map((post) => (
            <CardRecommended post={post} />
          ))}
          {/* <Button onClick={() => scroll(20)}>RIGHT</Button> */}
        </div>
      )}
    </div>
  );
};

export default PostIndividual;
