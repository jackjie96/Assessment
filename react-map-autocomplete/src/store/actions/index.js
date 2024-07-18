export const FETCH_PLACES = "FETCH_PLACES";
export const FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS";
export const FETCH_PLACE_DETAIL = "FETCH_PLACE_DETAIL";
export const FETCH_PLACE_DETAIL_SUCCESS = "FETCH_PLACE_DETAIL_SUCCESS";

const fetchPlaces = (query) => ({ type: FETCH_PLACES, query });
const fetchPlacesSuccess = (places) => ({
  type: FETCH_PLACES_SUCCESS,
  places,
});

const fetchPlaceDetail = (placeId) => ({ type: FETCH_PLACE_DETAIL, placeId });
const fetchPlaceDetailSuccess = (detail) => ({
  type: FETCH_PLACE_DETAIL_SUCCESS,
  detail,
});

export {
  fetchPlaces,
  fetchPlacesSuccess,
  fetchPlaceDetail,
  fetchPlaceDetailSuccess,
};
