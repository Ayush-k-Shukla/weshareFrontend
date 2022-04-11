import React, { useEffect, lazy, Suspense } from 'react';
import {
  Container,
  Paper,
  Image,
  CardMedia,
  CircularProgress,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import Tag from './Tag';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js';
import moment from 'moment';
import Loader from '../Loader/Loader';
import { likePost } from '../../api';

const CardRecommended = lazy(() => import('./CardRecommended'));
const CommentSection = lazy(() => import('./CommentSection'));
// import CardRecommended from './CardRecommended';
// import CommentSection from './CommentSection';

const PostIndividual = () => {
  const { post, isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(posts);
  const classes = useStyles();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));

  // var scrollLeft = element.scrollLeft;

  useEffect(() => {
    console.log('first');
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log('secon');
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.data?.tags.join(',') })
      );
    }
  }, [post]);

  if (isLoading) {
    return <Loader />;
  }
  if (!post) return null;

  const recommendedPosts = posts?.filter((pos) => pos._id !== post?._id);
  console.log(recommendedPosts);
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

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: '40px 140px' }}>
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
              color: '#F190B7',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Created by: {post.data.name}</Typography>
            <Typography>
              {moment(post.data.createdAt).format('MMM Do YY')}
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
            </div>
          </div>


          <CommentSection post={post.data} />

          <Divider
            style={{ margin: '20px 0', color: '#044ac5', color: 'white' }}
          />

          {recommendedPosts?.length && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {recommendedPosts.map((post) => (
                <CardRecommended post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostIndividual;
