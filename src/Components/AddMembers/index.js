import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { addUsersToGroup } from 'actions/groupUserListActions';
import { getUserSuggestionsForGroup } from 'actions/userListAction';

const AddMembers = ({ id, page }) => {
  const [selectedUsersList, setSelectedUsersList] = useState([]);
  const users = useSelector((state) => state.usersList.users);
  const dispatch = useDispatch();

  const loadOptions = (inputText, callback) => {
    dispatch(getUserSuggestionsForGroup(inputText, id));
    callback(users.map((user) => (
      {
        label: `${user.first_name} ${user.last_name ? user.last_name : ''}`,
        value: user.id,
      }
    )));
  };

  const addUsers = () => {
    const users = selectedUsersList.map((user) => (user.value));
    dispatch(addUsersToGroup(id, users, page));
    setSelectedUsersList([]);
  };

  return (
    <div className='add-members'>
      <div className='add-member-container'>
        <AsyncSelect
          isMulti
          value={selectedUsersList}
          loadOptions={loadOptions}
          className='group-select'
          onChange={(selectedUsers) => setSelectedUsersList(selectedUsers)}
          placeholder='Enter name of the user'
        />
        <button
          type='button'
          className='add-user-btn add-btn'
          onClick={addUsers}
        >
          Add
        </button>
      </div>
    </div>
  );
};

AddMembers.propTypes = {
  id: PropTypes.string.isRequired,
  page: PropTypes.number,
};

AddMembers.defaultProps = {
  page: 0,
};

export default AddMembers;
