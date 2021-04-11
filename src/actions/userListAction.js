import {
  UPDATE_USER_LIST, UPDATE_USERLIST_ERROR, SET_USER_SUGGESTIONS,
  UPDATE_USERLIST_LENGTH,
} from 'actions/actionTypes';

import API_ROUTES from 'constants/api/apiRoutes';
import { get } from 'services/api';
import { hideLoader, showLoader } from 'actions/apiFlagsAction';

export const setSuggestions = (users) => ({
  type: SET_USER_SUGGESTIONS,
  users,
});

export const updateUserList = (users) => ({
  type: UPDATE_USER_LIST,
  users,
});

export const updateUserListErrors = (errors) => ({
  type: UPDATE_USERLIST_ERROR,
  errors,
});

export const updateUserListLength = (length) => ({
  type: UPDATE_USERLIST_LENGTH,
  length,
});

export const getUserSuggestionsForGroup = (inputText, id) => (dispatch) => {
  get(`${API_ROUTES.groups}/${id}/user-suggestions?name=${inputText}`)
    .then((res) => {
      dispatch(updateUserListErrors(null));
      dispatch(setSuggestions(res.data));
    }).catch((err) => {
      dispatch(updateUserListErrors(err.response.data));
    });
};

export const getUsersList = (pageNo, name) => (dispatch) => {
  dispatch(showLoader());
  get(`${API_ROUTES.users}?per_page=12&page_no=${pageNo}&name=${name}`)
    .then((res) => {
      dispatch(hideLoader());
      dispatch(updateUserListLength(res.data.length));
      dispatch(updateUserList(res.data.users));
    }).catch((err) => {
      dispatch(hideLoader());
      dispatch(updateUserListErrors(err.response.data));
    });
};

export const getSuggestions = (inputText) => (dispatch) => {
  get(`${API_ROUTES.users}?name=${inputText}`).then((res) => {
    dispatch(updateUserListErrors(null));
    dispatch(setSuggestions(res.data.users));
  }).catch((err) => {
    dispatch(updateUserListErrors(err.response.data));
  });
};
