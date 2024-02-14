import {ADD_TO_CART} from './constants';
import {REMOVE_FROM_CART} from './constants';
import jsonData from '../data/flatListData';
import {MAKE_FALSE} from './constants';
import {MAKE_TRUE} from './constants';
const initialData = [];
export const cartReducer = (state = initialData, action) => {
  //   console.log('cardreducer', action);
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.data];
    case REMOVE_FROM_CART:
      return state.filter(item => item !== action.data);
    default:
      return state;
  }
};
