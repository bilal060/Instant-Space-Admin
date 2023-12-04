/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes';
import * as catTypes from '../../category/actions/actionTypes';
import * as chatTypes from '../../chat/actions/actionTypes';
import * as spaceTypes from '../../space/actions/actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';
import { getAllSpaces, getUserSpaces } from '../../storeIndex';

export const userLogin = (data, navigation) => (dispatch) => {
  Axios.post('users/login', data)
    .then((response) => {
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response.data
      });
      const role = response?.data?.user?.role;
      if (role === 'Customer') {
        console.log('Customer');
        dispatch(getAllSpaces());
      } else {
        console.log('No Customer');
        dispatch(getUserSpaces());
      }
      navigation('/');
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const userLogout = (navigation) => (dispatch) => {
  dispatch({
    type: actionTypes.USER_LOGOUT
  });
  dispatch({
    type: catTypes.CLEAR_CATEGORIES
  });
  dispatch({
    type: chatTypes.CLEAR_CHAT
  });
  dispatch({
    type: spaceTypes.CLEAR_SPACES
  });
  navigation('/auth/login');
  Toast.success('User logout successful');
};

export const userLogoutNotAdmin = (navigation) => (dispatch) => {
  dispatch({
    type: actionTypes.USER_LOGOUT
  });
  dispatch({
    type: catTypes.CLEAR_CATEGORIES
  });
  dispatch({
    type: chatTypes.CLEAR_CHAT
  });
  dispatch({
    type: spaceTypes.CLEAR_SPACES
  });
  navigation('/auth/login');
  Toast.error('Access restricted: Admin privileges required.');
};

export const forgetPassword = (data, navigate, moveTo) => (dispatch) => {
  Axios.post('users/forgotpassword', data)
    .then((response) => {
      navigate('/auth/verify-otp', {
        state: {
          email: data.email,
          moveTo
        }
      });
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const verifyOtp =
  (data, navigate, role, moveTo = '/auth/reset-password') =>
  (dispatch) => {
    Axios.post('users/verifyotp', data)
      .then((response) => {
        navigate(moveTo, {
          state: {
            email: data.email,
            role
          }
        });
        Toast.success(response.data.message);
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const resetPassword = (data, navigate) => (dispatch) => {
  Axios.patch('users/resetPassword', data)
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_PASSWORD,
        payload: response.data
      });
      const role = response?.data?.user?.role;
      if (role === 'Customer') {
        console.log('Customer');
        dispatch(getAllSpaces());
      } else {
        console.log('No Customer');
        dispatch(getUserSpaces());
      }
      navigate('/');
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const updateUserProfile = (data, navigate, token) => (dispatch) => {
  Axios.patch('users/UpdateUserProfile', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT,
        payload: response.data.data.user
      });

      const role = response?.data?.data?.user?.role;
      console.log(role);
      if (role === 'Customer') {
        navigate('/customer');
      } else {
        navigate('/');
      }
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const sendManagerInvitation = (data, token, onHide) => (dispatch) => {
  Axios.post('users/manager-invitation', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      onHide();
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const UpdateUserStatus = (userId, token, data, filterBy, page) => (dispatch) => {
  Axios.patch(`users/changeUserStatus/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(() => {
      dispatch(getAllUsers(token, page, filterBy));
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getPayments =
  (id, token, page = 1) =>
  (dispatch) => {
    Axios.get(`users/owner-managers/${id}?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.USER_PAYMENT,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const updateUserAccount = (data, token) => (dispatch) => {
  Axios.patch('users/updateMe', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      console.log(response.data.data.user);
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT,
        payload: response.data.data.user
      });
      Toast.success('Update successful');
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const updateUserPassword = (data, token) => (dispatch) => {
  Axios.patch('users/updatePassword', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_PASSWORD,
        payload: response.data.token
      });
      Toast.success('Update successful');
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getAllUsers =
  (token, page, filterBy = '') =>
  (dispatch) => {
    Axios.get(`users/?page=${page}&type=${filterBy}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_USER,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response?.data?.message);
        console.log(error.response?.data);
      });
  };
