/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';

export const setSocket = (data) => (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_SOCKET,
      payload: data
    });
  } catch (error) {
    Toast.error(error);
  }
};
