import React, { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import {
  Paper,
  Container,
  Grow,
  Grid,
  AppBar,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';

import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Paginate from '../Pagination/Pagination';
import { TextField } from '@mui/material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [search, setSearch] = useState('');
  const [tagSearch, settagSearch] = useState([]);

  const handleSearchKeyPress = (e) => {
    //enter key press
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleTagAdd = (tag) => settagSearch([...tagSearch, tag]);
  const handleTagDelete = (tag) =>
    settagSearch(tagSearch.filter((t) => t !== tag));

  const searchPost = () => {
    if (search.trim() || tagSearch) {
      //fetch post by search
      dispatch(getPostsBySearch({ search, tags: tagSearch.join(',') }));
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tagSearch.join(
          ','
        )}`
      );
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Grow in>
        <Container maxWidth='xl'>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position='static'
                color='inherit'
              >
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Title'
                  fullWidth
                  onKeyPress={handleSearchKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: '10px 0px' }}
                  value={tagSearch}
                  onAdd={handleTagAdd}
                  onDelete={handleTagDelete}
                  label='Search Tags'
                  variant='outlined'
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color='primary'
                  variant='contained'
                >
                  Search
                </Button>
              </AppBar>

              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper
                elevation={5}
                style={{ marginTop: '2px' }}
                className={classes.pagination}
              >
                <Paginate page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
