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
      // Toast.error(error.response?.data.message);
      console.log(error.response?.data);
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
        Toast.error(error.response?.data.message);
        console.log(error.response?.data);
      });
  };

export const getAllTransactions = (token, page) => (dispatch) => {
  Axios.get(`bookings/getEaring?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      dispatch({
        type: actionTypes.ALL_TRANSACTIONS,
        payload: response?.data
      });
    })
    .catch((error) => {
      Toast.error(error.response?.data?.message);
      console.log(error.response?.data);
    });
};
