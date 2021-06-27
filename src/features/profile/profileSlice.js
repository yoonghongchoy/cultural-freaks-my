import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/friend";
const userUrl = "http://localhost:8080/auth/user";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

const initialState = {
  friends: [],
  myProfile: null,
  userProfile: null,
};

export const getFriends = createAsyncThunk(
  "profile/getFriends",
  async (data, thunkAPI) => {
    const { userId, status } = data;
    try {
      const response = await axios.get(
        `${url}?userId=${userId}&status=${status}`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(userUrl, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${userUrl}/${data}`, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // getTotalNumberOfFriends: (state) => {
    //   return state.friends.length;
    // },
  },
  extraReducers: {
    [getFriends.fulfilled]: (state, { payload }) => {
      state.friends = payload;
      return state;
    },
    [getMyProfile.fulfilled]: (state, { payload }) => {
      state.myProfile = payload;
      return state;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.userProfile = payload;
      return state;
    },
  },
});

// export const { getTotalNumberOfFriends } = profileSlice.actions;

export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
