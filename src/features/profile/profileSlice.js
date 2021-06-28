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
  requestSent: false,
  isFriend: "",
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

export const checkIsFriend = createAsyncThunk(
  "profile/checkIsFriend",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/isFriend/${data}`, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "profile/sendFriendRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        url,
        {
          userId: data,
        },
        { headers }
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeFriend = createAsyncThunk(
  "profile/removeFriend",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/${data}`, { headers });
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
    setRequestSent: (state, action) => {
      state.requestSent = action.payload;
    },
  },
  extraReducers: {
    [getFriends.fulfilled]: (state, { payload }) => {
      state.friends = payload;
      return state;
    },
    [checkIsFriend.fulfilled]: (state, { payload }) => {
      state.isFriend = payload;
      return state;
    },
    [sendFriendRequest.fulfilled]: (state) => {
      state.requestSent = true;
    },
    [removeFriend.fulfilled]: (state) => {
      state.isFriend = "";
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

export const { setRequestSent } = profileSlice.actions;

export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
