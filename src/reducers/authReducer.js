import initialState from 'reducers/initialState.json';
import { LOG_IN, LOG_OUT } from 'actions/actionTypes';

const authReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.user;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};
export default authReducer;
