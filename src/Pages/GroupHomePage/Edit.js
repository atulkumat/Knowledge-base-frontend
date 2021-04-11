import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateGroupDetails } from 'actions/groupsAction';

const Edit = ({ group, role }) => {
  const [description, setDescription] = useState(group.description);
  const history = useHistory();
  const dispatch = useDispatch();

  const updateDetails = () => {
    dispatch(updateGroupDetails(group.id, { description }, history, role));
  };
  return (
    <div className='group-edit-container'>
      <p className='group-edit-heading'>
        Update Group Details
      </p>
      <div className='input-group'>
        <label className='group-label' htmlFor='group-name'>
          Group Name
        </label>
        <div className='input-box'>
          <input
            type='text'
            value={group.name}
            id='group-name'
            disabled
          />
        </div>
      </div>
      <div className='input-group'>
        <label className='group-label' htmlFor='description'>
          Enter group description
        </label>
        <div className='input-box'>
          <textarea
            className='textbox update-textbox'
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>
      <div className='group-button-container'>
        <button
          type='button'
          className='create-group-button'
          onClick={updateDetails}
        >
          Update Details
        </button>
        <button
          type='button'
          className='back-btn'
          onClick={() => history.push(`/home/group/${group.id}`)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

Edit.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default Edit;
