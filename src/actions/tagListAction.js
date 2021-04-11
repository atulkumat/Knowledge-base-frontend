import { get } from 'services/api';
import { TAGS_PER_PAGE } from 'constants/pagination';
import { UPDATE_TAGS_LIST, UPDATE_LENGTH, UPDATE_TAGLIST_ERROR } from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { hideLoader, showLoader } from './apiFlagsAction';

export const updateTagsList = (tags) => ({
  type: UPDATE_TAGS_LIST,
  tags,
});

export const updateLength = (length) => ({
  type: UPDATE_LENGTH,
  length,
});

export const updateErrors = (errors) => ({
  type: UPDATE_TAGLIST_ERROR,
  errors,
});

export const getTagsList = (pageNo, name) => (dispatch) => {
  dispatch(showLoader());
  get(`${API_ROUTES.tags}?per_page=${TAGS_PER_PAGE}&page_no=${pageNo}&name=${name}`)
    .then((res) => {
      dispatch(updateLength(res.data.length));
      dispatch(hideLoader());
      dispatch(updateErrors(null));
      dispatch(updateTagsList(res.data.tags));
    }).catch((err) => {
      dispatch(hideLoader());
      dispatch(updateErrors(err.response.data));
    });
};
