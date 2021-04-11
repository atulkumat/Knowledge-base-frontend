import initialState from 'reducers/initialState.json';
import { UPDATE_BOOKMARK, UPDATE_BOOKMARK_ERROR } from 'actions/actionTypes';

const bookmarkReducer = (state = initialState.bookmark, action) => {
  switch (action.type) {
    case UPDATE_BOOKMARK:
      return {
        ...state,
        note: action.note,
      };
    case UPDATE_BOOKMARK_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
