import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import API_ROUTES from 'constants/api/apiRoutes';
import { createBookmark, removeBookmark } from 'actions/bookmarkAction';
import './index.css';
import { confirmAlert } from 'react-confirm-alert';

const Bookmark = () => {
  const bookmark = useSelector((state) => state.bookmark);
  const user = useSelector((state) => state.user);
  const [showBookmark, setShowBookmark] = useState(false);
  const [note, setNote] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleBookmark = () => {
    if (showBookmark) {
      setShowBookmark(!showBookmark);
    } else {
      setShowBookmark(true);
    }
  };

  const confirmDeleteBookmark = () => {
    const bookmarkId = bookmark.note.id;
    dispatch(removeBookmark(`${API_ROUTES.deleteBookmark}/${bookmarkId}`));
    setShowBookmark(false);
  };

  const handleRemoveBookmark = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete bookmark.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { confirmDeleteBookmark(); },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleAddBookmark = () => {
    const values = { note };
    dispatch(createBookmark(`${API_ROUTES.addBookmark}/${id}/bookmark`, values));
  };

  if (user === null) {
    return (<div />);
  }

  if (bookmark.errors) {
    return (
      <div>
        {' '}
        {bookmark.errors}
        {' '}
      </div>
    );
  }

  if (bookmark.note) {
    return (
      <div className='bookmark_icon'>
        <BookmarkIcon style={{ color: 'red' }} onClick={handleRemoveBookmark} />
      </div>
    );
  }
  return (
    <div>
      <div className='bookmark_icon'>
        <BookmarkIcon style={{ color: 'blue' }} onClick={handleBookmark} />
      </div>
      <div className={showBookmark ? 'show_bookmark' : 'hide_bookmark'}>
        <input
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddBookmark}
        >
          Add note
        </Button>
      </div>
    </div>
  );
};

export default Bookmark;
