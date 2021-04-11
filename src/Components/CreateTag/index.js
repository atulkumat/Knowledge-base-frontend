import React, { useState } from 'react';
import { MAX_TAG_LEN, MIN_LEN } from 'constants/postConstant';
import { Button, CircularProgress } from '@material-ui/core';
import { createTagAction, setCreateTagErrors } from 'actions/createTagAction';
import { useDispatch, useSelector } from 'react-redux';
import 'Components/CreateTag/index.css';

const CreateTag = () => {
  const [title, setTitle] = useState('');
  const [validTag, setValidTag] = useState(false);
  const [tagError, setTagError] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.flags.button);
  const createTag = useSelector((state) => state.createTag);

  const checkValidTag = (e) => {
    if (e.target.value.length < MIN_LEN || !e.target.value.trim()) {
      setTagError('');
      setValidTag(false);
    } else if (e.target.value.length > MAX_TAG_LEN) {
      setTagError('word limit exceeded');
      setValidTag(false);
    } else {
      setValidTag(true);
    }
  };
  const handleSubmit = () => {
    const value = { name: title };
    dispatch(createTagAction(value));
  };
  const handleTagError = () => {
    dispatch(setCreateTagErrors(null));
  };

  if (createTag.errors) {
    return (
      <div>
        {createTag.errors.name}
        <Button classNam='try_again_button' onClick={handleTagError} variant='contained' color='primary'>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className='create_tag'>
        <div className='input_tag'>
          <input
            type='text'
            value={title}
            placeholder='create your own tag'
            onChange={(e) => setTitle(e.target.value)}
            onInput={checkValidTag}
            onBlur={checkValidTag}
          />
        </div>
        <div className='button_loader'>
          { loading
            ? <CircularProgress className='circular_loader' />
            : validTag
              ? (
                <div className='create_tag_btn'>
                  <Button onClick={handleSubmit} variant='contained' color='primary'>
                    cretae  tag
                  </Button>
                </div>
              )
              : (
                <div className='create_tag_btn'>
                  <Button disabled variant='contained' color='primary'>
                    please review
                  </Button>
                </div>
              )}
        </div>
        {validTag ? (<div className='valid' />)
          : (<div className='valid'>{tagError}</div>) }
      </div>
    </div>
  );
};

export default CreateTag;
