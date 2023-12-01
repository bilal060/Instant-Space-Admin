import * as actionTypes from '../actions/actionTypes';

const initialState = {
  all: {},
  userSpaces: {},
  singleSpace: {},
  infiniteAll: {}
};

const SpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SPACES:
      return {
        ...state,
        userSpaces: action.payload
      };
    case actionTypes.ALL_SPACES:
      return {
        ...state,
        all: action.payload
      };
    case actionTypes.INFINITE_ALL:
      return {
        ...state,
        infiniteAll: action.payload
      };
    case actionTypes.SINGLE_SPACE:
      return {
        ...state,
        singleSpace: action.payload
      };
    case actionTypes.CLEAR_SPACES:
      return {
        all: {},
        userSpaces: {},
        singleSpace: {}
      };
    default:
      return state;
  }
};

export default SpaceReducer;
