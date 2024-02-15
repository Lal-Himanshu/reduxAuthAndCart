import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import buttonReducer from './buttonReducer';
import authReducer from './authReducer';
import itemsData from './itemsData';
export default combineReducers({
  cartReducer,
  buttonReducer,
  authReducer,
  itemsData,
});
