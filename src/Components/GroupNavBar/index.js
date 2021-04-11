import PropTypes from 'prop-types';
import React from 'react';
import NavigationLink from 'Components/NavigationLink';
import 'Components/GroupNavBar/index.css';

const GroupNavBar = ({ id, role }) => (
  <div className='group-nav-bar'>
    <div className='nav-bar-container'>
      <NavigationLink to={`/home/group/${id}/about`} text='About' />
      <NavigationLink to={`/home/group/${id}`} text='Posts' />
      <NavigationLink to={`/home/group/${id}/members`} text='Members' />
      {
        ( role && role !== 'member' ) && (
          <NavigationLink to={`/home/group/${id}/edit`} text='Edit' />
        )
      }
    </div>
  </div>
);

GroupNavBar.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default GroupNavBar;
