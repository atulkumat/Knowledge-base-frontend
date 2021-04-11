import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from 'Components/PageLoader';
import UserTile from 'Components/UserTile';
import useQuery from 'hooks/useQuery';
import { getUsersList } from 'actions/userListAction';
import Paginate from 'Components/Paginate';

const UsersList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const loading = useSelector((state) => state.flags.loading);
  const [currentPage, setCurrentPage] = useState(0);
  const query = useQuery();
  const name = query.get('name') || '';
  let page = parseInt(query.get('page_no'), 10) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    page = page === 0 ? page : page - 1;
    setCurrentPage(page);
    dispatch(getUsersList(page, name));
  }, [name, page]);

  return (
    <div className='user-list-container'>
      <div className='user-list-main'>
        <div className='tiles'>
          {
            loading
              ? <PageLoader />
              : usersList.users.map((user, idx) => (
                <UserTile
                  user={user}
                  key={user.id}
                  index={idx}
                />
              ))
          }
          {
            usersList.errors && (
              <p className='input-feedback'>
                {usersList.errors}
              </p>
            )
          }
        </div>
        <Paginate
          length={usersList.length}
          perPage={12}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
