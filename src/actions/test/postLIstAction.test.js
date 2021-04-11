import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import initialState from 'reducers/initialState.json';
import thunk from 'redux-thunk';
import { UPDATE_POSTS_LIST, UPDATE_LENGTH, UPDATE_POSTLIST_ERROR, UPDATE_LOADER } from 'actions/actionTypes';
import { getPostsList } from 'actions/postListAction';

const middlewares = [thunk];
jest.mock('axios');

const mockStore = configureMockStore(middlewares);
const dummyResponse = [
  {
    title: 'Ruby on Rails',
    description: 'Sample description',
    length: 2,
  },
  {
    title: 'React',
    description: 'Sample description',
    length: 2,
  },
];

describe('postList Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState.postsList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates postlist after api call', () => {
    axios.get.mockResolvedValue({
      data: dummyResponse,
      status: 200,
    });

    const expectedActions = [
      { type: UPDATE_LOADER, loading: true },
      { type: UPDATE_LENGTH, length: dummyResponse[0].length },
      { type: UPDATE_LOADER, loading: false },
      { type: UPDATE_POSTLIST_ERROR, errors: null },
      { type: UPDATE_POSTS_LIST, posts: dummyResponse },
    ];
    return store.dispatch(getPostsList()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
