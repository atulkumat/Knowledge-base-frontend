import { combineReducers } from 'redux';
import apiFlagsReducer from 'reducers/apiFlagsReducer';
import groupListReducer from 'reducers/groupListReducer';
import userReducer from 'reducers/userReducer';
import groupReducer from 'reducers/groupReducer';
import groupUserListReducer from 'reducers/groupUserListReducer';
import usersListReducer from 'reducers/usersListReducer';
import tagReducer from './tagReducer';
import postReducer from './postReducer';
import tagsSuggestionReducer from './tagsSuggestionReducer';
import postListReducer from './postListReducer';
import userDetailsReducer from './userDetailsReducer';
import tagListReducer from './tagListReducer';
import createTagReducer from './createTagReducer';
import commentsReducer from './commentsReducer';
import postDetailsReducer from './postDetailsReducer';
import answerReducer from './answerReducer';
import acceptAnswerReducer from './acceptAnswerReducer';
import bookmarkReducer from './bookmarkReducer';

const rootReducer = combineReducers({
  user: userReducer,
  groupsList: groupListReducer,
  flags: apiFlagsReducer,
  usersList: usersListReducer,
  groupUserList: groupUserListReducer,
  groupDetails: groupReducer,
  tags: tagReducer,
  post: postReducer,
  tagsSuggestion: tagsSuggestionReducer,
  postsList: postListReducer,
  userDetails: userDetailsReducer,
  createTag: createTagReducer,
  tagsList: tagListReducer,
  comments: commentsReducer,
  postDetails: postDetailsReducer,
  answer: answerReducer,
  acceptAnswer: acceptAnswerReducer,
  bookmark: bookmarkReducer,
});

export default rootReducer;
