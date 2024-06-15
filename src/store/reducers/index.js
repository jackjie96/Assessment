import { FETCH_PLACES_SUCCESS } from "../actions";

const initialState = {
  places: [],
};

export const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.places };
    default:
      return state;
  }
};
