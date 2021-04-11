import API_ROUTES from 'constants/api/apiRoutes';
import {
  deleteApi, get, patch, post,
} from 'services/api';
import { SET_GROUP, UPDATE_GROUP_ERRORS } from 'actions/actionTypes';
import { hideLoader, showLoader } from './apiFlagsAction';

export const setGroup = (group, id) => ({
  type: SET_GROUP,
  group,
  id,
});

export const updateGroupErrors = (errors) => ({
  type: UPDATE_GROUP_ERRORS,
  errors,
});

export const createNewGroup = (values, history) => (dispatch) => {
  dispatch(showLoader());
  post(API_ROUTES.groups, values).then((res) => {
    dispatch(updateGroupErrors(null));
    dispatch(hideLoader());
    dispatch(setGroup(res.data));
    history.push('/home/groups');
  }).catch((err) => {
    dispatch(hideLoader());
    dispatch(updateGroupErrors(err.response.data));
  });
};

export const getGroup = (id) => (dispatch) => {
  get(`${API_ROUTES.groups}/${id}`).then((res) => {
    dispatch(setGroup(res.data, id));
  });
};

export const joinGroup = (id) => (dispatch) => {
  post(`${API_ROUTES.groups}/${id}/user`).then((res) => {
    dispatch(setGroup(res.data, id));
  });
};

export const updateGroupDetails = (id, values, history, role) => (dispatch) => {
  patch(`${API_ROUTES.groups}/${id}`, values).then((res) => {
    dispatch(setGroup({ group: res.data, user_role: role }, id));
    history.push(`/home/group/${id}`);
  });
};

export const leaveGroup = (groupId, userId, history) => () => {
  deleteApi(`${API_ROUTES.groups}/${groupId}/user/${userId}`).then(() => {
    history.push('/home/groups');
  });
};
