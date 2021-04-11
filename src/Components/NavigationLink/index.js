import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const NavigationLink = ({ to, text }) => (
  <NavLink
    exact
    to={to}
    className='navbar__link'
    activeClassName='navbar__link--active'
  >
    <p>{text}</p>
  </NavLink>
);

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavigationLink;
