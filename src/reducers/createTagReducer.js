import initialState from 'reducers/initialState.json';
import { UPDATE_CREATE_TAG, UPDATE_CREATE_TAG_ERROR } from 'actions/actionTypes';

const createTagReducer = (state = initialState.createTag, action) => {
  switch (action.type) {
    case UPDATE_CREATE_TAG:
      return {
        ...state,
        tag: action.tag,
      };
    case UPDATE_CREATE_TAG_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default createTagReducer;
