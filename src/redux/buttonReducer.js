import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('slice/fetchData', async (_, {dispatch}) => {
  const response = await fetch('https://picsum.photos/v2/list');
  const data = await response.json();

  dispatch(slice.actions.setInitialDataSize(data.length));

  return data;
});

const initialState = [];

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setInitialDataSize: (state, action) => {
      const dataSize = action.payload;
      state.length = dataSize;
      state.fill(false);
    },
    changeBoolState: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.length) {
        state[index] = !state[index];
      } else {
      }
    },
  },
});

export const {setInitialDataSize, changeBoolState} = slice.actions;
export default slice.reducer;
