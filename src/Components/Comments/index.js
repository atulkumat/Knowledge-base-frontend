import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentTile from 'Components/CommentTile';
import { CircularProgress } from '@material-ui/core';
import 'Components/Comments/index.css';

const Comments = ({ userLoggedIn }) => {
  const loading = useSelector((state) => state.flags.commentsLoader);
  const postComment = useSelector((state) => state.comments);
  const [acceptedAnswer, setAcceptedAnswer] = useState(false);
  const [accpetedAnswerId, setAccpetedAnswerId] = useState('');

  if (postComment.content.length !== 0 && acceptedAnswer === false) {
    const result = postComment.content.filter((comment) => comment.accepted === true);
    if (result.length !== 0) {
      setAcceptedAnswer(true);
      setAccpetedAnswerId(result[0].id);
    }
  }

  if (loading) {
    return (
      <div className='comment_loader'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      { postComment.content
         && postComment.content.map((content, index) => (
           <CommentTile
             key={content.id}
             comment={content}
             acceptedAnswer={acceptedAnswer}
             acceptedId={accpetedAnswerId}
             index={index}
             userLoggedIn={userLoggedIn}
           />
         ))}
    </div>
  );
};

Comments.proptypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Comments;
