import axios from 'axios';
const url = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (newPost, currentId) =>
  axios.patch(`${url}/${currentId}`, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`, id);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
