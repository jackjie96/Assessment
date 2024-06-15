import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { map, switchMap } from "rxjs/operators";
import { FETCH_PLACES, fetchPlacesSuccess } from "../actions";

export const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACES),
    switchMap((action) =>
      ajax
        .getJSON(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${action.query}&key=YOUR_API_KEY`
        )
        .pipe(map((response) => fetchPlacesSuccess(response.predictions)))
    )
  );
