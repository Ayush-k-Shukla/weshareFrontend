import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

// * backend hosted at : https://sharewithmebac.herokuapp.com/
//send data to backend if user is logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (newPost, currentId) =>
  axios.patch(`/posts/${currentId}`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`, id);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
