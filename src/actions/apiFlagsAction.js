import { UPDATE_BUTTON_LOADER, UPDATE_COMMENTS_LOADER, UPDATE_LOADER } from 'actions/actionTypes';

export const showLoader = () => ({
  type: UPDATE_LOADER,
  loading: true,
});

export const hideLoader = () => ({
  type: UPDATE_LOADER,
  loading: false,
});

export const ButtonLoader = (button) => ({
  type: UPDATE_BUTTON_LOADER,
  button,
});

export const showCommentsLoader = () => ({
  type: UPDATE_COMMENTS_LOADER,
  loading: true,
});

export const hideCommentsLoader = () => ({
  type: UPDATE_COMMENTS_LOADER,
  loading: false,
});
