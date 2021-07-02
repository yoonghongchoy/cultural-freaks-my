import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/post";

const initialState = {
  showCreateDialog: false,
  posts: [],
  post: "",
  isLoading: false,
  isGetPostsSuccess: false,
  isGetPostsError: false,
  isCreatePostsSuccess: false,
  isCreatePostsError: false,
  errorMessage: null,
  openDeleteModal: false,
  deletePostId: "",
  postShared: false,
  postComment: [],
  newComment: "",
  deleteCommentId: "",
  openDeleteCommentModal: false,
  isDeleted: false,
};

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const {
        limit,
        offset,
        sortBy,
        userId,
        state,
        keyword1,
        keyword2,
        keyword3,
      } = data;
      let endpoint = url;
      const queryParam = [];
      if (limit) {
        queryParam.push(`limit=${limit}`);
      }

      if (offset) {
        queryParam.push(`offset=${offset}`);
      }

      if (sortBy) {
        queryParam.push(`sortBy=${sortBy}`);
      }

      if (userId) {
        queryParam.push(`userId=${userId}`);
      }

      if (state) {
        queryParam.push(`state=${state}`);
      }

      if (keyword1) {
        queryParam.push(`keyword1=${keyword1}`);
      }

      if (keyword2) {
        queryParam.push(`keyword2=${keyword2}`);
      }

      if (keyword3) {
        queryParam.push(`keyword3=${keyword3}`);
      }

      if (queryParam.length > 0) {
        endpoint += "?";

        for (let i = 0; i < queryParam.length; i++) {
          if (i !== queryParam.length - 1) {
            endpoint += `${queryParam[i]}&`;
          } else {
            endpoint += queryParam[i];
          }
        }
      }

      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      if (data === "undefined") {
        return "";
      }

      const response = await axios.get(`${url}/${data}`, { headers });
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      await axios.post(url, data, { headers });
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/like/${data}`;
      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/unlike/${data}`;
      const response = await axios.delete(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/${data}`;
      const response = await axios.delete(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const sharePost = createAsyncThunk(
  "post/sharePost",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/share/${data}`;
      const response = await axios.get(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      const response = await axios.post(`${url}/comment`, data, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/comment/${data}`;
      const response = await axios.delete(endpoint, { headers });
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getComment = createAsyncThunk(
  "post/getComment",
  async (data, thunkAPI) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const endpoint = `${url}/comment/${data}`;
      const response = await axios.get(endpoint, { headers });
      return response.data;
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
    setOpenDeleteModal: (state, action) => {
      const { openDeleteModal, id } = action.payload;
      state.openDeleteModal = openDeleteModal;
      state.deletePostId = id;
    },
    clearPostShared: (state) => {
      state.postShared = false;

      return state;
    },
    setOpenDeleteCommentModal: (state, action) => {
      const { openDeleteCommentModal, id } = action.payload;
      state.openDeleteCommentModal = openDeleteCommentModal;
      state.deleteCommentId = id;
    },
    clearIsDeleted: (state) => {
      state.isDeleted = false;
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
    [getPostById.fulfilled]: (state, { payload }) => {
      state.post = payload;
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
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload._id);
    },
    [sharePost.fulfilled]: (state) => {
      state.postShared = true;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.newComment = payload;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.postComment = payload;
      return state;
    },
    [deleteComment.fulfilled]: (state) => {
      state.isDeleted = true;
    },
  },
});

export const {
  clearPostState,
  setShowCreateDialog,
  setOpenDeleteModal,
  clearPostShared,
  setOpenDeleteCommentModal,
  clearIsDeleted,
} = postSlice.actions;

export const postSelector = (state) => state.post;

export default postSlice.reducer;
