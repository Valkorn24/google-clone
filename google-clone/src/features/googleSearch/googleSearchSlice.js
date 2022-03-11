import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

const initialState = {
  isLoading: false,
  results: [],
  isError: false,
  searchTerm: '',
};

export const getResults = createAsyncThunk(
  'search/getResults',
  async (type, thunkAPI) => {
    try {
      const { data } = await axios.get(`${baseUrl}${type}`, {
        headers: {
          'x-user-agent': 'desktop',
          'x-proxy-location': 'EU',
          'x-rapidapi-host': 'google-search3.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const googleSearchSlice = createSlice({
  name: 'googleSearch',
  initialState,
  reducers: {
    searchTerm: (state, searchTerm) => {
      state.searchTerm = searchTerm.payload;
    },
  },
  extraReducers: {
    [getResults.pending]: state => {
      state.isLoading = true;
    },
    [getResults.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.results = action.payload;
    },
    [getResults.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { searchTerm } = googleSearchSlice.actions;
export default googleSearchSlice.reducer;
