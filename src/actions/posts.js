import * as api from '../api/index.js';
import { toast } from 'react-hot-toast';

//action creaters

// * always log error not error.message for debug easily

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });

    const { data } = await api.fetcPost(id);
    dispatch({ type: 'FETCH_ONE', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });

    const data = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    console.log(`query : ${JSON.stringify(searchQuery)}`);
    const data = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    //data = data.data;
    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`);
    dispatch({ type: 'CREATE', data });
    dispatch({ type: 'END_LOADING' });
    toast.success('Post created successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log(post);
    const { data } = await api.updatePost(post, id);
    console.log(data);
    dispatch({ type: 'UPDATE', payload: data });
    toast.success('Post updated successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: id });
    toast.success('Post deleted successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: 'LIKE', payload: data });
    toast.success('Post liked', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const commentPost = (finalComment, id) => async (dispatch) => {
  try {
    console.log(`${finalComment} ${id}`);
    const { data } = await api.commentPost(id, finalComment);

    console.log(data);
    dispatch({ type: 'COMMENT', payload: data });
    toast.success('Comment posted successfully', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
    return data.comments;
  } catch (error) {
    toast.err(`Comment can't be posted`, {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
    console.log(error);
  }
};
