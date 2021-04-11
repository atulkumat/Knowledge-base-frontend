import { get } from 'services/api';
import PER_PAGE from 'constants/pagination';
import { UPDATE_GROUPS_LIST, UPDATE_LENGTH, UPDATE_GROUPLIST_ERROR } from 'actions/actionTypes';

import { hideLoader, showLoader } from './apiFlagsAction';

export const updateGroupsList = (groups) => ({
  type: UPDATE_GROUPS_LIST,
  groups,
});

export const updateLength = (length) => ({
  type: UPDATE_LENGTH,
  length,
});

export const setErrors = (errors) => ({
  type: UPDATE_GROUPLIST_ERROR,
  errors,
});

export const getGroupsList = (route, pageNo, name) => (dispatch) => {
  dispatch(showLoader());
  get(`${route}?per_page=${PER_PAGE}&page_no=${pageNo}&name=${name}`)
    .then((res) => {
      dispatch(updateLength(res.data.length));
      dispatch(hideLoader());
      dispatch(setErrors(null));
      dispatch(updateGroupsList(res.data.groups));
    }).catch((err) => {
      dispatch(hideLoader());
      dispatch(setErrors(err.response.data));
    });
};
