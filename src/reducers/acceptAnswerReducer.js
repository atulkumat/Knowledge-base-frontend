import initialState from 'reducers/initialState.json';
import { ACCEPT_ANSWER_ERROR } from 'actions/actionTypes';

const acceptAnswerReducer = (state = initialState.acceptAnswerError, action) => {
  switch (action.type) {
    case ACCEPT_ANSWER_ERROR:
      return action.errors;
    default:
      return state;
  }
};

export default acceptAnswerReducer;
