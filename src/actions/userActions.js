import { UPDATE_ERRORS, UPDATE_USER } from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { HOME } from 'constants/routePath';
import { get, patch } from 'services/api';
import { hideLoader, showLoader } from './apiFlagsAction';

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const getCurrentUser = () => (dispatch) => {
  dispatch(showLoader());
  get(API_ROUTES.user).then((res) => {
    dispatch(hideLoader());
    dispatch(updateUser(res.data));
  });
};

export const updateErrors = (errors) => ({
  type: UPDATE_ERRORS,
  errors,
});

export const updateUserDetails = (values, history) => (dispatch) => {
  dispatch(showLoader());
  patch(API_ROUTES.updateUser, values).then((res) => {
    dispatch(hideLoader());
    dispatch(updateErrors(null));
    dispatch(updateUser(res.data));
    history.push(HOME);
  }).catch((err) => {
    dispatch(hideLoader());
    dispatch(updateErrors(err.response.data));
  });
};
