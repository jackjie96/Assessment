export const FETCH_PLACES = "FETCH_PLACES";
export const FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS";

export const fetchPlaces = (query) => ({ type: FETCH_PLACES, query });
export const fetchPlacesSuccess = (places) => ({
  type: FETCH_PLACES_SUCCESS,
  places,
});
