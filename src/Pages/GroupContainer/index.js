import React, { useState } from 'react';
import {
  NavLink, Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import Group from 'Components/Group';
import SearchIcon from '@material-ui/icons/Search';
import './index.css';

const GroupContainer = () => {
  const [name, setName] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleSearch = () => {
    history.push({
      pathname: location.pathname,
      search: `?name=${name}`,
    });
  };
  return (
    <div className='group-main-container'>
      <div className='group-search-bar'>
        <NavLink
          exact
          to='/home/groups'
          activeClassName='navbar__link--active'
          className='navbar__link'
        >
          <p>
            My Groups
          </p>
        </NavLink>
        <NavLink
          exact
          to='/home/groups/all'
          activeClassName='navbar__link--active'
          className='navbar__link'
        >
          <p>
            All Groups
          </p>
        </NavLink>
      </div>
      <div className='group-controls'>
        <div className='group-search-input'>
          <input
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Search Group'
            className='group__inputField'
          />
          <SearchIcon className='group-search-icon' onClick={handleSearch} />
        </div>
        <button
          type='button'
          className='create-group-btn'
          onClick={() => history.push('/home/create-group')}
        >
          Create A New Group
        </button>
      </div>
      <Switch>
        <Route exact path='/home/groups/all'>
          <Group
            userGroup={false}
          />
        </Route>
        <Route exact path='/home/groups'>
          <Group
            userGroup
          />
        </Route>
      </Switch>
    </div>
  );
};

export default GroupContainer;
