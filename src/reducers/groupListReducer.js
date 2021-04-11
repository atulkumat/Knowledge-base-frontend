import initialState from 'reducers/initialState.json';
import { UPDATE_GROUPS_LIST, UPDATE_LENGTH, UPDATE_GROUPLIST_ERROR } from 'actions/actionTypes';

const groupListReducer = (state = initialState.groupsList, action) => {
  switch (action.type) {
    case UPDATE_GROUPS_LIST:
      return {
        ...state,
        groups: action.groups,
      };
    case UPDATE_LENGTH:
      return {
        ...state,
        length: action.length,
      };
    case UPDATE_GROUPLIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default groupListReducer;
