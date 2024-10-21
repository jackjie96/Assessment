import {combineReducers} from 'redux';
import categoryReducer from './categories';
import noteReducer from './notes';

export const rootReducer = combineReducers({
  categoryReducer,
  noteReducer,
});
