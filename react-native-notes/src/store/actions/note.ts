import {Note} from '../reducers/notes';

export const ADD_NOTE = 'ADD_NOTE';
export const PURGE_NOTE = 'PURGE_NOTE';

const addNote = (note: Note) => ({type: ADD_NOTE, note});

const purgeNote = () => ({type: PURGE_NOTE});

export {addNote, purgeNote};
