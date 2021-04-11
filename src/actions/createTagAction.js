import { post } from 'services/api';
import { UPDATE_CREATE_TAG, UPDATE_CREATE_TAG_ERROR } from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { ButtonLoader } from './apiFlagsAction';

export const setCreateTag = (tag) => ({
  type: UPDATE_CREATE_TAG,
  tag,
});

export const setCreateTagErrors = (errors) => ({
  type: UPDATE_CREATE_TAG_ERROR,
  errors,
});

export const createTagAction = (values) => (dispatch) => {
  dispatch(ButtonLoader(true));
  post(API_ROUTES.tags, values)
    .then((res) => {
      dispatch(setCreateTag(res.data));
      dispatch(ButtonLoader(false));
      dispatch(setCreateTagErrors(null));
    }).catch((err) => {
      dispatch(ButtonLoader(false));
      dispatch(setCreateTagErrors(err.response.data));
    });
};

export default createTagAction;
