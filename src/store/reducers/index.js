import { FETCH_PLACES_SUCCESS, FETCH_PLACE_DETAIL_SUCCESS } from "../actions";
import { combineReducers } from "redux";

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.places };
    case FETCH_PLACE_DETAIL_SUCCESS:
      return { ...state, detail: action.detail };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ placesReducer });
