import { post } from 'services/api';
import { ACCEPT_ANSWER_ERROR } from './actionTypes';
import { changeCommentStatus } from './commentsAction';

export const setAcceptAnswerError = (errors) => ({
  type: ACCEPT_ANSWER_ERROR,
  errors,
});

const acceptAnswer = (route, index) => (dispatch) => {
  post(route)
    .then((res) => {
      dispatch(changeCommentStatus(index, res.data));
    }).catch((err) => {
      dispatch(setAcceptAnswerError(err.response.data.error));
    });
};

export default acceptAnswer;
