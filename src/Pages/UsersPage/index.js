import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import UsersList from 'Components/UsersList';
import 'Pages/UsersPage/index.css';
import { useHistory, useLocation } from 'react-router-dom';

const UsersPage = () => {
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
    <div className='users-container'>
      <p className='users-heading'>
        Users
      </p>
      <div className='user-list-searchbox'>
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Search user'
          className='user-list-input'
        />
        <SearchIcon className='user-search-icon' onClick={handleSearch} />
      </div>
      <UsersList />
    </div>
  );
};

export default UsersPage;
