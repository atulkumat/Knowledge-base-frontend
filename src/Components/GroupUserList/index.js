import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PageLoader from 'Components/PageLoader';
import Paginate from 'Components/Paginate';
import PropTypes from 'prop-types';
import UserTile from 'Components/UserTile';
import useQuery from 'hooks/useQuery';
import leaveGroupPopUp from './leaveGroupPopUp';
import { getGroupUserList } from 'actions/groupUserListActions';
import { OWNER } from 'constants/groupRole';
import AddMembers from 'Components/AddMembers';
import 'Components/GroupUserList/index.css';

const GroupUserList = ({ id, role }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const groupUserList = useSelector((state) => state.groupUserList);
  const loading = useSelector((state) => state.flags.loading);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const userName = query.get('name') || '';
  let page = parseInt(query.get('page_no'), 10) || 0;
  page = page === 0 ? page : page - 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    dispatch(getGroupUserList(id, page, userName));
  }, [userName, page]);

  const handleSearch = () => {
    history.push({
      pathname: location.pathname,
      search: `?name=${name}`,
    });
  };

  const handleLeaveGroup = () => {
    leaveGroupPopUp(history, dispatch, id, user.id);
  };

  if (groupUserList.users.length === 0) {
    return <PageLoader />;
  }
  return (
    <div className='user-list-container'>
      <div className='group-controls-btns'>
        {
          role === OWNER && (
            <button
              type='button'
              className={`${addMember ? 'btn--active' : 'btn--disable'} add-btn`}
              onClick={() => setAddMember(!addMember)}
            >
              Add Member
            </button>
          )
        }
        {
          role && (
            <button
              type='button'
              className='add-btn'
              onClick={handleLeaveGroup}
            >
              Leave
            </button>
          )
        }
      </div>
      {
        addMember && (
          <AddMembers id={id} page={page} />
        )
      }
      <div className='user-list-searchbox'>
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Search member'
          className='user-list-input'
        />
        <SearchIcon className='user-search-icon' onClick={handleSearch} />
      </div>
      <div className='user-list-main'>
        <div className='tiles'>
          {
            loading
              ? <PageLoader />
              : groupUserList.users.map((userObj, idx) => (
                <UserTile
                  user={userObj.user}
                  key={userObj.user.id}
                  index={idx}
                  role={userObj.role}
                  currentUserRole={role}
                  groupId={id}
                  page={page}
                />
              ))
          }
          {
            groupUserList.errors && (
              <p className='input-feedback'>
                {groupUserList.errors}
              </p>
            )
          }
        </div>
        <Paginate
          length={groupUserList.users[0].length}
          perPage={12}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

GroupUserList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default GroupUserList;
