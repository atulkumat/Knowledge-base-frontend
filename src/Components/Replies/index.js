import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import ReplyTile from 'Components/ReplyTile';
import { addReplyToComment } from 'actions/commentsAction';
import validateReply from './validation';
import './index.css';

const Replies = ({
  replies, commentId, index, userLoggedIn,
}) => {
  const [addComment, setAddComment] = useState(false);
  const [reply, setReply] = useState('');
  const [errors, setErrors] = useState('');
  const loader = useSelector((state) => state.comments.replyLoader);
  const dispatch = useDispatch();

  const addReply = () => {
    setAddComment(!addComment);
    setErrors('');
  };

  return (
    <div className='replies-container'>
      <div className='replies-content'>
        {
          replies.map((reply) => (
            <ReplyTile reply={reply} key={reply.id} />
          ))
        }
      </div>
      <p
        className='reply-input-option'
        onClick={addReply}
      >
        {
          addComment ? 'Cancel' : 'Add a comment'
        }
      </p>
      {
        addComment && (
          <div className='reply-input-container'>
            {
              loader ? <CircularProgress />
                : (
                  <div className='reply-input'>
                    <input
                      type='text'
                      value={reply}
                      placeholder='Add a comment'
                      onChange={(e) => setReply(e.target.value)}
                      onBlur={() => setErrors(validateReply(reply))}
                    />
                    <button
                      type='button'
                      className='add-reply-btn'
                      onClick={() => dispatch(addReplyToComment(reply, commentId, index))}
                      disabled={errors || !userLoggedIn}
                    >
                      Add comment
                    </button>
                  </div>
                )
            }
            <div className='input-feedback'>
              {errors}
            </div>
          </div>
        )
      }
    </div>
  );
};

Replies.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      created_at: PropTypes.string,
      content: PropTypes.string,
    }).isRequired,
  ).isRequired,
  commentId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Replies;
