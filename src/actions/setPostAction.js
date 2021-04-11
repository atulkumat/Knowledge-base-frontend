import { REMOVE_POST, SET_POST, UPDATE_POST_ERROR } from 'actions/actionTypes';

export const setPostErrors = (errors) => ({
  type: UPDATE_POST_ERROR,
  errors,
});

export const removePostErrors = () => ({
  type: UPDATE_POST_ERROR,
  errors: null,
});

export const removePost = () => ({
  type: REMOVE_POST,
  post: null,
  errors: null,
});

const setPost = (post) => ({
  type: SET_POST,
  post,
});

export default setPost;
