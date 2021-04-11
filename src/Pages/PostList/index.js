import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from 'Components/PageLoader';
import PostTile from 'Components/PostTile';
import Paginate from 'Components/Paginate';
import { getPostsList } from 'actions/postListAction';
import 'Pages/PostList/index.css';
import useQuery from 'hooks/useQuery';
import PER_PAGE from 'constants/pagination';
import { Button } from '@material-ui/core';
import PostListFilter from 'Components/PostListFilter';

const PostList = ({ route }) => {
  const loading = useSelector((state) => state.flags.loading);
  const postsList = useSelector((state) => state.postsList);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const query = useQuery();
  const sort = query.get('sort') || '';
  const name = query.get('name') || '';
  const tag = query.get('tag') || '';
  let page = parseInt(query.get('page_no'), 10) || 0;
  page = page === 0 ? page : page - 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    dispatch(getPostsList(route, page, sort, name, tag));
  }, [route, page]);

  const handleFilter = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const handleApplyFilter = () => {
    dispatch(getPostsList(route, page, sort, name, tag));
  };

  if (loading) {
    return <PageLoader />;
  }

  if (postsList.errors) {
    return <h1 className='error_message'>{postsList.errors.error}</h1>;
  }
 
  if (postsList.posts.length === 0) {
    return <h1 className='empty_post'>No post Yet</h1>;
  }

  return (
    <div className='PostList_parent_container'>

      <div>
        <div className='post-list-container'>
          <div>
            <div className='filterButton'>
              <Button
                onClick={handleFilter}
                variant='contained'
                color={showFilters
                  ? 'secondary' : 'primary'}
              >
                Filters
              </Button>
            </div>
            <div className={showFilters ? 'show' : 'hide'}>
              <PostListFilter />
              <div className='Apply_filterButton'>
                <Button onClick={handleApplyFilter} variant='contained'>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          <div className='post-height'>
            {
                postsList.posts.map((post) => <PostTile key={post.id} post={post} />)
            }
          </div>
        </div>

        <Paginate
          length={postsList.length}
          perPage={PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

PostList.propTypes = {
  route: PropTypes.string.isRequired,
};

export default PostList;
