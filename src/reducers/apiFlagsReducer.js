import initialState from 'reducers/initialState.json';
import {
  UPDATE_BUTTON_LOADER, UPDATE_COMMENTS_LOADER, UPDATE_LOADER, UPDATE_ERRORS,
} from 'actions/actionTypes';

const apiFlagsReducer = (state = initialState.flags, action) => {
  switch (action.type) {
    case UPDATE_LOADER:
      return {
        ...state,
        loading: action.loading,
      };
    case UPDATE_BUTTON_LOADER:
      return {
        ...state,
        button: action.button,
      };
    case UPDATE_COMMENTS_LOADER:
      return {
        ...state,
        commentsLoader: action.loading,
      };
    case UPDATE_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default apiFlagsReducer;
