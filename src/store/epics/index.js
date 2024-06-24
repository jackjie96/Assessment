import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { catchError, map, switchMap } from "rxjs/operators";
import {
  FETCH_PLACES,
  fetchPlacesSuccess,
  FETCH_PLACE_DETAIL,
  fetchPlaceDetailSuccess,
} from "../actions";
import { combineEpics } from "redux-observable";

const proxy = "https://cors-anywhere.herokuapp.com/";
const apiKey = "";

const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACES),
    switchMap((action) =>
      ajax
        .getJSON(
          `${proxy}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${action.query}&key=${apiKey}`
        )
        .pipe(
          map((response) => fetchPlacesSuccess(response.predictions)),
          catchError((error) => console.log(error))
        )
    )
  );

const fetchPlaceDetailEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACE_DETAIL),
    switchMap((action) =>
      ajax
        .getJSON(
          `${proxy}https://maps.googleapis.com/maps/api/place/details/json?placeid=${action.placeId}&key=${apiKey}`
        )
        .pipe(
          map((response) => fetchPlaceDetailSuccess(response.result)),
          catchError((error) => console.log(error))
        )
    )
  );

export const rootEpic = combineEpics(fetchPlacesEpic, fetchPlaceDetailEpic);
