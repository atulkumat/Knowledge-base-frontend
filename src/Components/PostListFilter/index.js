import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import 'Components/PostListFilter/index.css';

const PostListFilter = () => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');

  const addQuery = (key, value) => {
    const { pathname } = location;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    history.push({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className='filter_main_container'>
      <div className='header__search'>
        <input
          type='text'
          placeholder='Search a post here'
          value={title}
          className='header__searchInput'
          onChange={(e) => setTitle(e.target.value)}
        />
        <div role='icon' onClick={() => addQuery('name', title)}>
          <SearchIcon className='header__searchIcon' />
        </div>
      </div>
      <div className='filter_container_2'>
        <div className='post_tag_filter'>
          <input
            type='text'
            placeholder='tag_name'
            data-testid='tag_name_input'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <Button onClick={() => addQuery('tag', tag)} variant='contained' color='primary'>
            Add Tag
          </Button>
        </div>
        <div className='order_filter'>
          <div onClick={() => addQuery('sort', 'asc')}>
            Oldest
            <Checkbox />
          </div>
          <div onClick={() => addQuery('sort', 'desc')}>
            Latest
            <Checkbox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListFilter;
