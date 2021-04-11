import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import GroupAboutSection from 'Components/GroupAboutSection';
import GroupNavBar from 'Components/GroupNavBar';
import GroupUserList from 'Components/GroupUserList';
import PageLoader from 'Components/PageLoader';
import PrivatePost from 'Pages/PrivatePost';
import { getGroup } from 'actions/groupsAction';
import Edit from './Edit';
import 'Pages/GroupHomePage/index.css';

const GroupHomePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupDetails.groups);

  useEffect(() => {
    if (!groups.hasOwnProperty(id)) {
      dispatch(getGroup(id));
    }
  }, []);

  if (!groups.hasOwnProperty(id)) {
    return <PageLoader />;
  }

  return (
    <div className='group-home-page'>
      <div className='group-heading'>
        {groups[id].group.name}
      </div>
      <GroupNavBar id={id} role={groups[id].user_role} />
      <div className='group-home-page-container'>
        <Switch>
          <Route path='/home/group/:id/about'>
            <GroupAboutSection group={groups[id].group} />
          </Route>
          <Route path='/home/group/:id/members'>
            <GroupUserList id={id} role={groups[id].user_role} />
          </Route>
          <Route path='/home/group/:id/edit'>
            <Edit group={groups[id].group} role={groups[id].user_role} />
          </Route>
          <Route path='/home/group'>
            <PrivatePost groupId={id} groupRole={groups[id].user_role} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default GroupHomePage;
