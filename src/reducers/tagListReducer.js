import initialState from 'reducers/initialState.json';
import { UPDATE_TAGS_LIST, UPDATE_LENGTH, UPDATE_TAGLIST_ERROR } from 'actions/actionTypes';

const tagListReducer = (state = initialState.tagsList, action) => {
  switch (action.type) {
    case UPDATE_TAGS_LIST:
      return {
        ...state,
        tags: action.tags,
      };
    case UPDATE_LENGTH:
      return {
        ...state,
        length: action.length,
      };
    case UPDATE_TAGLIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default tagListReducer;
