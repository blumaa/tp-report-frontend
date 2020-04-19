// src/reducers/reports.js
const INITIAL_STATE = {
  terms: [],
  reports: [],
};

function analyticsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_TERMS": {
    //   console.log("terms", action);
      return { ...state, terms: action.terms };
    }

    case "SET_REPORTS": {
    //   console.log("reports", action);
      return { ...state, reports: action.reports };
    }

    default:
      return state;
  }
}
export default analyticsReducer;
