import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

const ReplyTile = ({ reply }) => {
  const {
    content, user, created_at,
  } = reply;
  const createdAt = new Date(created_at);
  const date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(createdAt);

  return (
    <div className='reply-container'>
      <div className='reply-content'>
        {content}
      </div>
      <div className='reply-details'>
        <Link to={`/home/user/${user.id}`}>
          <p className='author-name'>
            {user.first_name}
            {' '}
            {user.last_name}
          </p>
        </Link>
        <p className='reply-date'>
          {date}
        </p>
      </div>
    </div>
  );
};

ReplyTile.propTypes = {
  reply: PropTypes.shape({
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    created_at: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default ReplyTile;
