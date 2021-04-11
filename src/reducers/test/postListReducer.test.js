import postListReducer from 'reducers/postListReducer';
import initialState from 'reducers/initialState.json';
import { UPDATE_POSTS_LIST, UPDATE_LENGTH, UPDATE_POSTLIST_ERROR } from 'actions/actionTypes';

describe('postList reducer', () => {
  it('should return the initial state', () => {
    expect(postListReducer(undefined, {})).toEqual(
      initialState.postsList,
    );
  });

  it('should update posts list', () => {
    const posts = [{
      title: 'Ruby on Rails',
      description: 'Sample description',
    }];

    expect(
      postListReducer(initialState.postsList, {
        type: UPDATE_POSTS_LIST,
        posts,
      }),
    ).toEqual({
      ...initialState.postsList,
      posts,
    });
  });

  it('should update posts list length', () => {
    expect(
      postListReducer(initialState.postsList, {
        type: UPDATE_LENGTH,
        length: 1,
      }),
    ).toEqual({
      ...initialState.postsList,
      length: 1,
    });
  });

  it('should update posts list error', () => {
    expect(
      postListReducer(initialState.postsList, {
        type: UPDATE_POSTLIST_ERROR,
        errors: "some error",
      }),
    ).toEqual({
      ...initialState.postsList,
      errors: "some error",
    });
  });

});
