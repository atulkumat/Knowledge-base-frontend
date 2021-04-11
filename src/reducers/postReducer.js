import initialState from 'reducers/initialState.json';
import { REMOVE_POST, SET_POST, UPDATE_POST_ERROR } from 'actions/actionTypes';

const postReducer = (state = initialState.post, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        value: action.post,
      };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    case REMOVE_POST:
      return {
        ...state,
        value: action.post,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default postReducer;
