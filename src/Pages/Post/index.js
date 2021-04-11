import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { confirmAlert } from 'react-confirm-alert';
import Button from '@material-ui/core/Button';
import createPost from 'actions/createPostAction';
import Header from 'Components/Header';
import AddTag from 'Components/AddTag';
import PageLoader from 'Components/PageLoader';
import API_ROUTES from 'constants/api/apiRoutes';
import useQuery from 'hooks/useQuery';
import { MIN_LEN, MAX_LEN, MAX_TITLE_LEN } from 'constants/postConstant';
import { removePost } from 'actions/setPostAction';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'Pages/Post/index.css';
import CreateTag from 'Components/CreateTag';

const Post = () => {
  const loading = useSelector((state) => state.flags.loading);
  const [title, setTitle] = useState('');
  const [description, setDescirption] = useState('');
  const [validTitleText, setValidTitleText] = useState(false);
  const [validEditorText, setValideditorText] = useState(false);
  const [editorError, setEditorError] = useState('');
  const [titleError, setTitleError] = useState('');
  const postTags = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const group = query.get('group');
  const post = useSelector((state) => state.post);
  let message;

  const handleChange = (e, editor) => {
    setDescirption(editor.getData());
  };

  const handleSubmit = () => {
    const { tags } = postTags;
    const values = { title, description, tags };
    if (group) {
      dispatch(createPost(`${API_ROUTES.groups}/${group}/post`, values));
    } else {
      dispatch(createPost(API_ROUTES.post, values));
    }
  };

  if (post.value != null || post.errors != null) {
    if (post.value != null) {
      message = 'Post Successfully Created';
      confirmAlert({
        message,
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              history.push(group ? `/home/group/${group}` : '/home');
            },
          },
        ],
      });
      dispatch(removePost());
    } else {
      message = post.errors.error;
      confirmAlert({
        message,
        buttons: [
          {
            label: 'Try Again',
          },
        ],
      });
      dispatch(removePost());
    }
  }

  const handleGoback = () => {
    history.goBack();
  };

  const checkValidTitle = (e) => {
    if (e.target.value.length < MIN_LEN || !e.target.value.trim()) {
      setTitleError('title must not be empty');
      setValidTitleText(false);
    } else if (e.target.value.length > MAX_TITLE_LEN) {
      setTitleError('word limit exceeded');
      setValidTitleText(false);
    } else {
      setValidTitleText(true);
    }
  };

  const checkValideditor = (e, editor) => {
    if (editor.getData().length < MIN_LEN || !editor.getData().trim()) {
      setEditorError('cannot be empty');
      setValideditorText(false);
    } else if (editor.getData().length > MAX_LEN) {
      setEditorError('word limit exceeded');
      setValideditorText(false);
    } else {
      setValideditorText(true);
    }
  };

  if (loading) {
    return (<PageLoader />);
  }

  return (
    <>
      <div className='post'>
        <Header />
        <h1>Ask a question</h1>
        <div className='post_container1 shadow_lg'>
          <div className='post_title'>
            <h4>Title</h4>
            <p>
              Be specific and imagine you are asking a question
              to another person
            </p>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={checkValidTitle}
              onInput={checkValidTitle}
            />
            {validTitleText ? (<div className='valid' />)
              : (<div className='valid'>{titleError}</div>) }
          </div>
          <div className='question_box'>
            <h4>Body</h4>
            <p>
              Include all the information someone would need to answer
              your question
            </p>
            <CKEditor
              onChange={handleChange}
              onBlur={checkValideditor}
              onInput={checkValideditor}
              editor={ClassicEditor}
              config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote',
                  'link', 'numberedList', 'bulletedList', 'undo',
                  'redo', 'code'],
              }}
            />
            {validEditorText ? (<div className='valid' />)
              : (<div className='valid'>{editorError}</div>)}
          </div>
          <div className='create_tag_post'>
            <h4>Create Tags</h4>
            <CreateTag />
          </div>
          <div className='tags'>
            <h4>Tags</h4>
            <p>
              Be specific and imagine you’re asking a question
              to another person
            </p>
            <AddTag />
          </div>
        </div>
        <div className='post_lower_part'>
          {(validTitleText && validEditorText) ? (
            <div className='btn'>
              <Button onClick={handleSubmit} variant='contained' color='primary'>
                Submit
              </Button>
            </div>
          ) : (
            <div className='btn'>
              <Button disabled variant='contained' color='primary'>
                please review
              </Button>
            </div>
          )}
          <div className='btn'>
            <Button onClick={handleGoback} variant='contained' color='primary'>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
