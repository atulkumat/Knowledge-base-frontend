import API_ROUTES from 'constants/api/apiRoutes';
import {
  get, post, deleteApi, patch,
} from 'services/api';
import { hideLoader, showLoader } from 'actions/apiFlagsAction';
import {
  UPDATE_GROUP_USER_LIST, UPDATE_GROUP_USERLIST_ERROR, UPDATE_MEMBER_ROLE,
} from 'actions/actionTypes';
import { USER_PER_PAGE } from 'constants/pagination';

export const updateGroupUserList = (users) => ({
  type: UPDATE_GROUP_USER_LIST,
  users,
});

export const updateGroupUserListErrors = (errors) => ({
  type: UPDATE_GROUP_USERLIST_ERROR,
  errors,
});

export const updateRole = (index, user) => ({
  type: UPDATE_MEMBER_ROLE,
  user,
  index,
});

export const getGroupUserList = (id, pageNo, name) => (dispatch) => {
  dispatch(showLoader());
  get(
    `${API_ROUTES.groups}/${id}/users?per_page=${USER_PER_PAGE}&page_no=${pageNo}&name=${name}`,
  ).then((res) => {
    dispatch(hideLoader());
    dispatch(updateGroupUserListErrors(null));
    dispatch(updateGroupUserList(res.data));
  }).catch((err) => {
    dispatch(hideLoader());
    dispatch(updateGroupUserListErrors(err.response.data));
  });
};

export const updateMemberRole = (groupId, user_id, index) => (dispatch) => {
  post(`${API_ROUTES.groups}/${groupId}/admin`, { user_id }).then((res) => {
    dispatch(updateGroupUserListErrors(null));
    dispatch(updateRole(index, res.data));
  }).catch((err) => {
    dispatch(updateGroupUserListErrors(err.response.data));
  });
};

export const removeUserFromGroup = (groupId, user_id, page) => (dispatch) => {
  deleteApi(`${API_ROUTES.groups}/${groupId}/user/${user_id}`).then(() => {
    dispatch(updateGroupUserListErrors(null));
    dispatch(getGroupUserList(groupId, page, ''));
  }).catch((err) => {
    dispatch(updateGroupUserListErrors(err.response.data));
  });
};

export const demoteUserRole = (groupId, user_id, index) => (dispatch) => {
  patch(`${API_ROUTES.groups}/${groupId}/demote-admin`, { user_id }).then((res) => {
    dispatch(updateGroupUserListErrors(null));
    dispatch(updateRole(index, res.data));
  }).catch((err) => {
    dispatch(updateGroupUserListErrors(err.response.data));
  });
};

export const addUsersToGroup = (id, users, page) => (dispatch) => {
  post(`${API_ROUTES.groups}/${id}/member`, { users }).then(() => {
    dispatch(updateGroupUserListErrors(null));
    dispatch(getGroupUserList(id, page, ''));
  }).catch((err) => {
    dispatch(updateGroupUserListErrors(err.response.data));
  });
};
