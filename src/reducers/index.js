import { combineReducers } from 'redux';
import authReducer from './auth.js';
import posts from './posts.js';

export default combineReducers({
  posts,
  authReducer,
});
