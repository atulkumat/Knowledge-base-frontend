import React from 'react';
import { useSelector } from 'react-redux';
import UserDetails from 'Components/UserDetails';
import PostList from 'Pages/PostList';
import 'Pages/Profile/index.css';
import API_ROUTES from 'constants/api/apiRoutes';
import { Route, Switch } from 'react-router-dom';
import PageLoader from 'Components/PageLoader';

const Profile = () => {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <PageLoader />;
  }

  return (
    <div>
      <UserDetails user={user} currentUser />
      <Switch>
        <Route exact path='/home/profile/bookmark'>
          <h1 className='heading'>
            Bookmarks
          </h1>
          <PostList route={API_ROUTES.userBookmarkPost} />
        </Route>
        <Route exact path='/home/profile'>
          <h1 className='heading'>
            My Posts
          </h1>
          <PostList route={API_ROUTES.userPosts} />
        </Route>
      </Switch>
    </div>
  );
};

export default Profile;
