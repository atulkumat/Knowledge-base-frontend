import update from 'immutability-helper';
import {
  UPDATE_GROUP_USER_LIST, UPDATE_GROUP_USERLIST_ERROR, UPDATE_MEMBER_ROLE,
} from 'actions/actionTypes';
import initialState from 'reducers/initialState.json';

const groupUserListReducer = (state = initialState.groupUserList, action) => {
  switch (action.type) {
    case UPDATE_GROUP_USER_LIST:
      return {
        ...state,
        users: action.users,
      };
    case UPDATE_GROUP_USERLIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    case UPDATE_MEMBER_ROLE:
      return update(state, {
        users: {
          [action.index]: { $set: action.user },
        },
      });
    default:
      return state;
  }
};

export default groupUserListReducer;
