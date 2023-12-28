import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';
import * as actionTypes from './actionTypes';

export const getUserEarning = (token) => (dispatch) => {
  Axios.get(`bookings/userEarning?user=admin`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_EARNING,
        payload: response?.data
      });
    })
    .catch((error) => {
      Toast.error(error.response?.data?.message);
      console.log(error.response?.data);
    });
};
