/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';
import axios from 'axios';

export const getNotification = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}api/v1/notification`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.SET_NOTIFICATIONS,
        payload: response.data.data
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const getPaginatedNotification = (page) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}api/v1/notification${page ? `?page=${page}` : ''}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.SET_PAGINATED_NOTIFICATIONS,
        payload: response.data.data
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const updateNotification = (data) => (dispatch) => {
  axios
    .patch(
      `${process.env.REACT_APP_SERVER_URL}api/v1/notification/updateNotificationStatus`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      dispatch(getNotification());
      dispatch(getPaginatedNotification(1));
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
export const markReadNotification = (data) => (dispatch) => {
  axios
    .patch(`${process.env.REACT_APP_SERVER_URL}api/v1/notification/updateStatus`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(getNotification());
      dispatch(getPaginatedNotification(1));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const postNotification = (data) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}api/v1/notification`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      dispatch(getNotification());
      dispatch(getPaginatedNotification(1));
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const deleteNotification = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_SERVER_URL}api/v1/notification/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      dispatch(getNotification());
      dispatch(getPaginatedNotification(1));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
