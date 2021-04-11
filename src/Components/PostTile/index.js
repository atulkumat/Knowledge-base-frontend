import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import 'Components/PostTile/PostTile.css';

const PostTile = ({ post }) => {
  const {
    id, description, title, upvotes, downvotes, visibility, user, tags, bookmark,
  } = post;
  const history = useHistory();
  const [showBookmark, setShowBookmark] = useState(false);

  const handleClick = () => {
    history.push(`/home/post/${id}`);
  };

  return (
    <>
      <div className='PostTile_conatiner1'>
        <div className='PostTile_conatiner2'>
          <div>
            {upvotes}
            <ThumbUpIcon />
          </div>
          <div>
            {downvotes}
            <ThumbDownAltIcon />
          </div>
        </div>
        <div className='PostTile_conatiner3'>
          <h2 onClick={handleClick} className='post_tile_container3_title' role='button'>
            {title}
          </h2>
          <div className='description'>
            {ReactHtmlParser(description)}
          </div>
          <div className='username'>
            <div className='post_tags_tile'>
              {bookmark && (
              <div
                className='tile_bookmark'
                onClick={() => setShowBookmark(!showBookmark)}
              >
                <BookmarkIcon />
              </div>
              )}
              {tags && tags.map((tag) => (
                <div className='tag'>
                  {tag.name}
                  {' '}
                </div>
              )) }
            </div>
            <div>
              {user.first_name}
              {' '}
              {' '}
              {user.last_name}
            </div>
            {visibility === 'general' ? (<PublicIcon />) : (<LockIcon />)}
          </div>
        </div>
      </div>
      <div className={showBookmark ? 'showbookmark' : 'hidebookmark'}>
        {bookmark && `${bookmark.note}`}
      </div>
    </>
  );
};

PostTile.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    title: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    username: PropTypes.string,
    visibility: PropTypes.string,
    bookmark: PropTypes.string,
    tags: PropTypes.instanceOf(Array),
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};
export default PostTile;
