import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Replies from 'Components/Replies';
import { useDispatch, useSelector } from 'react-redux';
import API_ROUTES from 'constants/api/apiRoutes';
import acceptAnswer from 'actions/acceptAnswerAction';
import { Check } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Votes from './Votes';
import 'Components/CommentTile/index.css';

const CommentTile = ({
  comment, acceptedAnswer, acceptedId, index, userLoggedIn,
}) => {
  const {
    id, content, upvotes, downvotes, accepted, created_at, status, replies,
  } = comment;

  const postDetails = useSelector((state) => state.postDetails);
  const acceptAnswerError = useSelector((state) => state.acceptAnswer);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const createdAt = new Date(created_at);
  const date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(createdAt);

  const handleClick = () => {
    dispatch(acceptAnswer(`${API_ROUTES.acceptAnswer}/${id}/accept`, index));
  };

  const checkUser = () => {
    if (postDetails.post.length !== 0) {
      if (!user || postDetails.post.user.id !== user.id) {
        if (accepted === true) {
          return <div className='tick'><Check /></div>;
        }

        return <div />;
      }
      if (acceptedAnswer === true) {
        if (id === acceptedId) {
          return (
            <div className='accepted_answer'>
              {acceptAnswerError || 'Accepted' }
            </div>
          );
        }
        return <div />;
      }

      return (
        <div onClick={handleClick} className='accept_answer'>
          Accept
        </div>
      );
    }
  };

  return (
    <div>
      <div className='comment_tile'>
        <div className='comment_vote_main_container'>
          <Votes
            upvotes={upvotes}
            downvotes={downvotes}
            status={status || 'none'}
            index={index}
            id={id}
            userLoggedIn={userLoggedIn}
          />
          {
            checkUser()
          }
        </div>
        <div className='comment_content'>
          {ReactHtmlParser(content)}
          <Replies
            replies={replies}
            commentId={id}
            index={index}
            userLoggedIn={userLoggedIn}
          />
        </div>
      </div>
      <div className='comment_time_section'>
        <Link to={`/home/user/${comment.user.id}`}>
          <span className='comment_user_name'>{comment.user.first_name}</span>
        </Link>
        {date}
      </div>
    </div>
  );
};

CommentTile.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    accepted: PropTypes.bool,
    created_at: PropTypes.string,
    status: PropTypes.string,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        created_at: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
  }).isRequired,
  index: PropTypes.number.isRequired,
  acceptedAnswer: PropTypes.bool.isRequired,
  acceptedId: PropTypes.string.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

export default CommentTile;
