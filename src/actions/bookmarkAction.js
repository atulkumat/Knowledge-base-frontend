import { deleteApi, get, post } from 'services/api';
import { UPDATE_BOOKMARK_ERROR, UPDATE_BOOKMARK } from 'actions/actionTypes';

export const setBookmarkErrors = (errors) => ({
  type: UPDATE_BOOKMARK_ERROR,
  errors,
});

export const setBookmark = (note) => ({
  type: UPDATE_BOOKMARK,
  note,
});

export const createBookmark = (route, values) => (dispatch) => {
  post(route, values)
    .then((res) => {
      dispatch(setBookmark(res.data));
      dispatch(setBookmarkErrors(null));
    }).catch((err) => {
      dispatch(setBookmarkErrors(err.response.data));
    });
};

export const removeBookmark = (route) => (dispatch) => {
  deleteApi(route)
    .then(() => {
      dispatch(setBookmark(null));
      dispatch(setBookmarkErrors(null));
    }).catch((err) => {
      dispatch(setBookmarkErrors(err.response.data));
    });
};

export const getBookmark = (route) => (dispatch) => {
  get(route)
    .then((res) => {
      dispatch(setBookmark(res.data));
      dispatch(setBookmarkErrors(null));
    }).catch((err) => {
      dispatch(setBookmarkErrors(err.response.data));
    });
};
