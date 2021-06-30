import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/home/postSlice";
import notificationReducer from "../features/home/notificationSlice";
import profileReducer from "../features/profile/profileSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    notification: notificationReducer,
    profile: profileReducer,
    search: searchReducer,
  },
});
