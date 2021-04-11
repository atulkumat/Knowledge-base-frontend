import { TAGS_SUGGESTIONS, TAGS_SUGGESTIONS_ERRORS } from 'actions/actionTypes';
import API_ROUTES from 'constants/api/apiRoutes';
import { get } from 'services/api';

export const setTagsSuggestions = (suggestion) => ({
  type: TAGS_SUGGESTIONS,
  suggestion,
});

export const updateTagsSuggestionErrors = (errors) => ({
  type: TAGS_SUGGESTIONS_ERRORS,
  errors,
});

export const getSuggestions = (inputText) => (dispatch) => {
  get((`${API_ROUTES.tags}?name=${inputText}`)).then((res) => {
    dispatch(updateTagsSuggestionErrors(null));
    dispatch(setTagsSuggestions(res.data.tags));
  }).catch((err) => {
    dispatch(updateTagsSuggestionErrors(err.response.data));
  });
};
