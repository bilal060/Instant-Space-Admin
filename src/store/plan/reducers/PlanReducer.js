import * as actionTypes from '../actions/actionTypes';

const initialState = {
  plans: []
};

const PlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAN:
      return {
        ...state,
        plans: action.payload
      };
    default:
      return state;
  }
};

export default PlanReducer;
