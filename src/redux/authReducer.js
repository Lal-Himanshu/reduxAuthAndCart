// export const authReducer = (state = null, action) => {
//   switch (action.type) {
//     case 'SET_USER':
//       return action.payload;

//     default:
//       return state;
//   }
// };

import {createSlice} from '@reduxjs/toolkit';

const initialState = null;

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const {setUser} = slice.actions;
export default slice.reducer;
