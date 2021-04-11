import React from 'react';
import axios from 'axios';
import PostList from 'Pages/PostList';
import { render } from 'utility/test-utils';
import { fireEvent } from '@testing-library/react';

window.scrollTo = jest.fn();
jest.mock('axios');

describe('My Connected React-Redux Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const dummyResponse = [
    {
      bookmark: null,
      description: 'Ruby on Rails',
      downvotes: 1,
      id: 381,
      length: 2,
      tags: [],
      title: 'a',
      upvotes: 1,
      user: { id: 51, email: 'atul@joshtechnologygroup.com', first_name: 'atul' },
      visibility: 'general',
      vote_status: 'downvote',
    },
    {
      bookmark: null,
      description: '<p>a</p>',
      downvotes: 1,
      id: 382,
      length: 2,
      tags: [],
      title: 'a',
      upvotes: 1,
      user: { id: 51, email: 'atul@joshtechnologygroup.com', first_name: 'atul' },
      visibility: 'general',
      vote_status: 'downvote',
    },
  ];

  it('should render post list and filter buttons  and check filter', async () => {
    axios.get.mockResolvedValue({
      data: dummyResponse,
      status: 200,
    });

    const { findByText, getByTestId, getByPlaceholderText, getByRole } = render(
      <PostList route='api/v1' />,
    );
    getByTestId('loader');
    const div = await findByText('Ruby on Rails');
    expect(div).toBeInTheDocument();

    const showFilterBtn = await findByText('Filters');
    fireEvent.click(showFilterBtn);

    const input = getByTestId('tag_name_input');
    fireEvent.change(input, { target: { value: 'someTag' } });
    expect(input.value).toBe('someTag');
    const filterTag = await findByText('Add Tag');
    fireEvent.click(filterTag);

    const search = getByPlaceholderText('Search a post here');
    fireEvent.change(search, { target: { value: 'some post' } });
    expect(search.value).toBe('some post');
    const searchIcon = getByRole('icon')
    fireEvent.click(searchIcon);

  });

  it('should render no post when list empty', async () => {
    axios.get.mockResolvedValue({
      data: [],
      status: 200,
    });

    const { findByText, getByTestId } = render(
      <PostList route='api/v1' />,
    );
    getByTestId('loader');
    const div = await findByText('No post Yet');
    expect(div).toBeInTheDocument();
  });

  it('should render error', async () => {
    axios.get.mockRejectedValue({
      status: 500,
      response: {
        data: { error: 'some error' },
      },
    });

    const { findByText } = render(
      <PostList route='api/v1' />,
    );
    const div = await findByText('some error');
    expect(div).toBeInTheDocument();
  });
});
