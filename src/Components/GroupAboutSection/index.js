import React from 'react';
import PropTypes from 'prop-types';
import 'Components/GroupAboutSection/index.css';

const GroupAboutSection = ({ group }) => {
  const { created_at } = group;
  const date = new Date(created_at).toString();
  return (
    <div>
      <div className='group-description'>
        {group.description && (
          <div>
            <p className='description-heading'>
              Description
            </p>
            <div className='group-main-description'>
              {group.description}
            </div>
          </div>
        )}
        <p className='description-heading'>
          Created At
        </p>
        <div className='group-main-description'>
          {date}
        </div>
      </div>
    </div>
  );
};

GroupAboutSection.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default GroupAboutSection;
