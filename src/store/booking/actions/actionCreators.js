import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getAllBookings = (token, userRole, page, filterState, dayValue) => (dispatch) => {
  let filterParam = '';
  if (filterState) {
    if (filterState === 'upcoming') {
      filterParam = 'upcoming=true';
    } else if (filterState === 'pending') {
      filterParam = 'status=pending';
    }
  }
  let dateParams = '';
  if (dayValue) {
    const [startDate, endDate] = dayValue;

    if (startDate && endDate) {
      const isoStartDate = new Date(startDate).toISOString();
      const isoEndDate = new Date(endDate).toISOString();

      dateParams = `&startDate=${isoStartDate}&endDate=${isoEndDate}`;
    } else {
      const isoStartDate = new Date(startDate).toISOString();
      dateParams = `&startDate=${isoStartDate}`;
    }
  }

  Axios.get(
    `bookings/?page=${page}&userType=${userRole}${
      filterParam ? `&${filterParam}` : ''
    }${dateParams}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
    .then((response) => {
      dispatch({
        type: actionTypes.ALL_BOOKING,
        payload: response.data
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getRecentBookings = (userId, token, userRole, page) => () => {
  Axios.get(`bookings/user_bookings/${userId}?page=${page}&userType=${userRole}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(() => {})
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const DeleteBooking =
  (bookingId, token, data, handleClose, page, userRole, dayValue) => (dispatch) => {
    Axios.patch(`bookings/update_status/${bookingId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        dispatch(getAllBookings(token, userRole, page, dayValue));
        handleClose();
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };
export const getUserBookings =
  (userId, token, page = 1, filterBy = '') =>
  (dispatch) => {
    Axios.get(`bookings/user_bookings/${userId}?page=${page}&filterBy=${filterBy}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_BOOKING,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const getAllUserBookings =
  (userId, token, userType = 'Customer') =>
  (dispatch) => {
    Axios.get(`bookings/user_bookings/${userId}?userType=${userType}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.ALL_USER_BOOKINGS,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const getOwnerBookings =
  (userId, token, page = 1, filterBy = '') =>
  (dispatch) => {
    Axios.get(`bookings/user_bookings/${userId}?page=${page}&filterBy=${filterBy}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_BOOKING,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const getManagerBookings =
  (userId, token, page = 1, filterBy = '') =>
  (dispatch) => {
    Axios.get(`bookings/user_bookings/${userId}?page=${page}&filterBy=${filterBy}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_BOOKING,
          payload: response.data
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const createBooking = (data, token, onHide) => (dispatch) => {
  Axios.post('bookings/create_booking', data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      onHide();
      dispatch(getUserBookings(data.userId, token));
      dispatch(getOwnerBookings(data.userId, token));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};
