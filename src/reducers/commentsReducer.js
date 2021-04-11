import initialState from 'reducers/initialState.json';
import update from 'immutability-helper';
import {
  SET_REPLY, UPDATE_COMMENTS, UPDATE_COMMENTS_ERROR, UPDATE_REPLY_ERROR, UPDATE_REPLY_LOADER,
  ADD_ANSWER_TO_COMMENTS, CHANGE_COMMENT_STATUS, COMMENT_VOTE,
} from 'actions/actionTypes';

const commentsReducer = (state = initialState.comments, action) => {
  switch (action.type) {
    case UPDATE_COMMENTS:
      return {
        ...state,
        content: action.comments,
      };
    case UPDATE_COMMENTS_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    case SET_REPLY:
      return update(state, {
        content: {
          [action.index]: {
            replies: {
              $push: [action.reply],
            },
          },
        },
      });
    case UPDATE_REPLY_ERROR:
      return {
        ...state,
        replyErrors: action.errors,
      };
    case UPDATE_REPLY_LOADER:
      return {
        ...state,
        replyLoader: action.status,
      };
    case ADD_ANSWER_TO_COMMENTS:
      return update(state, {
        content: {
          $push: [action.answer],
        },
      });
    case CHANGE_COMMENT_STATUS:
      return update(state, {
        content: {
          [action.index]: { $set: action.data },
        },
      });
    case COMMENT_VOTE:
      return update(state, {
        content: {
          [action.index]: {
            status: { $set: action.status },
            upvotes: { $set: action.upvotes },
            downvotes: { $set: action.downvotes },
          },
        },
      });
    default:
      return state;
  }
};
export default commentsReducer;
