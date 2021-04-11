import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getItem } from 'services/browserStorage';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (getItem('token')) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location,
              },
            }
          }
          />
        );
      }
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProtectedRoute;
