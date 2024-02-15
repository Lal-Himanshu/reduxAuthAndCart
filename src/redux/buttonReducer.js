import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('slice/fetchData', async (_, {getState, dispatch}) => {
  const response = await fetch('https://picsum.photos/v2/list');
  const data = await response.json();

  // Dispatch an action to set initial state with the size of fetched data
  dispatch(slice.actions.setInitialDataSize(data.length));

  return data;
});

// Define initial state as an empty array
const initialState = [];

// Define the slice
export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    // Set initial state size
    setInitialDataSize: (state, action) => {
      const dataSize = action.payload;
      state.length = dataSize;
      state.fill(false);
    },
    // Define your reducers here if needed
    changeBoolState: (state, action) => {
      const index = action.payload;
      // Ensure the index is within bounds
      if (index >= 0 && index < state.length) {
        // Toggle the boolean value at the specified index
        state[index] = !state[index];
      } else {
        console.log(index);
        console.log(state.length);
        console.error('Index out of bounds');
      }
    },
  },
});

export const {setInitialDataSize, changeBoolState} = slice.actions;
export default slice.reducer;
