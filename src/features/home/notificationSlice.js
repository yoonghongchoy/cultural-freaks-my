import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/notification";

const initialState = {
  notifications: [],
};

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      await axios.post(
        url,
        { notifier: data.notifier, content: data.content },
        { headers }
      );
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      const response = await axios.get(url, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {
    [getNotification.fulfilled]: (state, { payload }) => {
      state.notifications = payload;
      return state;
    },
  },
});

export const notificationSelector = (state) => state.notification;

export default notificationSlice.reducer;
