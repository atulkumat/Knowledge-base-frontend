import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateGroup from 'Pages/CreateGroup';
import Details from 'Pages/UsersPage/Details';
import GroupContainer from 'Pages/GroupContainer';
import GroupHomePage from 'Pages/GroupHomePage';
import Header from 'Components/Header';
import ProtectedRoute from 'routes/ProtectedRoute';
import Sidebar from 'Components/Sidebar';
import UsersPage from 'Pages/UsersPage';
import { confirmAlert } from 'react-confirm-alert';
import 'Pages/HomePage/index.css';
import PublicPost from 'Pages/PublicPost';
import Profile from 'Pages/Profile';
import TagList from 'Pages/TagList';
import TagPosts from 'Pages/TagPosts';
import PostDetails from 'Pages/PostDetails';

const HomePage = () => {
  const errors = useSelector((state) => state.flags.errors);

  if (errors) {
    confirmAlert({
      title: 'Error Occured',
      message: 'Sorry There was an error!!',
      buttons: [
        {
          label: 'OK',
        },
      ],
    });
  }

  return (
    <div className='homepage'>
      <Header />
      <div className='homepage__container'>
        <div className='homepage-sidebar'>
          <Sidebar />
        </div>
        <div className='homepage-main'>
          <Switch>
            <ProtectedRoute path='/home/groups' component={GroupContainer} />
            <Route exact path='/home/profile/bookmark' component={Profile} />
            <Route exact path='/home/profile' component={Profile} />
            <Route exact path='/home/tags' component={TagList} />
            <Route exact path='/home/tags/:id/:name' component={TagPosts} />
            <Route exact path='/home/post/:id' component={PostDetails} />
            <Route path='/home/user/:id' component={Details} />
            <Route exact path='/home' component={PublicPost} />
            <Route exact path='/home/users'>
              <UsersPage />
            </Route>
            <ProtectedRoute
              exact
              path='/home/create-group'
              component={CreateGroup}
            />
            <ProtectedRoute path='/home/group/:id' component={GroupHomePage} />
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
