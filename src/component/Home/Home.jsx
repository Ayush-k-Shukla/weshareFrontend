import { Button, Container, Grid, Grow, Paper } from '@material-ui/core';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

import ChipInput from 'material-ui-chip-input';
import { useLocation, useNavigate } from 'react-router-dom';

import Paginate from '../Pagination/Pagination';

const Posts = lazy(() => import('../Posts/Posts'));
const Form = lazy(() => import('../Form/Form'));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const page = query.get('page') || 1;

  const [search, setSearch] = useState('');
  const [tagSearch, settagSearch] = useState([]);

  const handleSearchKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleTagAdd = (tag) => settagSearch([...tagSearch, tag]);
  const handleTagDelete = (tag) =>
    settagSearch(tagSearch.filter((t) => t !== tag));

  const searchPost = () => {
    if (search.trim() || tagSearch) {
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
    <div style={{ padding: '40px 14px' }}>
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
            label='Search by Title'
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
            className={classes.searchClass}
            value={tagSearch}
            onAdd={handleTagAdd}
            placeholder='Search by tags...'
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
          color='primary'
          variant='contained'
          style={{
            backgroundColor: '#6d63fe',
            padding: '8px 40px',
            borderRadius: '10px',
            textTransform: 'none',
          }}
          endIcon={<SearchOutlinedIcon color='success' />}
        >
          Search
        </Button>
      </Container>
      <Grow in>
        <Container maxWidth='xl'>
          <Grid item xs={12} sm={6} md={12}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

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
