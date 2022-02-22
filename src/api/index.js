import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

// * backend hosted at : https://sharewithmebac.herokuapp.com/

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (newPost, currentId) =>
  axios.patch(`/posts/${currentId}`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`, id);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
