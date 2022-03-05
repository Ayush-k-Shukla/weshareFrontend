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
      {/* <div> */}
      <Container className={classes.appBarSearch}>
        <Container
          style={{
            display: 'flex',
            color: 'white',
            padding: '0',
          }}
        >
          <input
            name='search'
            label='Search Title'
            onKeyPress={handleSearchKeyPress}
            value={search}
            placeholder='Search title....'
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginRight: '8px',
              outline: 'none',
              border: 'none',
              backgroundColor: '#2a292e',
              color: 'white',
              borderRadius: '10px',
              padding: '8px 10px',
            }}
            fullWidth
          />
          <ChipInput
            value={tagSearch}
            onAdd={handleTagAdd}
            placeholder='Search tags...'
            onDelete={handleTagDelete}
            disableUnderline={true}
            style={{
              marginRight: '8px',
              outline: 'none !important',
              border: 'none !important',
              backgroundColor: '#2a292e',
              color: 'white !important',
              borderRadius: '10px',
              padding: '8px 10px !important',
            }}
            fullWidth
          />
        </Container>

        <Button
          onClick={searchPost}
          // className={classes.searchButton}
          color='primary'
          variant='contained'
          style={{
            backgroundColor: '#6d63fe',
            padding: '8px 40px',
            borderRadius: '10px',
            textTransform: 'none',
          }}
        >
          Search
        </Button>
      </Container>
      {/* </div> */}
      <Grow in>
        <Container maxWidth='xl'>
          <Grid item xs={12} sm={6} md={12}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* </Grid> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              float: 'center',
            }}
          >
            <Paper
              elevation={5}
              style={{
                marginBottom: '20px',
                backgroundColor: '#101228',
              }}
              className={classes.pagination}
            >
              <Paginate page={page} />
            </Paper>
          </div>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
