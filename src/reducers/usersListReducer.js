import { SET_USER_SUGGESTIONS, UPDATE_USERLIST_LENGTH, UPDATE_USER_LIST } from 'actions/actionTypes';

import initialState from 'reducers/initialState.json';

const usersListReducer = (state = initialState.usersList, action) => {
  switch (action.type) {
    case SET_USER_SUGGESTIONS:
      return {
        ...state,
        users: action.users,
      };
    case UPDATE_USER_LIST:
      return {
        ...state,
        users: action.users,
      };
    case UPDATE_USERLIST_LENGTH:
      return {
        ...state,
        length: action.length,
      };
    default:
      return state;
  }
};

export default usersListReducer;
