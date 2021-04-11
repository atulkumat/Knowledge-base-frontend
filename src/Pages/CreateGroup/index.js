import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import PageLoader from 'Components/PageLoader';
import { createNewGroup } from 'actions/groupsAction';
import { getSuggestions } from 'actions/userListAction';
import groupValidationSchema from './groupValidationSchema';
import 'Pages/CreateGroup/index.css';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const loading = useSelector((state) => state.flags.loading);
  const users = useSelector((state) => state.usersList.users);
  const groupDetails = useSelector((state) => state.groupDetails);
  const currentUser = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState('');
  const [selectedUsersList, setSelectedUsersList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const createGroup = () => {
    const errors = groupValidationSchema(name, description);

    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      const users = selectedUsersList.map((user) => (user.value));
      dispatch(createNewGroup({ name, description, users }, history));
    }
  };

  const loadOptions = (inputText, callback) => {
    dispatch(getSuggestions(inputText));
    const suggestions = users.filter((user) => user.id !== currentUser.id);
    callback(suggestions.map((user) => (
      {
        label: `${user.first_name} ${user.last_name ? user.last_name : ''}`,
        value: user.id,
      }
    )));
  };
  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className='create-group-container'>
      <div className='create-group-heading'>
        Create a new group
      </div>
      <div className='create-group-main'>
        <h2>Create a group and share your knowledge with others</h2>
        <div className='input-group'>
          <label className='group-label' htmlFor='group-name'>
            Group Name
          </label>
          <div className='input-box'>
            <input
              type='text'
              value={name}
              id='group-name'
              placeholder='Enter group name'
              onChange={(event) => setName(event.target.value)}
              className={
                errors.name
                && 'error'
              }
            />
            <div className='input-feedback'>
              {
                errors.name
                  ? errors.name : ''
              }
            </div>
          </div>
        </div>
        <div className='input-group'>
          <label className='group-label' htmlFor='description'>
            Group Description
          </label>
          <div className='input-box'>
            <textarea
              id='description'
              value={description}
              placeholder='Enter group description'
              onChange={(event) => setDescription(event.target.value)}
              className={
                `textbox ${
                  errors.description
                && 'error'}`
              }
            />
            <div className='input-feedback'>
              {
                errors.description
                  ? errors.description : ''
              }
            </div>
          </div>
        </div>
        <div className='input-group'>
          <label className='group-label' htmlFor='user'>
            Add Members
          </label>
          <div className='select-box'>
            <AsyncSelect
              isMulti
              id='user'
              value={selectedUsersList}
              className='group-select'
              onChange={(selectedUsers) => setSelectedUsersList(selectedUsers)}
              placeholder='Enter name of the user'
              loadOptions={loadOptions}
            />
          </div>
        </div>
        { groupDetails.errors
          && (
          <p className='input-feedback group-errors'>
            { groupDetails.errors }
          </p>
          )}
        <div className='group-button-container'>
          <button
            type='button'
            className='create-group-button'
            onClick={createGroup}
          >
            Create Group
          </button>
          <button
            type='button'
            className='back-btn'
            onClick={() => history.push('/home/groups')}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
