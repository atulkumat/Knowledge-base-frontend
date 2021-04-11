import React, { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostDetails } from 'actions/postDetailsAction';
import PageLoader from 'Components/PageLoader';
import API_ROUTES from 'constants/api/apiRoutes';
import PostVote from 'Components/PostVote';
import Comments from 'Components/Comments';
import PublicIcon from '@material-ui/icons/Public';
import Bookmark from 'Components/Bookmark';
import LockIcon from '@material-ui/icons/Lock';
import { getComments } from 'actions/commentsAction';
import Answer from 'Components/Answer';

import 'Pages/PostDetails/index.css';

const PostDetails = () => {
  const { id } = useParams();
  const loading = useSelector((state) => state.flags.loading);
  const postDetails = useSelector((state) => state.postDetails);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostDetails(`${API_ROUTES.postDetails}/${id}`));
    dispatch(getComments(`${API_ROUTES.comments}/${id}/comments`));
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div>
        <div className='postDeatils_heading'>
          {
              postDetails.post.length !== 0
              && (
              <PostVote
                upvotes={postDetails.post.upvotes}
                downvotes={postDetails.post.downvotes}
                vote_status={postDetails.post.vote_status}
                userLoggedIn={!!user}
              />
              )
            }
          <div className='postDetails_heading2'>
            <h2 className='title'>{postDetails.post.title}</h2>
            <div className='post_description'>
              {ReactHtmlParser(postDetails.post.description)}
            </div>
          </div>
        </div>
        <div className='post_tags'>
          {postDetails.post.tags
                && postDetails.post.tags.map((tags) => <div className='tag'>{tags.name}</div>)}
          {postDetails.post.user ? (
            <Link to={`/home/user/${postDetails.post.user.id}`}>
              <div className='name'>
                {' '}
                { postDetails.post.user.first_name}
                {' '}
                {postDetails.post.user.last_name}
              </div>
            </Link>
          ) : <div />}
          {postDetails.post.visibility
              && postDetails.post.visibility === 'general'
            ? <PublicIcon /> : <LockIcon /> }
        </div>
        <div>
          <Bookmark />
        </div>
        <div>
          <div className='post_details_comments'>
            <h3 className='post_details_comments_h3'>Answers</h3>
          </div>
          <Comments userLoggedIn={!!user} />
        </div>
        <div className='post_answer'>
          <h3>Your Answer</h3>
          <Answer userLoggedIn={!!user} />
        </div>

      </div>

      { postDetails.errors
        && (
        <p className='input-feedback'>
          { postDetails.errors.error }
        </p>
        )}
    </div>
  );
};

export default PostDetails;
