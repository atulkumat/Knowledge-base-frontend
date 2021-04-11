import React from 'react';
import PropTypes from 'prop-types';
import 'Components/TagTile/index.css';
import { useHistory } from 'react-router-dom';

const TagTile = ({ tag }) => {
  const { id, name } = tag;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/home/tags/${id}/${name}`);
  };

  return (
    <div onClick={handleClick} className='tagTile'>
      {name}
    </div>
  );
};

TagTile.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};
TagTile.defaultProps = {
  tag: {},
};
export default TagTile;
