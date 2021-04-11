import initialState from 'reducers/initialState.json';
import update from 'immutability-helper';
import { SET_USER_DETAILS, SET_USER_DETAILS_ERRORS } from 'actions/actionTypes';

const userDetailsReducer = (state = initialState.userDetails, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return update(state, {
        users: {
          [action.id]: { $set: action.user },
        },
      });
    case SET_USER_DETAILS_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};
export default userDetailsReducer;
