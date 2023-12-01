import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: {},
  filterCategories: {}
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case actionTypes.FILTER_CATEGORIES:
      return {
        ...state,
        filterCategories: action.payload
      };
    case actionTypes.CLEAR_CATEGORIES:
      return {
        categories: {},
        filterCategories: {}
      };
    default:
      return state;
  }
};

export default UserReducer;
