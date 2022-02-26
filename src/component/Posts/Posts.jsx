import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';

import { Grid, LinearProgress, Box, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const classes = useStyles();
  return !posts.length ? (
    <>
      <Box sx={{ width: '100%', marginTop: '20%', justifyContent: 'center' }}>
        <LinearProgress color='secondary' />
      </Box>
    </>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post?._id} xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
