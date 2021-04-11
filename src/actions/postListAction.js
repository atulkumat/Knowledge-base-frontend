import { get } from 'services/api';
import PER_PAGE from 'constants/pagination';
import { UPDATE_POSTS_LIST, UPDATE_LENGTH, UPDATE_POSTLIST_ERROR } from 'actions/actionTypes';
import { hideLoader, showLoader } from './apiFlagsAction';

export const updatePostsList = (posts) => ({
  type: UPDATE_POSTS_LIST,
  posts,
});

export const updateLength = (length) => ({
  type: UPDATE_LENGTH,
  length,
});

export const updatePostListErrors = (errors) => ({
  type: UPDATE_POSTLIST_ERROR,
  errors,
});

export const getPostsList = (route, pageNo, sort, name, tag) => (dispatch) => {
  dispatch(showLoader());
  return get(`${route}?per_page=${PER_PAGE}&page_no=${pageNo}&sort=${sort}&title=${name}&tag=${tag}`)
    .then((res) => {
      if (res.data.length !== 0) {
        dispatch(updateLength(res.data[0].length));
      }
      dispatch(hideLoader());
      dispatch(updatePostListErrors(null));
      dispatch(updatePostsList(res.data));
    }).catch((err) => {
      dispatch(updatePostListErrors(err.response.data));
      dispatch(hideLoader());
    });
};
