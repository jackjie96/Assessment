import {GET_CATEGORIES} from '../actions/category';

export interface Category {
  name: string;
  id: string;
}

const initState: {categories: Category[]} = {
  categories: [
    {id: '1', name: 'Work and study'},
    {id: '2', name: 'Life'},
    {id: '3', name: 'Health and wellness'},
  ],
};

const categoryReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GET_CATEGORIES:
    default:
      return state;
  }
};

export default categoryReducer;
