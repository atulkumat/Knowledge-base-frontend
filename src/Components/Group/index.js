import React, { useEffect, useState } from 'react';
import GroupDetailsTile from 'Components/GroupDetailsTile';
import PageLoader from 'Components/PageLoader';
import PropTypes from 'prop-types';
import API_ROUTES from 'constants/api/apiRoutes';
import PER_PAGE from 'constants/pagination';
import Paginate from 'Components/Paginate';
import useQuery from 'hooks/useQuery';
import { getGroupsList } from 'actions/groupListAction';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const Group = ({ userGroup }) => {
  const loading = useSelector((state) => state.flags.loading);
  const groupsList = useSelector((state) => state.groupsList);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const name = query.get('name') || '';
  let page = parseInt(query.get('page_no'), 10) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    page = parseInt(query.get('page_no'), 10) || 0;
    page = page === 0 ? page : page - 1;
    setCurrentPage(page);
    const apiRoute = userGroup ? API_ROUTES.userGroups : API_ROUTES.groups;
    dispatch(getGroupsList(apiRoute, page, name));
  }, [userGroup, name, page]);

  if (groupsList.groups.length === 0) {
    return <p className='no-record'>No Record Found</p>;
  }
  return (
    <div className='group-container'>
      {
        loading
          ? <PageLoader />
          : (
            <div className='group-tiles'>
              {
                groupsList.groups.map((group) => (
                  <GroupDetailsTile
                    key={group.name}
                    group={group}
                  />
                ))
              }
            </div>
          )
        }
      <Paginate
        length={groupsList.length}
        perPage={PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

Group.propTypes = {
  userGroup: PropTypes.bool.isRequired,
};

export default Group;
