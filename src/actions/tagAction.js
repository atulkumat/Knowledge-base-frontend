import { SET_TAGS } from 'actions/actionTypes';

const setTags = (tags) => ({
  type: SET_TAGS,
  tags,
});

export default setTags;
