import initialState from 'reducers/initialState.json';
import { TAGS_SUGGESTIONS, TAGS_SUGGESTIONS_ERRORS } from 'actions/actionTypes';

const tagsSuggestionReducer = (state = initialState.tagsSuggestion, action) => {
  switch (action.type) {
    case TAGS_SUGGESTIONS:
      return {
        ...state,
        suggestion: action.suggestion,
      };
    case TAGS_SUGGESTIONS_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default tagsSuggestionReducer;
