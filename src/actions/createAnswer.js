import { post } from 'services/api';
import { UPDATE_ANSWER_ERROR } from 'actions/actionTypes';
import { addAnswerToComments } from 'actions/commentsAction';
import { hideCommentsLoader, showCommentsLoader } from './apiFlagsAction';

export const setAnswerErrors = (errors) => ({
  type: UPDATE_ANSWER_ERROR,
  errors,
});

export const createAnswer = (route, values) => (dispatch) => {
  dispatch(showCommentsLoader());
  post(route, values)
    .then((res) => {
      dispatch(hideCommentsLoader());
      dispatch(addAnswerToComments(res.data));
      dispatch(setAnswerErrors(null));
    }).catch((err) => {
      dispatch(setAnswerErrors(err.response.data));
      dispatch(hideCommentsLoader());
    });
};
