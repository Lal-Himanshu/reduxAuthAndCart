import jsonData from '../data/flatListData';
import {MAKE_FALSE} from './constants';
import {MAKE_TRUE} from './constants';
import {CHANGE} from './constants';
const initialButtonStates = [];
jsonData.forEach(item => {
  const temp = Number(item.id);
  initialButtonStates[temp] = true;
});
export const buttonReducer = (state = true, action) => {
  switch (action.type) {
    case CHANGE:
      return !action.data;
    default:
      return state;
  }
};
