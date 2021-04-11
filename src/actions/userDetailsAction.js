import API_ROUTES from 'constants/api/apiRoutes';
import { get } from 'services/api';
import { SET_USER_DETAILS, SET_USER_DETAILS_ERRORS } from './actionTypes';
import { hideLoader, showLoader } from './apiFlagsAction';

export const setUserDetails = (user, id) => ({
  type: SET_USER_DETAILS,
  user,
  id,
});

export const setUserDetailsErrors = (errors) => ({
  type: SET_USER_DETAILS_ERRORS,
  errors,
});

export const getUserDetails = (id) => (dispatch) => {
  dispatch(showLoader());
  get(`${API_ROUTES.user}/${id}`).then((res) => {
    dispatch(hideLoader());
    dispatch(setUserDetailsErrors(null));
    dispatch(setUserDetails(res.data, id));
  }).catch((err) => {
    dispatch(hideLoader());
    dispatch(setUserDetailsErrors(err.response.data));
  });
};
