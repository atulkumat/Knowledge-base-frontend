import { get } from 'services/api';
import { POST_DETAILS, REMOVE_POST_DETAILS, UPDATE_POSTDETAILS_ERROR } from 'actions/actionTypes';
import { hideLoader, showLoader } from './apiFlagsAction';
import { setBookmark } from './bookmarkAction';

export const updatePostDetails = (post) => ({
  type: POST_DETAILS,
  post,
});

export const setErrors = (errors) => ({
  type: UPDATE_POSTDETAILS_ERROR,
  errors,
});

export const removePostDetails = () => ({
  type: REMOVE_POST_DETAILS,
  post: [],
});

export const getPostDetails = (route) => (dispatch) => {
  dispatch(showLoader());
  get(route)
    .then((res) => {
      dispatch(hideLoader());
      dispatch(setBookmark(res.data.bookmark));
      dispatch(updatePostDetails(res.data));
      dispatch(setErrors(null));
    }).catch((err) => {
      dispatch(hideLoader());
      dispatch(setErrors(err.response.data));
    });
};
