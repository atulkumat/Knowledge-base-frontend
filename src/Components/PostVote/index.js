import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import 'Components/PostVote/index.css';
import { downVotePost, upVotePost } from 'actions/postVoteAction';
import { useHistory, useParams } from 'react-router-dom';
import popUp from './popUp';

const PostVote = ({
  upvotes, downvotes, vote_status, userLoggedIn,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleVote = (vote) => {
    if (userLoggedIn) {
      if (vote === 'upvote') {
        if (vote_status !== 'upvote') {
          dispatch(upVotePost(id));
        }
      } else if (vote_status !== 'downvote') {
        dispatch(downVotePost(id));
      }
    } else {
      popUp(history);
    }
  };

  return (
    <div className='post_vote'>
      <div
        className={vote_status === 'upvote' ? 'blue' : 'black'}
      >
        {upvotes}
        <ThumbUpIcon onClick={() => handleVote('upvote')} />
      </div>
      <div
        className={vote_status === 'downvote' ? 'blue' : 'black'}
      >
        {downvotes}
        <ThumbDownAltIcon onClick={() => handleVote('downvote')} />
      </div>
    </div>
  );
};
PostVote.propTypes = {
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  vote_status: PropTypes.bool.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

export default PostVote;
