import React from 'react';
import { useHistory } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import PropTypes from 'prop-types';
import 'Components/GroupDetailsTile/index.css';

const GroupDetailsTile = ({ group }) => {
  const { description, name, id } = group;
  const history = useHistory();
  return (
    <div className='group-tile-details'>
      <div className='group-tile-logo'>
        <GroupIcon />
      </div>
      <div className='group-tile-content'>
        <p
          className='group-tile-name'
          onClick={() => history.push(`/home/group/${id}`)}
          role='button'
        >
          {name}
        </p>
        <div className='group-tile-description'>
          {description}
        </div>
      </div>
    </div>
  );
};

GroupDetailsTile.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

GroupDetailsTile.defaultProps = {
  group: {},
};
export default GroupDetailsTile;
