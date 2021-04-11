import React from 'react';
import PostList from 'Pages/PostList/index';
import Button from '@material-ui/core/Button';
import 'Pages/PublicPost/PublicPost.css';
import API_ROUTES from 'constants/api/apiRoutes';
import { useHistory } from 'react-router-dom';

const PublicPost = () => {
  const history = useHistory();
  return (
    <div>
      <div className='publicPost_conatiner1'>
        <h2>All Questions</h2>
        <Button
          onClick={() => history.push('/Post')}
          variant='contained'
          color='primary'
        >
          Ask a question
        </Button>
      </div>
      <PostList route={API_ROUTES.publicPosts} />
    </div>
  );
};

export default PublicPost;
