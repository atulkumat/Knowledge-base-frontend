import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import { NavLink } from 'react-router-dom';
import 'Components/Sidebar/index.css';
import NavigationLink from 'Components/NavigationLink';

const Sidebar = () => (
  <div className='sidebar-container'>
    <div className='sidebar-1'>
      <NavigationLink to='/' text='Home' />
    </div>
    <div className='sidebar-2'>
      Public
    </div>
    <NavLink
      exact
      to='/home'
      activeClassName='navbar__link--active'
      className='navbar__link'
    >
      <div className='sidebar-3'>
        <PublicIcon className='icon' />
        <p>Knowledge-base</p>
      </div>
    </NavLink>
    <div className='sidebar-4'>
      <NavigationLink to='/home/tags' text='Tags' />
      <NavigationLink to='/home/users' text='Users' />
      <NavigationLink to='/home/groups' text='Groups' />
    </div>
  </div>
);

export default Sidebar;
