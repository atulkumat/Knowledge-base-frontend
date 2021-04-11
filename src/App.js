import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthRoute from 'routes/AuthRoute';
import Edit from 'Pages/Profile/Edit';
import Login from 'Pages/Login';
import SignUp from 'Pages/Signup';
import LandingPage from 'Pages/LandingPage';
import HomePage from 'Pages/HomePage';
import Post from 'Pages/Post';
import ProtectedRoute from 'routes/ProtectedRoute';
import Profile from 'Pages/Profile';
import NotFound from 'Pages/NotFound';
import Startup from 'Startup';
import store from 'reducers/configStore';
import 'axios/interceptor';
import 'constants/color.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='App'>
        <Startup>
          <Switch>
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/signup' component={SignUp} />
            <ProtectedRoute path='/post' component={Post} />
            <ProtectedRoute path='/Profile' component={Profile} />
            <Route path='/home' component={HomePage} />
            <ProtectedRoute path='/edit-details' component={Edit} />
            <Route path='/' exact component={LandingPage} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
