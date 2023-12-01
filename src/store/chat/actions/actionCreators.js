/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getUserConversations = (id, token) => (dispatch) => {
  Axios.get(`conversations/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_CONVERSATIONS,
        payload: response.data.userConversations
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getConversationMessages = (id, token) => (dispatch) => {
  Axios.get(`messages/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch({
        type: actionTypes.CONVERSATION_MESSAGES,
        payload: response.data.messages
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};
export const send_messages = (data, token) => (dispatch) => {
  Axios.post('messages', data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch({
        type: actionTypes.SEND_MESSAGES,
        payload: response.data.messages
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const send_media_messages = (data, token) => (dispatch) => {
  Axios.post('messages/media_message', data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch({
        type: actionTypes.SEND_MESSAGES,
        payload: response.data.messages
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const startNewConversation = (data, token, navigate) => (dispatch) => {
  Axios.post('conversations/', data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch(getUserConversations(data.senderId, token));
      navigate('/dashboard/messages');
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};
