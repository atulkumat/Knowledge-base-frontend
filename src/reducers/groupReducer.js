import initialState from 'reducers/initialState.json';
import update from 'immutability-helper';
import { SET_GROUP, UPDATE_GROUP_ERRORS } from 'actions/actionTypes';

const groupReducer = (state = initialState.groupDetails, action) => {
  switch (action.type) {
    case SET_GROUP:
      return update(state, {
        groups: {
          [action.id]: { $set: action.group },
        },
      });
    case UPDATE_GROUP_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};
export default groupReducer;
