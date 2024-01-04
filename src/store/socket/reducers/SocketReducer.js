import * as actionTypes from '../actions/actionTypes';

const initialState = {
  socket: null
};

const SocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state;
  }
};

export default SocketReducer;
