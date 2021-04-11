import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from 'actions/userActions';
import { getItem } from 'services/browserStorage';

const Startup = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, []);
  return <>{children}</>;
};

Startup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Startup;
