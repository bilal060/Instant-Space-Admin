import * as actionTypes from '../actions/actionTypes';

const initialState = {
  conversations: [],
  messages: []
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload
      };
    case actionTypes.CONVERSATION_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case actionTypes.SEND_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case actionTypes.CLEAR_CHAT:
      return {
        conversations: [],
        messages: []
      };
    default:
      return state;
  }
};

export default UserReducer;
