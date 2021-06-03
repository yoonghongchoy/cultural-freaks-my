import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/auth";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  showSignup: false,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    localStorage.setItem("accessToken", response.data.accessToken);
  } catch (e) {
    console.log(e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      await axios.post(`${url}/signup`, data);
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/activate?token=${data}`);
      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    setShowSignup: (state, action) => {
      state.showSignup = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [signup.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [signup.pending]: (state) => {
      state.isFetching = true;
    },
    [signup.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [activateAccount.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [activateAccount.pending]: (state) => {
      state.isFetching = true;
    },
    [activateAccount.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState, setShowSignup } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
