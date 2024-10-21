import {ADD_NOTE, PURGE_NOTE} from '../actions/note';

export interface Note {
  content: string;
  categoryId: string;
  createdDateTime: string;
}

const initState = {
  notes: [],
};

const noteReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ADD_NOTE:
      return {...state, notes: [...state.notes, action.note]};
    case PURGE_NOTE:
      return {...state, notes: initState.notes};
    default:
      return state;
  }
};

export default noteReducer;
