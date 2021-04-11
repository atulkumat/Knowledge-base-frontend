import initialState from 'reducers/initialState.json';
import { UPDATE_ANSWER_ERROR } from 'actions/actionTypes';

const answerReducer = (state = initialState.answer, action) => {
  switch (action.type) {
    case UPDATE_ANSWER_ERROR:
      return action.errors;
    default:
      return state;
  }
};

export default answerReducer;
