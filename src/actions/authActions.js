import { LOG_IN, LOG_OUT } from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { post } from 'services/api';
import { removeItem } from 'services/browserStorage';
import { updateErrors } from 'actions/userActions';

export const logIn = (user) => ({
  type: LOG_IN,
  user,
});

export const logoutUser = () => ({
  type: LOG_OUT,
});

export const logOut = (history) => (dispatch) => {
  post(API_ROUTES.logout).then(() => {
    dispatch(logoutUser());
    removeItem('token');
    history.push('/home');
  }).catch((err) => {
    dispatch(updateErrors(err.response.data));
  });
};
