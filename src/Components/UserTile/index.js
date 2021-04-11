import React, { useEffect, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  ADMIN, MEMBER, OWNER, VIEWER,
} from 'constants/groupRole';
import {
  demoteUserRole, removeUserFromGroup, updateMemberRole,
} from 'actions/groupUserListActions';
import { confirmAlert } from 'react-confirm-alert';
import { removeMemberMessage, removeMemberTitle } from 'constants/dialogueBox';
import 'Components/UserTile/index.css';
import { Link } from 'react-router-dom';

const UserTile = ({
  user, role, index, groupId, page, currentUserRole,
}) => {
  const {
    first_name, last_name, gender, status,
  } = user;
  const [roleCSS, setRoleCSS] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === OWNER) {
      setRoleCSS(OWNER);
    } else if (role === ADMIN) {
      setRoleCSS(ADMIN);
    } else {
      setRoleCSS('');
    }
  }, [role]);

  const promoteToAdmin = () => {
    dispatch(updateMemberRole(groupId, user.id, index));
  };

  const removeFromGroup = () => {
    confirmAlert({
      title: removeMemberTitle,
      message: removeMemberMessage,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            dispatch(removeUserFromGroup(groupId, user.id, page));
          },
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  const demoteToMember = () => {
    dispatch(demoteUserRole(groupId, user.id, index));
  };
  return (
    <div className='user-tile'>
      <div className='user-details'>
        <div className='user-name'>
          <Link to={`/home/user/${user.id}`}>
            <p className={`${roleCSS} user-tile-username`}>
              {first_name }
              {' '}
              {last_name}
            </p>
          </Link>
          <p>
            <span className='user-gender'>Gender:</span>
            {' '}
            {gender}
          </p>
        </div>
        {
          currentUserRole === OWNER && (
            <div className='owner-controls'>
              {
                role === MEMBER && (
                  <p
                    className='control-option'
                    onClick={promoteToAdmin}
                    role='button'
                  >
                    Promote to admin
                  </p>
                )
              }
              {
                role === ADMIN && (
                  <p
                    className='control-option'
                    onClick={demoteToMember}
                    role='button'
                  >
                    Demote to member
                  </p>
                )
              }
              {
                role !== OWNER && (
                  <p
                    className='control-option'
                    onClick={removeFromGroup}
                    role='button'
                  >
                    Remove
                  </p>
                )
              }
            </div>
          )
        }
      </div>
      <div className={status === 'online' ? 'status--online' : 'status--offline'}>
        <FiberManualRecordIcon />
      </div>
    </div>
  );
};

UserTile.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  role: PropTypes.string,
  index: PropTypes.number.isRequired,
  groupId: PropTypes.string,
  page: PropTypes.number,
  currentUserRole: PropTypes.string,
};

UserTile.defaultProps = {
  role: VIEWER,
  groupId: '',
  page: 0,
  currentUserRole: VIEWER,
};

export default UserTile;
