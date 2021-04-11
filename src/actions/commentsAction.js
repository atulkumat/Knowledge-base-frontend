import { get, post } from 'services/api';
import {
  ADD_ANSWER_TO_COMMENTS, CHANGE_COMMENT_STATUS,
  SET_REPLY, UPDATE_COMMENTS, UPDATE_COMMENTS_ERROR, UPDATE_REPLY_ERROR, UPDATE_REPLY_LOADER,
  COMMENT_VOTE,
} from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { hideCommentsLoader, showCommentsLoader } from './apiFlagsAction';

export const updateComments = (comments) => ({
  type: UPDATE_COMMENTS,
  comments,
});

export const changeCommentStatus = (index, data) => ({
  type: CHANGE_COMMENT_STATUS,
  index,
  data,
});

export const setCommentsErrors = (errors) => ({
  type: UPDATE_COMMENTS_ERROR,
  errors,
});

export const setReply = (index, reply) => ({
  type: SET_REPLY,
  index,
  reply,
});

export const updateReplyLoader = (status) => ({
  type: UPDATE_REPLY_LOADER,
  status,
});

export const updateReplyErrors = (errors) => ({
  type: UPDATE_REPLY_ERROR,
  errors,
});

export const addAnswerToComments = (answer) => ({
  type: ADD_ANSWER_TO_COMMENTS,
  answer,
});

export const updateCommentVote = (index, status, upvotes, downvotes) => ({
  type: COMMENT_VOTE,
  index,
  status,
  upvotes,
  downvotes,
});

export const getComments = (route) => (dispatch) => {
  dispatch(showCommentsLoader());
  get(route)
    .then((res) => {
      dispatch(hideCommentsLoader());
      dispatch(updateComments(res.data));
      dispatch(setCommentsErrors(null));
    }).catch((err) => {
      dispatch(hideCommentsLoader());
      dispatch(setCommentsErrors(err.response.data));
    });
};

export const addReplyToComment = (content, commentId, index) => (dispatch) => {
  dispatch(updateReplyLoader(true));
  post(`${API_ROUTES.comment}/${commentId}/reply`, { content }).then((res) => {
    dispatch(updateReplyLoader(false));
    dispatch(updateReplyErrors(null));
    dispatch(setReply(index, res.data));
  }).catch((err) => {
    dispatch(updateReplyLoader(false));
    dispatch(updateReplyErrors(err.response.data));
  });
};

export const commentVote = (commentId, index, upvotes, downvotes, status) => (dispatch) => {
  post(`${API_ROUTES.comment}/${commentId}/${status}`).then((res) => {
    dispatch(updateCommentVote(index, res.data.status, upvotes, downvotes));
  });
};
