import PropTypes from 'prop-types';
import React from 'react';
import API_ROUTES from 'constants/api/apiRoutes';
import Button from '@material-ui/core/Button';
import PostList from 'Pages/PostList';
import { useHistory } from 'react-router-dom';
import './index.css';

const PrivatePost = ({ groupId, groupRole }) => {
  const history = useHistory();

  if (!groupRole) {
    return (
      <div className='group-post'>
        <p className='group-post--hidden'>
          You can not view post of this group
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className='private-post-conatiner'>
        <h2 className='private-post-heading'>All Questions</h2>
        <Button
          onClick={() => history.push(`/Post?group=${groupId}`)}
          variant='contained'
          color='primary'
        >
          Ask a question
        </Button>
      </div>
      <PostList route={`${API_ROUTES.groups}/${groupId}/post`} />
    </div>
  );
};

PrivatePost.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupRole: PropTypes.string.isRequired,
};

export default PrivatePost;
