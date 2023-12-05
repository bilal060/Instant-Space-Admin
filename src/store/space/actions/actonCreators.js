/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getUserSpaces =
  (page = 1, filterby = '') =>
  (dispatch) => {
    Axios.get(`spaces/space/?page=${page}&filterby=${filterby}`)
      .then((response) => {
        dispatch({
          type: actionTypes.USER_SPACES,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error?.response?.data.message);
        console.log(error?.response?.data);
      });
  };

export const getAllSpaces =
  (page = 1, filterby = '') =>
  (dispatch) => {
    Axios.get(`spaces?page=${page}&filterby=${filterby}`)
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_SPACES,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error?.response?.data.message);
        console.log(error?.response?.data);
      });
  };

export const getSingleSpace = (id, token) => (dispatch) => {
  Axios.get(`spaces/single_space/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.SINGLE_SPACE,
        payload: response.data.space
      });
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};

export const addUserSpace = (data, navigate) => (dispatch) => {
  Axios.post('spaces/add_space', data)
    .then((response) => {
      dispatch(getUserSpaces());
      navigate('/dashboard/all-spaces');
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};

export const updateUserSpace = (data, id, token, navigate) => (dispatch) => {
  Axios.patch(`spaces/update_space/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch(getUserSpaces());
      navigate(`/dashboard/single-space/${id}`);
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};

export const changeAvailability = (userId, data) => (dispatch) => {
  Axios.post('spaces/change-availability', data)
    .then((response) => {
      dispatch(getUserSpaces());
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};

export const deleteSpace = (userId, spaceId, token, handleClose) => (dispatch) => {
  Axios.delete(`spaces/delete-space/${spaceId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch(getUserSpaces());
      handleClose();
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};

export const getAreaSpace = (id, token) => (dispatch) => {
  Axios.post(`spaces/area-spaces`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      // dispatch({
      //   type: actionTypes.SINGLE_SPACE,
      //   payload: response.data.space,
      // });
      console.log(response.data);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};
export const createReview = (data, token, onHide) => (dispatch) => {
  Axios.post(`spaces/add_review`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      onHide();
      dispatch(getSingleSpace(data.spaceId, token));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error?.response?.data.message);
      console.log(error?.response?.data);
    });
};
