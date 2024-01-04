import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notifications: [],
  paginatedNotifications: [],
  onlineUsers: []
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case actionTypes.SET_PAGINATED_NOTIFICATIONS:
      return {
        ...state,
        paginatedNotifications: action.payload
      };
    case actionTypes.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };
    default:
      return state;
  }
};

export default NotificationReducer;
