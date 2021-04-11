import { post } from 'services/api';
import setPost, { removePostErrors, setPostErrors } from 'actions/setPostAction';
import { hideLoader, showLoader } from './apiFlagsAction';

const createPost = (route, payload) => (dispatch) => {
  dispatch(showLoader());
  post(route, payload)
    .then((res) => {
      dispatch(setPost(res.data));
      dispatch(removePostErrors());
      dispatch(hideLoader());
    }).catch((err) => {
      dispatch(hideLoader());
      dispatch(setPostErrors(err.response.data));
    });
};

export default createPost;
