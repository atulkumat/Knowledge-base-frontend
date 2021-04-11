import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getItem } from 'services/browserStorage';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (getItem('token')) {
          return (
            <Redirect to={
              {
                pathname: '/home',
                state: {
                  from: props.location,
                },
              }
            }
            />
          );
        }
        return <Component {...rest} {...props} />;
      }
    }
  />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthRoute;
