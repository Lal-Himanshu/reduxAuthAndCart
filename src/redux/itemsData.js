import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchItemData = createAsyncThunk('fetchItems', async () => {
  const response = await fetch('https://picsum.photos/v2/list');
  const jsonData = await response.json();
  return jsonData;
});

const itemsSlice = createSlice({
  name: 'slice',
  initialState: {data: [], loading: false, error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItemData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchItemData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItemData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
