import * as api from '../api/index.js';

//action creaters

// * always log error not error.message for debug easily

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', data });
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = (post, id) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(post, id);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (e) {
    console.log(e);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: 'LIKE', payload: data });
  } catch (e) {
    console.log(e);
  }
};
