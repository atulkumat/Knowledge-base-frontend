import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from 'Pages/PostList';
import API_ROUTES from 'constants/api/apiRoutes';
import 'Pages/TagPosts/index.css';

const TagPosts = () => {
  const { id } = useParams();
  const { name } = useParams();
  return (
    <div>
      <h1 className='tag_post_heading'>
        Posts with tag
        {' '}
        {name}
      </h1>
      <PostList route={`${API_ROUTES.tagPublicPosts}/${id}/post/public`} />
    </div>
  );
};

export default TagPosts;
