import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.js';

const Paginate = ({ page }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant='outlined'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts/page=${1}`} />
      )}
    />
  );
};

export default Paginate;
