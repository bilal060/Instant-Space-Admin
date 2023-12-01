import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getCategories = (role, token) => (dispatch) => {
  Axios.get(`category/specific?role=${role}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch({
        type: actionTypes.ALL_CATEGORIES,
        payload: response.data.roleCategory
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getFilteredCategories = (id) => (dispatch) => {
  Axios.get(`category/${id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.FILTER_CATEGORIES,
        payload: response.data.data.doc
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};
