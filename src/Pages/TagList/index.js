import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from 'hooks/ useQuery';
import { useHistory, useLocation } from 'react-router-dom';
import { getTagsList } from 'actions/tagListAction';
import Paginate from 'Components/Paginate';
import TagTile from 'Components/TagTile';
import { Button } from '@material-ui/core';
import 'Pages/TagList/index.css';
import PageLoader from 'Components/PageLoader';

const TagList = () => {
  const loading = useSelector((state) => state.flags.loading);
  const tagsList = useSelector((state) => state.tagsList);
  const location = useLocation();
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const query = useQuery();
  const name = query.get('name') || '';
  const [currentPage, setCurrentPage] = useState(0);
  let page = parseInt(query.get('page_no'), 10) || 0;
  page = page === 0 ? page : page - 1;

  const dispatch = useDispatch();

  const handleSubmit = () => {
    history.push({
      pathname: location.pathname,
      search: `?name=${filter}`,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getTagsList(page, name));
  }, [name, page]);

  if (loading) {
    return <PageLoader />;
  }

  if (tagsList.errors != null) {
    return (
      <div>
        {TagList.errors}
      </div>
    );
  }

  if (tagsList.length === 0) {
    return (
      <div>
        <div className='tag_heading'>
          <h1>Tags</h1>
        </div>
        <p className='no_tag'>No Tags Found</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className='tag_heading'>
          <h1>Tags</h1>
        </div>
        <div className='taglist_controler_1'>
          <div className='filter_tags'>
            <div>
              <input
                onChange={(e) => setFilter(e.target.value)}
                placeholder='write tag name'
              />
            </div>
            <div className='filter_btn'>
              <Button onClick={handleSubmit} variant='contained' color='primary'>
                apply filter
              </Button>
            </div>
          </div>
        </div>
        { tagsList.errors === null
          ? (
            <div className='tag_block'>
              {
                tagsList.tags.map((tag) => <TagTile key={tag.id} tag={tag} />)
              }
            </div>
          ) : (
            <p>
              {' '}
              {tagsList.errors}
            </p>
          )}
      </div>
      <Paginate
        length={tagsList.length}
        perPage={12}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default TagList;
