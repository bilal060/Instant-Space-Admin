import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userEarnings: {}
};
const UserEarnings = (state = initialState, action) => {
  console.log(action, 'this is action');
  switch (action.type) {
    case actionTypes.USER_EARNING:
      return {
        ...state,
        userEarnings: action.payload
      };
    default:
      return state;
  }
};

export default UserEarnings;
