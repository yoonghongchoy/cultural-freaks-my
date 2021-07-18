import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/friend";
const userUrl = "http://localhost:8080/auth/user";

const initialState = {
  friends: [],
  friendRequests: [],
  myProfile: null,
  userProfile: null,
  requestSent: false,
  isFriend: "",
};

export const getFriends = createAsyncThunk(
  "profile/getFriends",
  async (data, thunkAPI) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
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

export const getFriendRequest = createAsyncThunk(
  "profile/getFriendRequest",
  async (data, thunkAPI) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    try {
      const response = await axios.get(`${url}?userId=${data}&status=pending`, {
        headers,
      });
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateFriendRequest = createAsyncThunk(
  "profile/updateFriendRequest",
  async (data, thunkAPI) => {
    try {
      const { id, status } = data;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      const response = await axios.patch(
        `${url}/updateFriendRequest`,
        {
          id,
          status,
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(`${userUrl}/${data}`, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.post(`${userUrl}/editProfile`, data, {
        headers,
      });
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
    [getFriendRequest.fulfilled]: (state, { payload }) => {
      state.friendRequests = payload;
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
    [editProfile.fulfilled]: (state, { payload }) => {
      state.userProfile = payload;
      state.myProfile = payload;
      return state;
    },
  },
});

export const { setRequestSent } = profileSlice.actions;

export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
