import { combineReducers } from 'redux';
import sessionReducer from './session';
import placesReducer from './places';
import selectedPlaceReducer from './selectedPlace';
import analyticsReducer from './analytics';
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  placesState: placesReducer,
  selectedPlaceState: selectedPlaceReducer,
  analyticsState: analyticsReducer,
});
export default rootReducer;
