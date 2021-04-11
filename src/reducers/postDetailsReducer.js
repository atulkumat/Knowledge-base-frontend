import update from 'immutability-helper';
import initialState from 'reducers/initialState.json';
import {
  POST_DETAILS, UPDATE_POSTDETAILS_ERROR, REMOVE_POST_DETAILS, UPDATE_POST_VOTE,
} from 'actions/actionTypes';

const postDetailsReducer = (state = initialState.postDetails, action) => {
  switch (action.type) {
    case POST_DETAILS:
      return {
        ...state,
        post: action.post,
      };
    case UPDATE_POSTDETAILS_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    case REMOVE_POST_DETAILS:
      return {
        ...state,
        post: action.post,
      };
    case UPDATE_POST_VOTE:
      return update(state, {
        post: {
          vote_status: { $set: action.status },
          upvotes: { $set: action.upvotes },
          downvotes: { $set: action.downvotes },
        },
      });
    default:
      return state;
  }
};

export default postDetailsReducer;
