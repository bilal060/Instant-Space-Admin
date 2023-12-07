import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';
import * as actionTypes from './actionTypes';

export const getUserEarning = (token) => (dispatch) => {
  Axios.get(`bookings/userEarning?user=admin`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      console.log('this is the correct response');

      dispatch({
        type: actionTypes.USER_EARNING,
        payload: response?.data
      });
    })
    .catch((error) => {
      console.log('this is the error response');

      Toast.error(error.response?.data?.message);
      console.log(error.response?.data);
    });
};
