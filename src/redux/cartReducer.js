import {createSlice} from '@reduxjs/toolkit';
const initialState = [];
export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload.id;
      return state.filter(item => item.id !== idToRemove);
    },
  },
});
export const {addToCart, removeFromCart} = slice.actions;
export default slice.reducer;
