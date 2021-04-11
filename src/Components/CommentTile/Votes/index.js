import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import popUp from './popUp';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './index.css';
import { commentVote } from 'actions/commentsAction';
import { useHistory } from 'react-router-dom';

const Votes = ({
  downvotes, id, index, status, upvotes, userLoggedIn,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleUpvote = () => {
    if (userLoggedIn) {
      if (status !== 'upvote') {
        const downvote = status === 'downvote' ? downvotes - 1 : downvotes;
        dispatch(commentVote(id, index, upvotes + 1, downvote, 'upvote'));
      }
    } else {
      popUp(history);
    }
  };

  const handleDownvote = () => {
    if (userLoggedIn) {
      if (status !== 'downvote') {
        const upvote = status === 'upvote' ? upvotes - 1 : upvotes;
        dispatch(commentVote(id, index, upvote, downvotes + 1, 'downvote'));
      }
    } else {
      popUp(history);
    }
  };

  return (
    <div className='comment-votes'>
      <div className={`comment-vote-container ${status === 'upvote' ? 'blue' : ''}`}>
        {upvotes}
        <ThumbUpIcon onClick={handleUpvote} />
      </div>
      <div className={`comment-vote-container ${status === 'downvote' ? 'blue' : ''}`}>
        {downvotes}
        <ThumbDownAltIcon onClick={handleDownvote} />
      </div>
    </div>
  );
};

Votes.propTypes = {
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Votes;
