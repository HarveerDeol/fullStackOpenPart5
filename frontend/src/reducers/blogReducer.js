import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";
import { useSelector } from "react-redux";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    addToLikes(state, action) {
      const id = action.payload;
      const likeToChange = state.find((v) => v.id === id);
      const changedLike = {
        ...likeToChange,
        likes: likeToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedLike));
    },
    removeBlog(state, action) {
      return state.filter((blog) => {
        if (blog.id !== action.payload) {
          return blog;
        }
      });
    },
  },
});

export const { addBlog, setBlogs, addToLikes, removeBlog } = blogSlice.actions;

export const initalizeBlog = (user) => {
  return async (dispatch) => {
    console.log("initalizeBlog is running");
    const blogs = await blogsService.getAll();
    const userBlogs = blogs.filter(
      (blog) => blog.user.username === user.username,
    );
    dispatch(setBlogs(userBlogs));
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(newObject);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (object) => {
  return async (dispatch) => {
    const likesBlog = await blogsService.update(object.id, object);
    dispatch(addToLikes(object.id));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogsService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
