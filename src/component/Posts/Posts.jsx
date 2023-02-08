import React, { lazy, Suspense } from 'react';
import useStyles from './styles';

import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
const Post = lazy(() => import('./Post/Post'));

const Posts = ({ setCurrentId }) => {
  const data = useSelector((state) => state.posts);
  const posts = data.posts;
  const isLoading = data.isLoading;
  const classes = useStyles();
  if (!isLoading && !posts?.length)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'whitesmoke',
        }}
      >
        ! No Posts !
      </div>
    );

  return (
    <Suspense fallback={<Loader />}>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems='stretch'
          spacing={3}
        >
          {posts.map((post) => (
            <Grid item key={post?._id} xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </Suspense>
  );
};

export default Posts;
