import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bookings: {},
  transactions: {}
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_BOOKING:
      return {
        bookings: action.payload
      };
    case actionTypes.ALL_USER_BOOKINGS:
      return {
        bookings: action.payload
      };
    case actionTypes.ALL_TRANSACTIONS:
      return {
        transactions: action.payload
      };
    case actionTypes.CLEAR_BOOKINGS:
      return {
        bookings: {}
      };
    default:
      return state;
  }
};

export default BookingReducer;
