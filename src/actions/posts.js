import { toast } from 'react-hot-toast';
import * as api from '../api/index.js';

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

    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const data = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate, file) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    let selectedFile = '';
    if (file) {
      selectedFile = await uploadFileToCloudinary(file);
    }
    if (selectedFile) {
      post = { ...post, selectedFile: selectedFile };
    }

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

export const uploadFileToCloudinary = async (file) => {
  try {
    const { data } = await api.uploadFileToCloudinary(file);
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(post, id);

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
    const { data } = await api.commentPost(id, finalComment);

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
