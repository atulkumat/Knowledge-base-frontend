import initialState from 'reducers/initialState.json';
import { CHANGE_MENU } from 'actions/actionTypes';

const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case CHANGE_MENU:
      return action.menu;
    default:
      return state;
  }
};

export default menuReducer;
