/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

// export const postPlan = (data) => (dispatch) => {
//   axios
//     .post(`${process.env.REACT_APP_SERVER_URL}api/v1/plan`, data, {
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(() => {})
//     .catch((error) => {
//       Toast.error(error.response.data.message);
//     });
// };

export const getPlan = () => (dispatch) => {
  Axios.get(`plan`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PLAN,
        payload: response?.data.data.docs
      });
    })
    .catch((error) => {
      Toast.error(error.response?.data?.message);
      console.log(error.response?.data);
    });
};
