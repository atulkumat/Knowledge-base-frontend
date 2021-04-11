import { getUserDetails } from 'actions/userDetailsAction';
import PageLoader from 'Components/PageLoader';
import UserDetails from 'Components/UserDetails';
import API_ROUTES from 'constants/api/apiRoutes';
import PostList from 'Pages/PostList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './index.css';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDetails.users);

  useEffect(() => {
    if (!users.hasOwnProperty(id)) {
      dispatch(getUserDetails(id));
    }
  }, []);

  if (!users.hasOwnProperty(id)) {
    return <PageLoader />;
  }

  return (
    <div>
      <UserDetails user={users[id]} />
      <h1 className='user-details-heading'>
        User Posts
      </h1>
      <PostList route={`${API_ROUTES.user}/${id}/public-post`} />
    </div>
  );
};

export default Details;
