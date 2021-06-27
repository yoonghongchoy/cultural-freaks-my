import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/post";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

const initialState = {
  showCreateDialog: false,
  posts: [],
  isLoading: false,
  isGetPostsSuccess: false,
  isGetPostsError: false,
  isCreatePostsSuccess: false,
  isCreatePostsError: false,
  errorMessage: null,
};

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (data, thunkAPI) => {
    try {
      const endpoint = data ? `${url}?userId=${data}` : url;
      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createPosts = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      await axios.post(url, data, { headers });
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostState: (state) => {
      state.isGetPostsError = false;
      state.isGetPostsSuccess = false;
      state.isCreatePostsSuccess = false;
      state.isCreatePostsError = false;
      state.isLoading = false;

      return state;
    },
    setShowCreateDialog: (state, action) => {
      state.showCreateDialog = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isGetPostsSuccess = true;
      state.posts = payload;
      return state;
    },
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isGetPostsError = true;
      state.errorMessage = payload ? payload.message : "";
    },
    [createPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isCreatePostsSuccess = true;
      return state;
    },
    [createPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [createPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isCreatePostsError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearPostState, setShowCreateDialog } = postSlice.actions;

export const postSelector = (state) => state.post;

export default postSlice.reducer;
