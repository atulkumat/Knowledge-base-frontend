import initialState from 'reducers/initialState.json';
import { UPDATE_POSTS_LIST, UPDATE_LENGTH, UPDATE_POSTLIST_ERROR } from 'actions/actionTypes';

const postListReducer = (state = initialState.postsList, action) => {
  switch (action.type) {
    case UPDATE_POSTS_LIST:
      return {
        ...state,
        posts: action.posts,
      };
    case UPDATE_LENGTH:
      return {
        ...state,
        length: action.length,
      };
    case UPDATE_POSTLIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default postListReducer;
