import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import API_ROUTES from 'constants/api/apiRoutes';
import { Button } from '@material-ui/core';
import { createAnswer } from 'actions/createAnswer';
import { MAX_LEN } from 'constants/postConstant';

const Answer = ({ userLoggedIn }) => {
  const [validEditorText, setValidEditorText] = useState(false);
  const [editorError, setEditorError] = useState('');
  const [description, setDescirption] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const answerError = useSelector((state) => state.answer);

  const handleSubmit = () => {
    const values = { content: description };
    dispatch(createAnswer(`${API_ROUTES.answer}/${id}/comment`, values));
  };

  if (answerError !== null) {
    return (<p>{answerError}</p>);
  }

  const checkValidEditor = (e, editor) => {
    if (editor.getData().length > MAX_LEN) {
      setEditorError('word limit exceeded');
      setValidEditorText(false);
    } else {
      setValidEditorText(true);
      setDescirption(editor.getData());
    }
  };

  return (
    <div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          onChange={checkValidEditor}
          config={{
            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote',
              'link', 'numberedList', 'bulletedList', 'undo',
              'redo', 'code'],
          }}
        />
      </div>
      <div>
        {editorError}
      </div>
      { validEditorText ? (
        <div className='btn'>
          <Button
            onClick={handleSubmit}
            variant='contained'
            color='primary'
            disabled={!userLoggedIn}
          >
            Submit
          </Button>
        </div>
      ) : (
        <div disabled className='btn'>
          <Button disabled variant='contained' color='primary'>
            please review
          </Button>
        </div>
      )}
    </div>
  );
};

Answer.proptypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Answer;
