import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/search";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

const initialState = {
  searchResult: {
    users: [],
    posts: [],
  },
  searchQuery: "",
};

export const getSearch = createAsyncThunk(
  "search/getSearch",
  async (data, thunkAPI) => {
    try {
      const limit = 5;
      // const offset = 1;

      if (!data) return;

      const endpoint = `${url}?search=${data}&limit=${limit}`;
      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: {
    [getSearch.fulfilled]: (state, { payload }) => {
      state.searchResult = payload;
      return state;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export const searchSelector = (state) => state.search;

export default searchSlice.reducer;
