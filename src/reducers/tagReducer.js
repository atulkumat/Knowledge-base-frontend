import initialState from 'reducers/initialState.json';
import { SET_TAGS } from 'actions/actionTypes';

const tagReducer = (state = initialState.tags, action) => {
  switch (action.type) {
    case SET_TAGS:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};

export default tagReducer;
