import { post } from 'services/api';
import API_ROUTES from 'constants/api/apiRoutes';
import { UPDATE_POST_VOTE } from 'actions/actionTypes';

export const updatePostVote = (upvotes, downvotes, status) => ({
  type: UPDATE_POST_VOTE,
  status,
  upvotes,
  downvotes,
});

export const upVotePost = (id) => (dispatch) => {
  post(`${API_ROUTES.postVote}/${id}/upvote`)
    .then((res) => {
      dispatch(updatePostVote(res.data.post.upvotes, res.data.post.downvotes, res.data.status));
    });
};

export const downVotePost = (id) => (dispatch) => {
  post(`${API_ROUTES.postVote}/${id}/downvote`)
    .then((res) => {
      dispatch(updatePostVote(res.data.post.upvotes, res.data.post.downvotes, res.data.status));
    });
};
